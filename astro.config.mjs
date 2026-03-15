import { defineConfig } from "astro/config";
import { copyMarkdownFiles } from "./src/integrations/copy-markdown";

export default defineConfig({
  site: "https://pravashkarki.com",
  integrations: [copyMarkdownFiles()],
});
