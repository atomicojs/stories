import { Props, c, css } from "atomico";
import { usePromise } from "@atomico/hooks/use-promise";
import customElements from "../custom-elements";
import tokens from "../tokens";
import { themeA11yDark } from "./theme";
import { Icon } from "../icon/icon";

function code({ value, type }: Props<typeof code>) {
  const [html = "", state] = usePromise(
    async () => {
      const Prism = await import("https://cdn.skypack.dev/prismjs");
      try {
        // @ts-ignore
        return type ? Prism.highlight(value, Prism.languages[type], type) : "";
      } catch (e) {
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
      padding: 1.5rem 0px;
      background: var(--background-code);
      color: var(--code-color);
    }
    .code {
      width: 100%;
      max-width: var(--content-max-width);
      margin: auto;
    }
  `,
];

export const Code = c(code);

customElements.define("code", Code);
