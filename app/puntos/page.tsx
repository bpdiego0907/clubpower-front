"use client";
import { useEffect, useState } from "react";

type Res = { dni: string; canasta: number; pavo: number } | { detail: string };

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!; // definido en .env.local

export default function PuntosPage({ searchParams }: { searchParams: { dni?: string } }) {
  const dni = (searchParams?.dni || "").trim();
  const [data, setData] = useState<Res | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

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
        // ❌ quitamos minHeight: "100vh" para no empujar el panel hacia abajo del logo
        display: "flex",
        justifyContent: "center",
        padding: "16px",
        marginTop: 0,
      }}
    >
      <div
        style={{
          background: "#f8f9fa",
          borderRadius: 16,
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          padding: "32px 28px",
          maxWidth: 880,
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#0a58ca", marginBottom: 20, fontSize: 24 }}>
          🎁 Hola, revisa tus puntos
        </h2>

        {loading && <div>Cargando…</div>}
        {err && <div style={{ color: "crimson" }}>Error: {err}</div>}

        {!loading && !err && data && "dni" in data && (
          <div style={{ display: "grid", gap: 24, justifyItems: "center" }}>
            {/* Badge DNI */}
            <div
              style={{
                fontSize: 16,
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: 10,
                padding: "10px 18px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                width: "fit-content",
              }}
            >
              <b>DNI:</b> {data.dni}
            </div>

            {/* Cuadros iguales y alineados */}
            <div
              style={{
                display: "grid",
                gap: 24,
                width: "100%",
                // 2 columnas en desktop, 1 en pantallas pequeñas
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                maxWidth: 700, // un poco más ancho
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
        )}

        {!loading && !err && data && "detail" in data && (
          <div style={{ color: "#444", fontSize: 16 }}>{data.detail}</div>
        )}
      </div>
    </main>
  );
}

/** Card con alturas normalizadas para que los números queden alineados */
function Card({ title, value }: { title: string; value: number }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: "20px 16px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // Altura mínima para que ambas tarjetas midan lo mismo
        minHeight: 160,
      }}
    >
      {/* Área de título con altura fija para igualar ambas */}
      <div
        style={{
          fontSize: 15,
          color: "#444",
          textAlign: "center",
          lineHeight: 1.25,
          // Normalizamos altura del título (soporta 1–2 líneas)
          minHeight: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 8,
          padding: "0 6px",
        }}
      >
        {title}
      </div>

      {/* Valor centrado y grande */}
      <div
        style={{
          fontSize: 32,
          color: "#0a58ca",
          fontWeight: 700,
          marginTop: 6,
        }}
      >
        {value}
      </div>
    </div>
  );
}
