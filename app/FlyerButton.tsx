"use client";
import { useState } from "react";
import Image from "next/image";

export default function FlyerButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="flyerBtn" onClick={() => setOpen(true)}>
        📄 Ver flyer
      </button>

      {open && (
        <div className="overlay" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setOpen(false)}>
              ✕
            </button>

            <Image
              src="/flyer.jpeg"
              alt="Flyer Club Power"
              width={900}
              height={1200}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .flyerBtn {
          position: fixed;
          top: 14px;
          right: 14px;
          background: #0a58ca;
          color: #fff;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          font-weight: 800;
          cursor: pointer;
          z-index: 2001;
        }
        .flyerBtn:hover {
          filter: brightness(1.05);
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3000;
          padding: 12px;
        }

        .modal {
          background: #fff;
          border-radius: 12px;
          max-width: 900px;
          width: 100%;
          max-height: 95vh;
          overflow: auto;
          position: relative;
          padding: 10px;
        }

        .close {
          position: absolute;
          top: 8px;
          right: 10px;
          background: transparent;
          border: none;
          font-size: 18px;
          cursor: pointer;
          font-weight: 900;
        }
      `}</style>
    </>
  );
}
