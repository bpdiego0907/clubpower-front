"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [dni, setDni] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = dni.trim();
    if (!/^\d{6,12}$/.test(cleaned)) {
      setErr("Ingresa un DNI válido.");
      return;
    }
    setErr(null);
    router.push(`/puntos?dni=${cleaned}`);
  };

  return (
    <main className="wrap">
      {/* Rango de campaña */}
      <div className="dateRow">
        <span className="icon">🗓️</span>
        <span className="dateText">
          Del <b>01</b> de ene al <b>28</b> de feb
        </span>
      </div>

      {/* Buscador */}
      <section className="box">
        <div className="titleRow">
          <span className="iconBell">🔔</span>
          <div className="title">Averigua aquí tu objetivo PP y SS</div>
        </div>

        <form onSubmit={onSubmit} className="form">
          <label className="labelRow">
            <span className="labelText">N°documento:</span>
            <input
              className="input"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              inputMode="numeric"
              pattern="\d*"
              placeholder="Ej: 99999999"
            />
          </label>

          {err && <div className="err">{err}</div>}

          <button type="submit" className="btn">
            Consultar
          </button>
        </form>

        <div className="hint">*Ingresar documento del líder</div>
      </section>

      <style jsx>{`
        .wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 10px;
          text-align: center;
        }

        .dateRow {
          margin-top: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          color: #0a58ca;
          font-weight: 900;
          font-size: 20px;
        }

        .icon {
          font-size: 20px;
          line-height: 1;
        }

        .box {
          width: 100%;
          max-width: 820px;
          margin: 52px auto 0;
        }

        /* ✅ CENTRADO REAL del título con ícono */
        .titleRow {
          display: flex;
          justify-content: center; /* 👈 clave */
          align-items: center;
          gap: 12px;
          color: #0a58ca;
          font-weight: 900;
          font-size: 18px;
          margin-bottom: 18px;
        }

        .iconBell {
          font-size: 18px;
          line-height: 1;
          transform: translateY(1px);
        }

        .title {
          transform: translateY(1px);
        }

        .form {
          display: grid;
          justify-items: center; /* ✅ centra hijos del form (botón, error, etc.) */
          gap: 14px;
        }

        /* ✅ Label en una sola línea (como el mock) y centrado */
        .labelRow {
          display: flex;
          align-items: center;
          justify-content: center; /* 👈 centra el conjunto */
          gap: 10px;
          font-size: 16px;
          color: #000;
        }

        .labelText {
          white-space: nowrap;
          font-size: 14px;
        }

        .input {
          width: 340px;
          padding: 8px 10px;
          border: 1px solid #000;
          border-radius: 0;
          font-size: 16px;
          outline: none;
        }

        .input:focus {
          border-color: #0a58ca;
          box-shadow: 0 0 0 3px rgba(10, 88, 202, 0.12);
        }

        .btn {
          width: 170px;
          height: 40px;
          background: #0a58ca;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          justify-self: center; /* ✅ por si acaso */
        }

        .btn:hover {
          filter: brightness(1.05);
        }

        .err {
          color: crimson;
          font-size: 13px;
          justify-self: center;
        }

        /* ✅ Hint centrado exactamente debajo */
        .hint {
          margin-top: 18px;
          font-size: 13px;
          color: #444;
          font-style: italic;
          text-align: center;
        }

        @media (max-width: 480px) {
          .dateRow {
            font-size: 16px;
          }

          .titleRow {
            font-size: 16px;
          }

          .labelRow {
            flex-direction: column; /* en celular, label arriba y input abajo */
            align-items: center;
            gap: 8px;
          }

          .input {
            width: 78vw;
            max-width: 360px;
          }
        }
      `}</style>
    </main>
  );
}
