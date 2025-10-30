export const metadata = {};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "system-ui, Segoe UI, Roboto, Arial" }}>
        <div style={{
          maxWidth: 880,
          margin: "0 auto",
          padding: "24px 16px",
          textAlign: "center"
        }}>
          {/* ✅ Logo superior */}
          <img 
            src="/logo.png" 
            alt="Logo Club Power"
            style={{
              width: 600,
              height: "auto",
              marginBottom: 12,
              display: "block",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          />

          {/* ✅ Contenido dinámico (las páginas) */}
          {children}
        </div>
      </body>
    </html>
  );
}
