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
      setErr("Ingresa un DNI válido.");
      return;
    }
    router.push(`/puntos?dni=${cleaned}`);
  };

  return (
    <main className="wrap">
      <div className="hero">
        <div className="inner">
          <h1 className="title">Del 01 de nov al 21 de dic</h1>
          <h2 className="subtitle">🧭 Averigua aquí tus puntos:</h2>

          <form onSubmit={handleSubmit} className="form">
            <label className="label">
              N° documento:
              <input
                className="input"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Ingresa tu DNI"
                inputMode="numeric"
                pattern="\d*"
              />
            </label>

            {err && <div className="err">{err}</div>}

            <button type="submit" className="btn">
              Consultar
            </button>

            <div className="note">
              *Si eres PDV/PDV Plus, ingresar documento del líder.
              <br />
              *Si eres Multimarca/HC EMO, ingresar documento del login.
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .wrap {
          display: flex;
          justify-content: center;
          padding: 16px;
          margin-top: 0;
        }

        .hero {
          width: 100%;
          max-width: 880px;
          background: #fff;
          border-radius: 12px;
          padding: 24px 16px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          overflow: hidden; /* 👈 evita que algo se desborde */
        }

        .inner {
          max-width: 520px;
          margin: 0 auto;
          text-align: center;
        }

        .title {
          color: #0a58ca;
          margin: 0 0 6px;
          font-size: 20px;
          font-weight: 700;
        }

        .subtitle {
          margin: 0 0 8px;
          font-size: 16px;
          font-weight: 600;
        }

        .form {
          display: grid;
          gap: 12px;
          justify-items: center;
          margin-top: 8px;
        }

        .label {
          width: 100%;
          text-align: left;
          font-size: 14px;
        }

        .input {
          width: 100%;
          display: block; /* 👈 asegura comportamiento consistente */
          max-width: 100%;
          padding: 12px;
          font-size: 16px; /* 👈 evita zoom en iOS */
          border-radius: 10px;
          border: 1px solid #ccc;
          margin-top: 4px;
          outline: none;
          box-sizing: border-box; /* 👈 corrige el desfase del borde */
          WebkitAppearance: none; /* 👈 limpia estilo iOS */
        }

        .input:focus {
          border-color: #0a58ca;
          box-shadow: 0 0 0 3px rgba(10, 88, 202, 0.12);
        }

        .err {
          color: crimson;
          font-size: 13px;
        }

        .btn {
          background: #0a58ca;
          color: #fff;
          border: none;
          border-radius: 8px;
          height: 40px;
          padding: 0 16px;
          width: 160px;
          cursor: pointer;
          font-weight: 700;
          transition: transform 0.06s ease, filter 0.12s ease;
        }

        .btn:hover {
          filter: brightness(1.06);
        }

        .btn:active {
          transform: translateY(1px);
        }

        .note {
          font-size: 12px;
          color: #555;
          margin-top: 6px;
          text-align: left;
        }

        /* Mobile tweaks */
        @media (max-width: 480px) {
          .hero {
            padding: 16px 12px;
            border-radius: 10px;
          }

          .title {
            font-size: 18px;
            margin-bottom: 4px;
          }

          .subtitle {
            font-size: 15px;
            margin-bottom: 10px;
          }

          .btn {
            width: 140px;
            height: 38px;
          }

          .input {
            padding: 10px;
            font-size: 16px;
          }
        }
      `}</style>
    </main>
  );
}
