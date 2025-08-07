import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/

export default defineConfig({
  base: "./", // مهم علشان المسارات ما تبوظش في WordPress
  plugins: [react()],
});
