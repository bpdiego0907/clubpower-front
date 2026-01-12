"use client";
import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export default function AdminUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [token, setToken] = useState("");
  const [msg, setMsg] = useState<string>("");

  const onUpload = async () => {
    if (!file) return setMsg("Selecciona un archivo .csv o .xlsx");
    if (!token.trim()) return setMsg("Ingresa el token admin");

    setMsg("Subiendo...");

    const fd = new FormData();
    fd.append("file", file);

    const r = await fetch(`${API_BASE}/admin/cargar-base`, {
      method: "POST",
      headers: { "X-Admin-Token": token.trim() },
      body: fd,
    });

    const j = await r.json().catch(() => ({}));
    if (!r.ok) return setMsg(`Error: ${j.detail ?? r.status}`);

    setMsg(`✅ OK. Filas cargadas: ${j.filas_cargadas}. DIA: ${j.dia_forzado}`);
  };

  return (
    <main style={{ maxWidth: 560, margin: "40px auto", padding: 16 }}>
      <h2>Admin - Cargar nueva base</h2>

      <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
        <input
          type="password"
          placeholder="Token admin"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />

        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        <button onClick={onUpload} style={{ height: 38, cursor: "pointer" }}>
          Cargar y reemplazar base
        </button>

        <div style={{ whiteSpace: "pre-wrap" }}>{msg}</div>
      </div>

      <p style={{ marginTop: 16, fontSize: 12, color: "#555" }}>
        Columnas esperadas:
        <br />
        dni,nombre,dia,pp_total,pp_vr,porta_pp,ss_total,ss_vr,opp,oss,meta_ene_pp,meta_ene_ss,meta_feb_pp,meta_feb_ss
      </p>
    </main>
  );
}
