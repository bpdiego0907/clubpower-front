"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [dni, setDni] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = dni.trim();
    if (!/^\d{6,12}$/.test(cleaned)) {
      setErr("Ingresa un DNI válido (6 a 12 dígitos para pruebas).");
      return;
    }
    router.push(`/puntos?dni=${cleaned}`);
  };

  return (
    <main>
      <h1 style={{ color: "#0a58ca", marginBottom: 8 }}>CLUB POWER</h1>
      <p style={{ margin: "4px 0 24px" }}>Del 01 de nov al 21 de dic</p>

      <h2 style={{ marginBottom: 8 }}>🧭 Averigua aquí tus puntos:</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
        <label>
          N° documento:
          <input
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            placeholder="Ingresa tu DNI"
            inputMode="numeric"
            pattern="\d*"
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
          />
        </label>
        {err && <div style={{ color: "crimson" }}>{err}</div>}
        <button
          type="submit"
          style={{
            background: "#0a58ca",
            color: "white",
            padding: "10px 14px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            width: 160
          }}
        >
          Consultar
        </button>

        <div style={{ fontSize: 12, color: "#555", marginTop: 12 }}>
          *Si eres PDV/PDV Plus, ingresar documento del líder.<br/>
          *Si eres Multimarca/ HC EMO, ingresar documento del login.
        </div>
      </form>
    </main>
  );
}
