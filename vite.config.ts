import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	plugins: [react()],
	server: {
		host: "localhost",
		port: 8080,
		proxy: {
			"/api": "https://driver.marsview.com.cn",
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});
