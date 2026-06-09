import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Calculadora Blins',
    short_name: 'Blins',
    description: 'Registro de servicios y cálculo de sueldo mensual',
    lang: 'es-CL',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8dbf3',
    theme_color: '#f8dbf3',
    orientation: 'portrait',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
