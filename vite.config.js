import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Asegúrate que 'base' es correcto para tu despliegue. Para SWA, '/' suele ser adecuado.
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Actualiza el service worker automáticamente cuando hay nuevo contenido.
      injectRegister: 'auto', // O 'script' si prefieres control manual en tu main.jsx/tsx. 'auto' es más sencillo.
      
      // Opcional: Workbox configuration para el service worker (caching strategies, etc.)
      // workbox: {
      //   globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}'],
      //   // Otras opciones de Workbox aquí
      // },

      devOptions: {
        enabled: true, // Habilita PWA en modo desarrollo (útil para probar)
        type: 'module',
      },

      manifest: {
        name: 'Actua PWA',
        short_name: 'Actua',
        description: 'Aplicación Actua para el aprendizaje de habilidades sociales y emocionales',
        theme_color: '#6a5d4d', // Color principal de tu app (tomado de tu App.jsx)
        background_color: '#f6f5f1', // Color de fondo (tomado de tu App.jsx)
        display: 'standalone',
        scope: '/',
        start_url: '/', // URL de inicio de tu aplicación
        icons: [
          {
            src: 'pwa-192x192.png', // Coloca este icono en tu carpeta 'public'
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', // Coloca este icono en tu carpeta 'public'
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512-maskable.png', // Icono "maskable" (opcional pero recomendado)
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist'
  }
})