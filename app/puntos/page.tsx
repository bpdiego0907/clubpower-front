"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProgressBar from "./ProgressBar";

type Res =
  | {
      dni: string;
      canasta: number; // meta 1er premio
      pavo: number;    // meta 2do premio
      puntos?: number; // avance actual
      pv?: string;
    }
  | { detail: string };

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

        if (r.status === 404) {
          setErr("No se encontró el número de documento ingresado.");
          setLoading(false);
          return;
        }
        if (!r.ok) throw new Error(`HTTP ${r.status}`);

        const j = (await r.json()) as Res;
        setData(j);
      } catch (e: any) {
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
          {err && <div className="error">❌ {err}</div>}

          {!loading && !err && data && "dni" in data && (
            <>
              {(() => {
                const puntos = (data as any).puntos ?? 0;
                const alcanzadoCan = puntos >= data.canasta;
                const alcanzadoPavo = puntos >= data.pavo;

                return (
                  <>
                    <div className="grid">
                      <div className="dni">
                        <b>DNI:</b> {data.dni}
                      </div>

                      <div className="cards">
                        <Card
                          title="Puntos para ganar la Canasta Navideña"
                          value={data.canasta}
                          achieved={alcanzadoCan}
                        />
                        <Card
                          title="Puntos para ganar el Vale de Pavo"
                          value={data.pavo}
                          achieved={alcanzadoPavo}
                        />
                      </div>
                    </div>

                    {/* Barra de progreso */}
                    <ProgressBar
                      puntos={puntos}
                      metaCanasta={data.canasta}
                      metaPavo={data.pavo}
                    />

                    {/* Faja neutral de premios */}
                    <section className="prizes" aria-label="Premios de referencia">
                      <div className="prize">
                        <Image
                          src="/canasta.jpg"
                          alt="Canasta Navideña"
                          width={88}
                          height={88}
                          className="prizeImg"
                          priority
                        />
                        <div className="prizeCap">
                          <b>Canasta</b>
                          <span>S/50–S/100</span>
                        </div>
                      </div>
                      <div className="prize">
                        <Image
                          src="/pavo.png"
                          alt="Vale de pavo 6 kg"
                          width={92}
                          height={92}
                          className="prizeImg"
                          priority
                        />
                        <div className="prizeCap">
                          <b>Pavo 6 kg</b>
                          <span>S/100</span>
                        </div>
                      </div>
                    </section>

                    {/* Subtítulo tabla */}
                    <div className="subheadWrap">
                      <div className="subhead">Tabla de puntajes:</div>
                    </div>

                    {/* Tabla */}
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
                );
              })()}
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
        .small { font-size: 15px; }
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
        .grid { display: grid; gap: 12px; justify-items: center; }
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

        .prizes {
          margin: 14px auto 8px;
          display: flex;
          gap: 18px;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;
          max-width: 640px;
          width: 100%;
        }
        .prize {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 10px 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 160px;
        }
        .prizeImg {
          border-radius: 12px;
          object-fit: cover;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
          background: #fff;
        }
        .prizeCap {
          margin-top: 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          line-height: 1.1;
        }
        .prizeCap b { color: #00509d; font-size: 13px; }
        .prizeCap span { color: #334155; font-size: 12px; }

        .subheadWrap {
          margin: 14px auto 6px;
          max-width: 640px;
          width: 100%;
        }
        .subhead {
          text-align: left;
          font-size: 15px;
          font-weight: 700;
          color: #1f2937;
        }

        .tableWrap {
          margin-top: 8px;
          margin-left: auto;
          margin-right: auto;
          max-width: 640px;
          width: 100%;
          overflow-x: auto;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          -webkit-overflow-scrolling: touch;
        }
        .table { width: 100%; border-collapse: collapse; font-size: 13px; }
        thead th {
          text-align: left;
          padding: 10px 12px;
          background: #f3f4f6;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 700;
          white-space: nowrap;
        }
        thead th:not(:first-child) { text-align: center; padding: 10px 8px; }
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
        .back:hover { background: #e9f1ff; color: #084298; }
        .back:active { transform: translateY(1px); }

        @media (max-width: 480px) {
          .wrap { padding: 8px 6px; }
          .panel { padding: 14px 10px; border-radius: 10px; max-width: 100%; }
          .title { font-size: 18px; margin-bottom: 10px; }
          .dni { font-size: 14px; padding: 5px 10px; }
          .cards { gap: 10px; }

          .prizes { gap: 12px; }
          .prize { padding: 8px 10px; min-width: 140px; }
          .prizeCap b { font-size: 12.5px; }
          .prizeCap span { font-size: 11.5px; }

          .error { font-size: 14px; padding: 8px 10px; }
          .tableWrap { margin-top: 10px; border-radius: 10px; }
          .subheadWrap { margin: 12px auto 4px; padding: 0 6px; }
          .subhead { font-size: 14px; }
        }
      `}</style>
    </>
  );
}

/* --- Card con “achieved” --- */
function Card({
  title,
  value,
  achieved = false,
}: {
  title: string;
  value: number;
  achieved?: boolean;
}) {
  return (
    <>
      <div
        className={`card ${achieved ? "achieved" : ""}`}
        aria-live="polite"
        aria-label={
          achieved
            ? `${title}. Meta alcanzada.`
            : `${title}. Meta: ${value} puntos.`
        }
      >
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
          transition: background-color .2s ease, border-color .2s ease;
        }
        /* 🎨 estado “alcanzado” en naranja tenue */
        .card.achieved {
          background: #d3fcf9ff;       /* naranja muy suave */
          border-color: #94e4f2ff;     /* naranja tenue (tailwind amber-300 aprox) */
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
          .card { padding: 12px 10px; min-height: 116px; }
          .cardTitle { font-size: 14px; min-height: 34px; }
          .cardValue { font-size: 24px; }
        }
      `}</style>
    </>
  );
}
