import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	server: {
		host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://localhost:9090",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    } 
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
