import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        type: "module",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        // Avoid precaching the very large splinetool runtime chunk (loaded dynamically)
        globIgnores: ["**/assets/@splinetool-*.*"],
        // Increase default 2 MiB limit so larger assets can be precached on build
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MiB
      },
      manifest: {
        name: "EonSyntax Portfolio",
        short_name: "Portfolio",
        description: "My RPort-10-2025 PWA",
        theme_color: "hsl(250, 65%, 65%)",
        background_color: "#ffffff",
        display: "standalone",
        display_override: ["standalone", "fullscreen", "minimal-ui"],
        start_url: "/",
        orientation: "portrait",
        scope: "/",
        lang: "en",
        dir: "ltr",
        categories: ["portfolio", "developer", "software", "webapp"],
        icons: [
          {
            src: "/logo192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  build: {
    // Raise warning limit and split node_modules into separate vendor chunks
    chunkSizeWarningLimit: 3000, // in KB (3 MiB)
    rollupOptions: {
      output: {
        // Basic automatic vendor chunking: each top-level package in node_modules becomes a chunk
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Ensure React and React DOM are bundled together in a stable 'react' chunk
            if (
              id.includes("node_modules/react-dom") ||
              id.includes("node_modules/react/")
            ) {
              return "react";
            }
            // Ensure the Spline runtime is isolated into a single 'splinetool' chunk
            if (id.includes("node_modules/@splinetool")) {
              return "splinetool";
            }
            // Fallback: group by top-level package name
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
