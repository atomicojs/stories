import { Props, c, css } from "atomico";
import { usePromise } from "@atomico/hooks/use-promise";
import customElements from "../custom-elements";
import tokens from "../tokens";
import { themeA11yDark } from "./theme";

const ts = ["typescript", "ts"];
const jsx = ["jsx", "tsx"];

function code({ value, type }: Props<typeof code>) {
  const [html = "", state] = usePromise(
    async () => {
      const cdn = "https://cdn.skypack.dev/prismjs";
      const cndComponent = cdn + "/components/prism-";
      const Prism = await import(cdn);

      ts.includes(type) && (await import(cndComponent + "typescript"));

      jsx.includes(type) && (await import(cndComponent + "jsx"));

      type == "tsx" && (await import(cndComponent + "tsx"));

      type == "json" && (await import(cndComponent + "json"));

      type == "yaml" && (await import(cndComponent + "yaml"));

      // type == "php" && (await import(cndComponent + "php"));

      // type == "sql" && (await import(cndComponent + "sql"));

      // type == "bash" && (await import(cndComponent + "bash"));

      // type == "http" && (await import(cndComponent + "http"));

      // type == "graphql" && (await import(cndComponent + "graphql"));

      try {
        // @ts-ignore
        return type ? Prism.highlight(value, Prism.languages[type], type) : "";
      } catch (e) {
        console.error(e);
        return "";
      }
    },
    !!value,
    [value, type]
  );

  return (
    <host shadowDom>
      <pre class="code">
        {state === "pending" || !html ? (
          <code textContent={value}></code>
        ) : (
          <code innerHTML={html}></code>
        )}
      </pre>
    </host>
  );
}

code.props = {
  type: String,
  value: String,
  fullWidth: {
    type: Boolean,
    reflect: true,
    value: true,
  },
};

code.styles = [
  themeA11yDark,
  tokens,
  css`
    :host {
      display: flex;
      background: var(--bg-color-code);
      color: var(--color-code);
      font-size: var(--font-size-small);
      border-radius: var(--radius);
    }
    .code {
      width: 100%;
      max-width: var(--content-max-width);
      margin: auto;
      overflow: auto;
      padding: 1.5rem var(--indent);
    }
    code,
    pre {
      font-size: unset;
      font-family: unset;
    }
  `,
];

export const Code = c(code);

customElements.define("code", Code);
