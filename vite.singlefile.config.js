import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Standalone single-HTML-file build, used only for quick previews/artifacts.
// The real deployment uses the normal vite.config.js build (dist/).
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: {
    outDir: 'dist-singlefile',
    emptyOutDir: true,
  },
})
