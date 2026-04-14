import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import { Analytics } from '@vercel/analytics/react'
import { Providers } from '@/components/providers'
import Script from 'next/script'
import './globals.css'
import { WhatsAppButton } from '@/components/whatsapp-button'

export const metadata: Metadata = {
  title: 'AIntegration - Soluciones de IA e Informática',
  description: 'Transformamos tu empresa con soluciones tecnológicas inteligentes.',
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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} font-sans antialiased`}>
        <Providers>
          {children}
          <WhatsAppButton />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </Providers>

        <Script
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}