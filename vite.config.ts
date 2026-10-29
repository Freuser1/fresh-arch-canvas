import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// One build for the whole site: every HTML file listed under `input` becomes a
// page in dist/. Everything in public/ (CNAME, pdfs/, models/) is copied to
// dist/ unchanged.
export default defineConfig({
  // Relative URLs, so the built site works on farazfaramarzi.com, on
  // <user>.github.io/fresh-arch-canvas/ and when opened with `npm run preview`.
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: 'index.html',         // 3D sky view (start page)
        portfolio: 'portfolio.html', // React portfolio subsite
        render: 'render.html',       // rendered video page
        husiskogen: 'hus-i-skogen.html', // Hus i skogen project page
      },
    },
  },
})
