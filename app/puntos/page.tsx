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
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const j = (await r.json()) as Res;
        setData(j);
      } catch (e: any) {
        setErr(e.message ?? "Error consultando la API");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [dni]);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "8px",
        marginTop: 0,
      }}
    >
      {/* ✅ Botón fijo arriba a la izquierda */}
      <button
        onClick={() => router.push("/")}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#084298";
          e.currentTarget.style.textDecoration = "underline";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#0a58ca";
          e.currentTarget.style.textDecoration = "none";
        }}
        style={{
          position: "fixed",
          top: 20,
          left: 24,
          background: "none",
          border: "none",
          color: "#0a58ca",
          fontWeight: 600,
          cursor: "pointer",
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          gap: 4,
          transition: "all 0.2s ease",
          zIndex: 1000, // para que quede sobre todo
        }}
      >
        ← Atrás
      </button>

      <div
        style={{
          background: "#f8f9fa",
          borderRadius: 12,
          boxShadow: "0 2px 5px rgba(0,0,0,0.06)",
          padding: "20px 16px",
          maxWidth: 720,
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#0a58ca",
            marginBottom: 12,
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          🎁 Hola, revisa tus puntos
        </h2>

        {loading && <div style={{ fontSize: 15 }}>Cargando…</div>}
        {err && <div style={{ color: "crimson", fontSize: 15 }}>Error: {err}</div>}

        {!loading && !err && data && "dni" in data && (
          <>
            <div style={{ display: "grid", gap: 12, justifyItems: "center" }}>
              <div
                style={{
                  fontSize: 15,
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  padding: "6px 12px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  width: "fit-content",
                }}
              >
                <b>DNI:</b> {data.dni}
              </div>

              <div
                style={{
                  display: "grid",
                  gap: 14,
                  width: "100%",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  maxWidth: 640,
                }}
              >
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

            <div style={{ marginTop: 16 }}>
              <ScoringTable />
            </div>
          </>
        )}

        {!loading && !err && data && "detail" in data && (
          <div style={{ color: "#444", fontSize: 15 }}>{(data as any).detail}</div>
        )}
      </div>
    </main>
  );
}

/** Card compacta con alturas normalizadas */
function Card({ title, value }: { title: string; value: number }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: "14px 12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: 130,
      }}
    >
      <div
        style={{
          fontSize: 15,
          color: "#444",
          textAlign: "center",
          lineHeight: 1.25,
          minHeight: 38,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 6,
          padding: "0 6px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 26,
          color: "#0a58ca",
          fontWeight: 700,
          marginTop: 4,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/** Tabla de puntajes */
function ScoringTable() {
  return (
    <div
      aria-label="Tabla de puntaje por producto"
      style={{
        margin: "0 auto",
        maxWidth: 640,
        width: "100%",
        overflowX: "auto",
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 13,
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: "left",
                padding: "10px 12px",
                background: "#f3f4f6",
                borderBottom: "1px solid #e5e7eb",
                fontWeight: 700,
              }}
            >
              PRODUCTO
            </th>
            {["PP", "OSS", "PORTA PP", "ALTA POST / OPP", "UR"].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "center",
                  padding: "10px 8px",
                  background: "#f3f4f6",
                  borderBottom: "1px solid #e5e7eb",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              style={{
                textAlign: "left",
                padding: "10px 12px",
                borderTop: "1px solid #e5e7eb",
                fontWeight: 600,
                background: "#fafafa",
              }}
            >
              PUNTAJE
            </th>
            {[1, 3, 2, 2, "+0.5"].map((v, i) => (
              <td
                key={i}
                style={{
                  textAlign: "center",
                  padding: "10px 8px",
                  borderTop: "1px solid #e5e7eb",
                  color: "#0a58ca",
                  fontWeight: 700,
                }}
              >
                {v}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
