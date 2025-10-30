export const metadata = { title: "Club Power", description: "Consulta de puntos" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "system-ui, Segoe UI, Roboto, Arial" }}>
        <div style={{ maxWidth: 880, margin: "24px auto", padding: 16 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
