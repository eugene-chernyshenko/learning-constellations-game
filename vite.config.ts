import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: сайт в подкаталоге репозитория. В dev (`vite`) base остаётся `/`.
const repoBase = '/learning-constellations-game/'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : repoBase,
  plugins: [react()],
}))
