import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Maher",
      formats: ["es"],
      fileName: "maher",
    },
  },
  resolve: {
    alias: {
      components: resolve(__dirname, "src/components"),
      core: resolve(__dirname, "src/core"),
      modules: resolve(__dirname, "src/modules"),
      utils: resolve(__dirname, "src/utils"),
    },
  },
  plugins: [dts()],
});
