"use client";
import Image from "next/image";
import React from "react";

export default function ProgressBar({
  puntos,
  metaCanasta,
  metaPavo,
}: { puntos: number; metaCanasta: number; metaPavo: number }) {
  const safePavo = Math.max(metaPavo, 1);
  const progressPct = Math.min((puntos / safePavo) * 100, 100);

  // Layout visual actual: Canasta fija ~70%, Pavo al borde derecho
  const canPct = 70;
  const pavoTickPct = 100;
  const pavoMilestonePct = 99.5;

  const faltanCan = Math.max(metaCanasta - puntos, 0);
  const faltanPavo = Math.max(metaPavo - puntos, 0);

  return (
    <div className="progressWrap" aria-label="Progreso de puntos hacia premios">
      <div className="progressBar">
        {/* Relleno + burbuja (mostrando PUNTOS, fija al inicio) */}
        <div className="progressFill" style={{ width: `${progressPct}%` }}>
          <div className="headBubble">
            {puntos} puntos
          </div>
        </div>

        {/* Guías */}
        <div className="guide" style={{ left: `${canPct}%` }} aria-hidden="true" />
        <div className="guide guideRight" style={{ left: `${pavoTickPct}%` }} aria-hidden="true" />

        {/* Ticks */}
        <div className="tick" style={{ left: `${canPct}%` }} aria-hidden="true" />
        <div className="tick tickRight" style={{ left: `${pavoTickPct}%` }} aria-hidden="true" />

        {/* Hito Canasta */}
        <div className="milestone canasta" style={{ left: `${canPct}%` }}>
          <div className="imgWrap">
            <Image src="/canasta.jpg" alt="Canasta Navideña" width={68} height={68} className="icon" priority />
          </div>
          <div className="badge">
            <b>Canasta</b>
            <span>S/50–S/100</span>
          </div>
        </div>

        {/* Hito Pavo */}
        <div className="milestone pavo" style={{ left: `${pavoMilestonePct}%` }}>
          <div className="imgWrap">
            <Image src="/pavo.png" alt="Vale de pavo 6 kg" width={76} height={76} className="icon" priority />
          </div>
          <div className="badge">
            <b>Pavo 6 kg</b>
            <span>S/100</span>
          </div>
        </div>
      </div>

      {/* ✅ Bloque de textos debajo de la barra, estilo referencia */}
      <div className="pointsBlock" role="status" aria-live="polite">
        <div className="pointsHeadline">Avance: <strong>{puntos} puntos</strong></div>
        <div className="pointsSub">
          Faltan {faltanCan} pts. para canasta &ndash; Faltan {faltanPavo} pts. para Pavo
        </div>
      </div>

      <style jsx>{`
        .progressWrap {
          margin: 160px auto 8px;
          max-width: 680px;
          text-align: center;
          position: relative;
        }

        .progressBar {
          position: relative;
          height: 26px;
          background: linear-gradient(90deg, #a0c4ff, #bdb2ff);
          border-radius: 16px;
          overflow: visible;
          box-shadow: inset 0 0 6px rgba(0,0,0,0.12);
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

        /* 🔵 Burbuja fija al inicio de la barra, mostrando "X puntos" */
        .headBubble {
          position: absolute;
          z-index: 4;
          top: -28px;          /* encima de la barra */
          left: -6px;          /* anclada al inicio del progreso (borde izquierdo de la barra) */
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

        .guide {
          position: absolute;
          z-index: 2;
          top: -112px;
          transform: translateX(-50%);
          height: 112px;
          width: 2px;
          background: rgba(0,0,0,0.14);
        }
        .guideRight { transform: translateX(-50%); }

        .tick {
          position: absolute;
          z-index: 3;
          top: 0;
          transform: translateX(-50%);
          height: 100%;
          width: 2px;
          background: rgba(0, 0, 0, 0.22);
        }
        .tickRight { transform: translateX(-50%); }

        .milestone {
          position: absolute;
          z-index: 5;
          top: -130px;         /* ya ajustado para no solaparse con las cards */
          transform: translateX(-50%);
          text-align: center;
          width: 140px;
          pointer-events: none;
        }

        .imgWrap { display: flex; justify-content: center; align-items: center; }
        .icon {
          border-radius: 50%;
          border: 3px solid #fff;
          object-fit: cover;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          background: #fff;
        }

        .badge {
          margin: 6px auto 0;
          background: rgba(255,255,255,0.98);
          border: 1px solid #e6e9ef;
          border-radius: 10px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          padding: 4px 8px;
          display: inline-flex;
          flex-direction: column;
          gap: 2px;
          line-height: 1.15;
        }
        .badge b { color: #00509d; font-size: 12px; }
        .badge span { color: #334155; font-size: 11px; }

        /* 🆕 Bloque de textos debajo de la barra */
        .pointsBlock { margin-top: 12px; }
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

        /* ====== Ajustes responsive para móvil ====== */
        @media (max-width: 480px) {
          .progressWrap {
            margin-top: 135px;   /* baja un poco respecto al desktop */
            padding: 0 8px;      /* respiración lateral */
          }

          /* hitos más compactos */
          .milestone { width: 112px; top: -118px; }
          .icon { width: 54px !important; height: 54px !important; }
          .badge b { font-size: 10.5px; }
          .badge span { font-size: 9.5px; }

          /* guía acompaña la nueva altura */
          .guide { top: -102px; height: 102px; }

          /* burbuja dentro del contenedor y más compacta */
          .headBubble { top: -24px; left: 6px; font-size: 11px; padding: 1px 7px; }

          /* barra ligeramente más alta */
          .progressBar { height: 24px; border-radius: 14px; }

          .pointsBlock { margin-top: 10px; }
          .pointsHeadline { font-size: 18px; }
          .pointsSub { font-size: 13px; }
        }

        /* teléfonos muy estrechos (320–360px) */
        @media (max-width: 360px) {
          .progressWrap { margin-top: 128px; padding: 0 6px; }
          .milestone { top: -114px; width: 108px; }
          .icon { width: 50px !important; height: 50px !important; }
          .guide { top: -98px; height: 98px; }
          .headBubble { left: 4px; font-size: 10.5px; }
          .pointsHeadline { font-size: 17px; }
          .pointsSub { font-size: 12.5px; }
        }
      `}</style>
    </div>
  );
}
