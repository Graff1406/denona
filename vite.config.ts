import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    extensions: [".js", ".ts", ".tsx", ".jsx"],
  },

  plugins: [
    react(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate", // default is "prompt"
      strategies: "generateSW",

      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\.(?:js|css|html|ico|png|svg)$/,
            handler: "CacheFirst",
          },
        ],
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        sourcemap: true,
        // importScripts: ["/src/features/PWA/ws.ts"],
        clientsClaim: true,
        // skipWaiting: true,
      },
      // devOptions: {
      //   enabled: true,
      // },
      manifest: {
        name: "Denona",
        short_name: "Denona",
        description: "What you focus on determines the quality of your life",
        theme_color: "#ffffff",
        start_url: "/",
        icons: [
          {
            src: "/images/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "/images/apple-touch-icon-180x180.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/images/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/images/maskable-icon-512x512.png",
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
