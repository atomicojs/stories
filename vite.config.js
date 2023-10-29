import { defineConfig } from "vite";
import atomico from "@atomico/vite";
import { createHtml } from "@atomico/vite/plugins/markdown";

export default defineConfig({
  build: {
    target: "esnext",
  },
  optimizeDeps: {
    exclude: "atomico",
  },
  plugins: atomico({
    markdown: {
      inject: `
      import "/src/preview";
      import "/src/code";
      import "/src/code-editor";
      `,
      render: {
        preview(token) {
          if (token.options.includes("only")) {
            return createHtml(token.preview);
          }

          return createHtml(`<stories-code-editor text="${encodeURI(
            token.text
          )}">
            <stories-preview label="Preview" ${token.options.join(" ")} load=${
            token.preview
          }/>
            <stories-code label="Code" type="${token.lang}" value="${encodeURI(
            token.text
          )}"/>
          </stories-code-editor>`);
        },
        code(token) {
          return createHtml(
            `<stories-code type="${token.lang}" value="${encodeURI(
              token.text
            )}"/>`
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
