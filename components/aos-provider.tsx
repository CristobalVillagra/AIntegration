import AOSProvider from "@/components/aos-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <AOSProvider>
          {children}
        </AOSProvider>
      </body>
    </html>
  )
}