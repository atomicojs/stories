import { defineConfig } from "vite";
import atomico from "@atomico/vite";
import { createHtml } from "@atomico/vite/plugins/markdown";

export default defineConfig({
  build: {
    target: "esnext",
    modulePreload: {
      polyfill: false,
      resolveDependencies(filename, deps, context) {
        console.log({ filename, context, deps });
        return [];
      },
    },
  },
  optimizeDeps: {
    exclude: "atomico",
  },
  plugins: atomico({
    markdown: {
      imports: `
      import { Preview } from  "/src/preview";
      import { Code } from "/src/code";
      import { Editor } from "/src/editor";
      `,
      render: {
        preview(token) {
          if (token.options.includes("only")) {
            return createHtml(token.preview);
          }

          return createHtml(`<Editor text="${encodeURI(token.text)}">
            <Preview label="Preview" ${token.options.join(" ")} load=${
            token.preview
          }/>
            <Code label="Code" type="${token.lang}" value="${encodeURI(
            token.text
          )}"/>
          </Editor>`);
        },
        code(token) {
          return createHtml(
            `<Code type="${token.lang}" value="${encodeURI(token.text)}"/>`
          );
        },
      },
    },
    cssLiterals: {
      postcss: true,
    },
    customElements: {
      prefix: "stories",
      define: ["src/**/*"],
    },
  }),
});
