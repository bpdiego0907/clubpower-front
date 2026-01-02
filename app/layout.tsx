export const metadata = {};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "system-ui, Segoe UI, Roboto, Arial" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "18px 16px",
            textAlign: "center",
          }}
        >
          <img
            src="/logo.png"
            alt="Logo Club Power"
            style={{
              width: 520,              // ⬅️ más grande
              maxWidth: "92vw",         // ⬅️ responsive
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
