"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type AvanceOk = {
  dni: string;
  nombre: string;
  dia: string; // YYYY-MM-DD (D-1)
  pp_total: number;
  pp_vr: number;
  porta_pp: number;
  ss_total: number;
  ss_vr: number;
  opp: number;
  oss: number;
  updated_at?: string;
};

type Res = AvanceOk | { detail: string };

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

// 🔧 Ajusta aquí las cuotas de la campaña (si luego quieres que vengan de BD, se cambia)
const OBJ = {
  enero: { pp: 50, ss: 2 },
  febrero: { pp: 48, ss: 1 },
};

function fmtDateDDMMYYYY(iso: string) {
  // "2026-01-05" -> "05/01/2026"
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default function AvancePage({
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
        const r = await fetch(`${API_BASE}/avance/${dni}`, { cache: "no-store" });

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

  // Total de cuotas (enero + febrero) como en tu maqueta (no se reinicia)
  const totals = useMemo(() => {
    return {
      pp: OBJ.enero.pp + OBJ.febrero.pp,
      ss: OBJ.enero.ss + OBJ.febrero.ss,
    };
  }, []);

  return (
    <>
      <button className="back" onClick={() => router.push("/")} aria-label="Volver">
        ← Atrás
      </button>

      <main className="wrap">
        <div className="panel">
          {loading && <div className="small">Cargando…</div>}
          {err && <div className="error">❌ {err}</div>}

          {!loading && !err && data && "dni" in data && (
            <>
              {/* Saludo */}
              <div className="helloRow">
                <span className="gift" aria-hidden="true">🎁</span>
                <div className="hello">
                  Hola <i>{data.nombre}</i>, ¿listo para ganar?
                </div>
              </div>

              {/* Objetivos Enero / Febrero */}
              <section className="block">
                <div className="objGrid">
                  <div className="month">
                    <div className="monthName">ENERO:</div>
                    <div className="kv">
                      <span>Objetivo PP</span>
                      <span className="boxNum">{OBJ.enero.pp}</span>
                    </div>
                    <div className="kv">
                      <span>Objetivo SS</span>
                      <span className="boxNum">{OBJ.enero.ss}</span>
                    </div>
                  </div>

                  <div className="month">
                    <div className="monthName">FEBRERO:</div>
                    <div className="kv">
                      <span>Objetivo PP</span>
                      <span className="boxNum">{OBJ.febrero.pp}</span>
                    </div>
                    <div className="kv">
                      <span>Objetivo SS</span>
                      <span className="boxNum">{OBJ.febrero.ss}</span>
                    </div>
                  </div>

                  <div className="month totals">
                    <div className="monthName">TOTAL:</div>
                    <div className="kv">
                      <span>Total PP</span>
                      <span className="boxNum">{totals.pp}</span>
                    </div>
                    <div className="kv">
                      <span>Total SS</span>
                      <span className="boxNum">{totals.ss}</span>
                    </div>
                  </div>
                </div>

                <div className="notes">
                  *Participan PP (VR o PORTA) <br />
                  *Participan SS (VR, OPP, OSS)
                </div>
              </section>

              {/* Avance al D-1 */}
              <section className="block">
                <div className="avanceHead">
                  <span className="clock" aria-hidden="true">⏱️</span>
                  <div className="avanceTitle">
                    Avance al {fmtDateDDMMYYYY(data.dia)}:
                  </div>
                </div>

                <div className="avanceGrid">
                  <div className="col">
                    <div className="kv2">
                      <span className="k">PP TOTAL:</span>
                      <span className="boxNum">{data.pp_total}</span>
                    </div>
                    <div className="kv2">
                      <span className="k">VR PP:</span>
                      <span className="boxNum">{data.pp_vr}</span>
                    </div>
                    <div className="kv2">
                      <span className="k">Porta PP:</span>
                      <span className="boxNum">{data.porta_pp}</span>
                    </div>
                  </div>

                  <div className="col">
                    <div className="kv2">
                      <span className="k">SS TOTAL:</span>
                      <span className="boxNum">{data.ss_total}</span>
                    </div>
                    <div className="kv2">
                      <span className="k">VR SS:</span>
                      <span className="boxNum">{data.ss_vr}</span>
                    </div>
                    <div className="kv2">
                      <span className="k">OPP:</span>
                      <span className="boxNum">{data.opp}</span>
                    </div>
                    <div className="kv2">
                      <span className="k">OSS:</span>
                      <span className="boxNum">{data.oss}</span>
                    </div>
                  </div>
                </div>

                <div className="reminder">
                  *Recuerda: ¡Mientras más sobrecumplas tu objetivo, más chances de ganar!
                </div>
              </section>

              {/* Laptop */}
              <div className="laptopWrap">
                <Image
                  src="/laptop.png"
                  alt="Premio laptop"
                  width={260}
                  height={180}
                  priority
                />
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
          background: #fff;
          border-radius: 12px;
          padding: 10px 8px 18px;
          max-width: 720px;
          width: 100%;
          text-align: left;
        }

        .small { font-size: 15px; text-align: center; }
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

        .helloRow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 6px 0 10px;
          color: #0a58ca;
          font-weight: 800;
        }
        .gift { font-size: 18px; }
        .hello { font-size: 15px; }
        .hello i { font-style: italic; }

        .block {
          margin-top: 10px;
          padding: 10px 8px;
        }

        .objGrid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
          align-items: start;
        }

        .monthName {
          font-weight: 900;
          font-size: 13px;
          margin-bottom: 6px;
          color: #111;
        }

        .kv {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          margin: 6px 0;
        }

        .totals .monthName {
          color: #111;
        }

        .boxNum {
          min-width: 44px;
          text-align: center;
          border: 1px solid #111;
          padding: 2px 6px;
          font-weight: 800;
          background: #fff;
        }

        .notes {
          margin-top: 8px;
          font-size: 12px;
          color: #333;
          font-style: italic;
          line-height: 1.25;
        }

        .avanceHead {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 6px 0 8px;
          font-weight: 900;
          color: #111;
        }
        .clock { font-size: 16px; }
        .avanceTitle { font-size: 13px; }

        .avanceGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-top: 8px;
        }

        .kv2 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          margin: 6px 0;
        }

        .k {
          font-weight: 900;
        }

        .reminder {
          margin-top: 10px;
          font-size: 12px;
          color: #111;
          font-style: italic;
        }

        .laptopWrap {
          display: flex;
          justify-content: center;
          margin-top: 14px;
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

        @media (max-width: 720px) {
          .objGrid {
            grid-template-columns: 1fr;
          }
          .avanceGrid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
      `}</style>
    </>
  );
}
