import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { IvaProvider } from '@/providers/IvaProvider'
import { ServiceWorkerRegistrar } from '@/components/ServiceWorkerRegistrar'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: 'Mis Servicios',
  description: 'Registro de servicios y cálculo de sueldo mensual',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Servicios',
  },
}

export const viewport: Viewport = {
  themeColor: '#18181b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" className={geist.variable}>
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <IvaProvider>
          <ServiceWorkerRegistrar />
          {children}
        </IvaProvider>
      </body>
    </html>
  )
}
