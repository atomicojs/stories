import { Props, c, useAsync, useEffect, useRef, css } from "atomico";
import hljs from "highlight.js";
import { Scroll } from "../scroll/scroll";
import { tokensCard, tokensCode } from "../tokens";

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
      <Scroll>
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
      <style>{`
        #code{padding:var(--padding); border-radius: var(--radius);}
        #pre{margin: 0px}
      `}</style>
    </host>
  );
}

code.props = {
  type: String,
  value: String,
  theme: { type: String, value: () => "atom-one-dark.min" },
  role: { type: String, value: "code", reflect: true },
};

code.styles = [
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
  `,
];

export const Code = c(code);
