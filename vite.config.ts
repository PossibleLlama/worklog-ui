import { defineConfig, splitVendorChunkPlugin  } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./build"
  },
  plugins: [
    react(),
    splitVendorChunkPlugin(),
  ],
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "./src/API"),
      "@model": path.resolve(__dirname, "./src/Model"),
      "@component": path.resolve(__dirname, "./src/Components/"),
      "@view": path.resolve(__dirname, "./src/Views/"),
      "@page": path.resolve(__dirname, "./src/Pages/"),
      "@helper": path.resolve(__dirname, "./src/Helpers/"),
    },
  },
})
