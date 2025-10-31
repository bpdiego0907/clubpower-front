"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Res = { dni: string; canasta: number; pavo: number } | { detail: string };

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export default function PuntosPage({
  searchParams,
}: {
  searchParams: { dni?: string };
}) {
  const dni = (searchParams?.dni || "").trim();
  const [data, setData] = useState<Res | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dni || !/^\d{6,12}$/.test(dni)) {
      setErr("DNI inválido.");
      setLoading(false);
      return;
    }
    const run = async () => {
      try {
        const r = await fetch(`${API_BASE}/premios/${dni}`, { cache: "no-store" });

        // 🧩 Si la API devuelve 404, mostramos mensaje personalizado
        if (r.status === 404) {
          setErr("No se encontró el número de documento ingresado.");
          setLoading(false);
          return;
        }

        if (!r.ok) throw new Error(`HTTP ${r.status}`);

        const j = (await r.json()) as Res;
        setData(j);
      } catch (e: any) {
        // 🔧 En caso de error de red u otro código no controlado
        setErr("Hubo un problema al consultar la información. Inténtalo nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [dni]);

  return (
    <>
      {/* Botón fijo arriba-izquierda */}
      <button
        className="back"
        onClick={() => router.push("/")}
        aria-label="Volver a la pantalla anterior"
      >
        ← Atrás
      </button>

      <main className="wrap">
        <div className="panel">
          <h2 className="title">🎁 Hola, revisa tus puntos</h2>

          {loading && <div className="small">Cargando…</div>}

          {/* 🔧 Mensaje de error mejorado */}
          {err && (
            <div className="error">
              ❌ {err}
            </div>
          )}

          {!loading && !err && data && "dni" in data && (
            <>
              <div className="grid">
                {/* Badge DNI */}
                <div className="dni">
                  <b>DNI:</b> {data.dni}
                </div>

                {/* Cards */}
                <div className="cards">
                  <Card
                    title="Puntos para ganar la Canasta Navideña"
                    value={data.canasta}
                  />
                  <Card
                    title="Puntos para ganar el Vale de Pavo"
                    value={data.pavo}
                  />
                </div>
              </div>

              {/* Tabla de puntajes */}
              <div className="tableWrap" aria-label="Tabla de puntaje por producto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>PRODUCTO</th>
                      <th>PP</th>
                      <th>OSS</th>
                      <th>PORTA PP</th>
                      <th>ALTA POST / OPP</th>
                      <th>UR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>PUNTAJE</th>
                      <td>1</td>
                      <td>3</td>
                      <td>2</td>
                      <td>2</td>
                      <td>+0.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          {!loading && !err && data && "detail" in data && (
            <div className="small">{(data as any).detail}</div>
          )}
        </div>
      </main>

      <style jsx>{`
        .wrap {
          display: flex;
          justify-content: center;
          padding: 8px;
          margin-top: 0;
        }
        .panel {
          background: #f8f9fa;
          border-radius: 12px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.06);
          padding: 20px 16px;
          max-width: 720px;
          width: 100%;
          text-align: center;
        }
        .title {
          color: #0a58ca;
          margin: 0 0 12px;
          font-size: 20px;
          font-weight: 600;
        }
        .small {
          font-size: 15px;
        }
        .error {
          color: #a94442;
          background: #f8d7da;
          border: 1px solid #f5c2c7;
          border-radius: 8px;
          padding: 10px 14px;
          margin-top: 12px;
          font-size: 15px;
          font-weight: 500;
          text-align: center;
        }
        .grid {
          display: grid;
          gap: 12px;
          justify-items: center;
        }
        .dni {
          font-size: 15px;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 6px 12px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          width: fit-content;
        }
        .cards {
          display: grid;
          gap: 14px;
          width: 100%;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          max-width: 640px;
        }
        .tableWrap {
          margin-top: 16px;
          margin-left: auto;
          margin-right: auto;
          max-width: 640px;
          width: 100%;
          overflow-x: auto;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        thead th {
          text-align: left;
          padding: 10px 12px;
          background: #f3f4f6;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 700;
          white-space: nowrap;
        }
        thead th:not(:first-child) {
          text-align: center;
          padding: 10px 8px;
        }
        tbody th {
          text-align: left;
          padding: 10px 12px;
          border-top: 1px solid #e5e7eb;
          font-weight: 600;
          background: #fafafa;
        }
        tbody td {
          text-align: center;
          padding: 10px 8px;
          border-top: 1px solid #e5e7eb;
          color: #0a58ca;
          font-weight: 700;
        }
        .back {
          position: fixed;
          top: 14px;
          left: 14px;
          background: transparent;
          color: #0a58ca;
          border: none;
          font-weight: 600;
          cursor: pointer;
          padding: 8px 10px;
          border-radius: 8px;
          transition: transform 0.06s ease, background 0.12s ease, color 0.12s ease;
          z-index: 1000;
          font-size: 15px;
        }
        .back:hover {
          background: #e9f1ff;
          color: #084298;
        }
        .back:active {
          transform: translateY(1px);
        }
        @media (max-width: 480px) {
          .wrap {
            padding: 6px;
          }
          .panel {
            padding: 14px 10px;
            border-radius: 10px;
          }
          .title {
            font-size: 17px;
            margin-bottom: 10px;
          }
          .error {
            font-size: 14px;
            padding: 8px 10px;
          }
        }
      `}</style>
    </>
  );
}

/* --- Card --- */
function Card({ title, value }: { title: string; value: number }) {
  return (
    <>
      <div className="card">
        <div className="cardTitle">{title}</div>
        <div className="cardValue">{value}</div>
      </div>

      <style jsx>{`
        .card {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 14px 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 128px;
        }
        .cardTitle {
          font-size: 15px;
          color: #444;
          text-align: center;
          line-height: 1.25;
          min-height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 6px;
          padding: 0 6px;
        }
        .cardValue {
          font-size: 26px;
          color: #0a58ca;
          font-weight: 700;
          margin-top: 4px;
        }
        @media (max-width: 480px) {
          .card {
            padding: 12px 10px;
            min-height: 116px;
          }
          .cardTitle {
            font-size: 14px;
            min-height: 34px;
          }
          .cardValue {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
}
