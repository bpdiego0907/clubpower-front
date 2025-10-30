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
      setErr("Ingresa un DNI válido (6 a 12 dígitos).");
      return;
    }
    router.push(`/puntos?dni=${cleaned}`);
  };

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "4px", // 🔹 antes 16px
        marginTop: "-8px", // 🔹 sube todo ligeramente
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          background: "#ffffff",
          borderRadius: 12,
          padding: "16px 12px", // 🔹 menos padding
          boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ maxWidth: 420, margin: "0 auto", textAlign: "center" }}>
          <h1
            style={{
              color: "#0a58ca",
              marginBottom: 4,
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Del 01 de nov al 21 de dic
          </h1>

          <h2 style={{ marginBottom: 10, fontSize: 18 }}>
            🧭 Averigua aquí tus puntos:
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gap: 10,
              justifyItems: "center",
              marginTop: 6,
            }}
          >
            <label
              style={{
                width: "100%",
                textAlign: "left",
                fontSize: 15,
                color: "#333",
              }}
            >
              N° documento:
              <input
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Ingresa tu DNI"
                inputMode="numeric"
                pattern="\d*"
                style={{
                  width: "100%",
                  padding: "7px 9px",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  marginTop: 4,
                  fontSize: 15,
                }}
              />
            </label>

            {err && (
              <div style={{ color: "crimson", fontSize: 13, marginTop: 2 }}>
                {err}
              </div>
            )}

            <button
              type="submit"
              style={{
                background: "#0a58ca",
                color: "white",
                padding: "8px 12px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                width: 130,
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Consultar
            </button>

            <div
              style={{
                fontSize: 11,
                color: "#555",
                marginTop: 6,
                lineHeight: 1.3,
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
