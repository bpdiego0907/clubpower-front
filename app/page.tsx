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
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "16px",
        marginTop: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 880,
          background: "#ffffff", // Fondo blanco limpio
          borderRadius: 16,
          padding: "32px 24px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ color: "#0a58ca", marginBottom: 8 }}>
            Del 01 de nov al 21 de dic
          </h1>
          <h2 style={{ marginBottom: 8 }}>🧭 Averigua aquí tus puntos:</h2>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gap: 12,
              justifyItems: "center",
              marginTop: 12,
            }}
          >
            <label style={{ width: "100%", textAlign: "left" }}>
              N° documento:
              <input
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Ingresa tu DNI"
                inputMode="numeric"
                pattern="\d*"
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  marginTop: 4,
                }}
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
                width: 160,
                fontWeight: "bold",
              }}
            >
              Consultar
            </button>

            <div
              style={{
                fontSize: 12,
                color: "#555",
                marginTop: 12,
                textAlign: "left",
              }}
            >
              *Si eres PDV/PDV Plus, ingresar documento del líder.<br />
              *Si eres Multimarca/HC EMO, ingresar documento del login.
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
