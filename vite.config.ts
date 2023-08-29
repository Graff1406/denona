import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      outDir: "dist",
      workbox: {
        globPatterns: ["**/*.{ts.js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "Denona long name",
        short_name: "Denona",
        description: "What you focus on determines the quality of your life",
        theme_color: "#F6B704",
        start_url: "/",
        icons: [
          {
            src: "/images/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "/images/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "/images/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: [
            "react",
            "react-dom",
            "react-redux",
            "react-router-dom",
            "react-icons",
            "@reduxjs/toolkit",
            "react-helmet-async",
          ],
        },
      },
    },
  },
});
