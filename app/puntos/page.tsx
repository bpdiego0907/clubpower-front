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
    <main>
      <h2 style={{ color: "#0a58ca", marginBottom: 20 }}>🎁 Hola, revisa tus puntos</h2>

      {loading && <div>Cargando…</div>}
      {err && <div style={{ color: "crimson" }}>Error: {err}</div>}

      {!loading && !err && data && "dni" in data && (
        <div style={{ display: "grid", gap: 16, maxWidth: 520 }}>
          <div><b>DNI:</b> {data.dni}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 14, color: "#444" }}>Puntos para ganar la Canasta Navideña</div>
              <div style={{ fontSize: 28, color: "#0a58ca", fontWeight: 700 }}>{data.canasta}</div>
            </div>
            <div style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 14, color: "#444" }}>Puntos para ganar el Vale de Pavo</div>
              <div style={{ fontSize: 28, color: "#0a58ca", fontWeight: 700 }}>{data.pavo}</div>
            </div>
          </div>
        </div>
      )}

      {!loading && !err && data && "detail" in data && (
        <div style={{ color: "#444" }}>{data.detail}</div>
      )}
    </main>
  );
}
