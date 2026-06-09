import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { IvaProvider } from '@/providers/IvaProvider'
import { ServiceWorkerRegistrar } from '@/components/ServiceWorkerRegistrar'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Calculadora Blins',
  description: 'Registro de servicios y cálculo de sueldo mensual',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Calculadora Blins',
  },
}

export const viewport: Viewport = {
  themeColor: '#f8dbf3',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" className={geist.className}>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Calculadora Blins" />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <IvaProvider>
          <ServiceWorkerRegistrar />
          {children}
        </IvaProvider>
      </body>
    </html>
  )
}
