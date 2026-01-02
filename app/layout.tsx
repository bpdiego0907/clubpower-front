import type { Metadata } from "next";
import FlyerButton from "./FlyerButton";

export const metadata: Metadata = {};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "system-ui, Segoe UI, Roboto, Arial" }}>
        {/* Botón (client) */}
        <FlyerButton />

        <div
          style={{
            maxWidth: 880,
            margin: "0 auto",
            padding: "12px 16px",
            textAlign: "center",
          }}
        >
          <img
            src="/logo.png"
            alt="Logo Club Power"
            style={{
              width: 420,
              height: "auto",
              marginBottom: 10,
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />

          {children}
        </div>
      </body>
    </html>
  );
}
