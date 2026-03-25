import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
// @ts-ignore

import { Analytics } from '@vercel/analytics/react'
import { Providers } from '@/components/providers'
import Script from 'next/script'
import './globals.css'

const geist = Geist({
  subsets: ["latin"],
  variable: '--font-geist-sans', // Definimos una variable CSS
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'AIntegration - Soluciones de IA e Informática',
  description: 'Transformamos tu empresa con soluciones tecnológicas inteligentes. Cotiza servicios de informática, desarrollo web, IA y más.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // suppressHydrationWarning evita errores de consola por temas (light/dark)
    <html lang="es" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
        <Script src="https://sdk.mercadopago.com/js/v2" strategy="beforeInteractive" />
      </body>
    </html>
  )
}