import { Props, c, useAsync, useEffect, useRef, css } from "atomico";
import hljs from "highlight.js";
import { Scroll } from "../scroll";
import { tokensCard, tokensCode, tokensColor } from "../tokens";

export const options = {
  cdnTheme: `https://unpkg.com/highlight.js@11.9.0/styles/$.css`,
};

async function getCssTheme(theme: string) {
  const url = options.cdnTheme.replace("$", theme);
  const res = await fetch(url);
  return res.text();
}

function code({ type, value, theme }: Props<typeof code>) {
  const ref = useRef();

  const css = useAsync(getCssTheme, [theme]);

  value = decodeURI(value);

  useEffect(() => {
    if (ref.current) hljs.highlightElement(ref.current);
  }, [value]);

  return (
    <host shadowDom>
      <Scroll class="scroll hljs">
        <pre class="code" id="pre">
          <code
            id="code"
            textContent={value}
            ref={ref}
            class={`language-${type}`}
          />
        </pre>
      </Scroll>
      <style>{css}</style>
    </host>
  );
}

code.props = {
  type: String,
  value: String,
  theme: { type: String, value: () => "atom-one-dark.min" },
  role: { type: String, value: "code", reflect: true },
  unstyle: { type: Boolean, reflect: true },
};

code.styles = [
  tokensColor,
  tokensCard,
  tokensCode,
  css`
    :host {
      border: var(--border);
      display: block;
      border-radius: var(--radius);
      font-size: var(--font-size);
      line-height: var(--font-height);
    }
    .scroll {
      padding: var(--padding);
      border-radius: var(--radius);
      box-sizing: border-box;
    }
    code.hljs {
      padding: 0 !important;
      border-radius: 0 !important;
    }
    #pre {
      margin: 0px;
    }
    .hljs {
      background: var(--color-container-contrast) !important;
    }
  `,
];

export const Code = c(code);
