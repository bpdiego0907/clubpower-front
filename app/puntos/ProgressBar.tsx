"use client";
import React from "react";

export default function ProgressBar({
  puntos,
  metaCanasta,
  metaPavo,
}: { puntos: number; metaCanasta: number; metaPavo: number }) {
  const safePavo = Math.max(metaPavo, 1);
  const progressPct = Math.min((puntos / safePavo) * 100, 100);

  const faltanCan = Math.max(metaCanasta - puntos, 0);
  const faltanPavo = Math.max(metaPavo - puntos, 0);

  return (
    <div className="progressWrap" aria-label="Progreso de puntos hacia premios">
      <div className="progressBar">
        {/* Relleno + burbuja (mostrando PUNTOS) */}
        <div className="progressFill" style={{ width: `${progressPct}%` }}>
          <div className="headBubble">{puntos} puntos</div>
        </div>
      </div>

      {/* Bloque de textos debajo de la barra */}
      <div className="pointsBlock" role="status" aria-live="polite">
        <div className="pointsHeadline">
          Avance: <strong>{puntos} puntos</strong>
        </div>
        <div className="pointsSub">
          Faltan {faltanCan} pts. para canasta &ndash; Faltan {faltanPavo} pts. para Pavo
        </div>
      </div>

      <style jsx>{`
        .progressWrap {
          margin: 20px auto 8px;     /* mucho más bajo que antes porque ya no hay hitos */
          max-width: 680px;
          text-align: center;
          position: relative;
        }

        .progressBar {
          position: relative;
          height: 26px;
          background: linear-gradient(90deg, #a0c4ff, #bdb2ff);
          border-radius: 16px;
          overflow: hidden;           /* ya no necesitamos overflow visible */
          box-shadow: inset 0 0 6px rgba(0,0,0,0.12);
          margin: 0 8px;
        }

        .progressFill {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: linear-gradient(90deg, #00b4d8, #0096c7);
          border-radius: 16px;
          transition: width .6s ease;
          z-index: 1;
        }

        /* Burbuja fija pegada al inicio del relleno */
        .headBubble {
          position: absolute;
          z-index: 2;
          top: -26px;
          left: 6px;
          background: #ffffff;
          border: 1px solid #e6e9ef;
          border-radius: 999px;
          padding: 2px 8px;
          font-size: 12px;
          font-weight: 700;
          color: #0a58ca;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
          white-space: nowrap;
        }

        .pointsBlock { margin-top: 10px; }
        .pointsHeadline {
          font-size: 20px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 2px;
        }
        .pointsHeadline strong { color: #0a58ca; }
        .pointsSub {
          font-size: 14px;
          color: #374151;
        }

        @media (max-width: 480px) {
          .progressWrap { margin-top: 16px; padding: 0 8px; }
          .progressBar { height: 24px; border-radius: 14px; margin: 0 10px; }
          .headBubble { top: -22px; font-size: 11px; padding: 1px 7px; }
          .pointsHeadline { font-size: 18px; }
          .pointsSub { font-size: 13px; }
        }
      `}</style>
    </div>
  );
}
