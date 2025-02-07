import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/OnlineShop/', // Replace <REPO_NAME> with the name of your GitHub repository
  plugins: [react()],
});
