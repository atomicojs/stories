import { jsxs, jsx } from 'atomico/jsx-runtime';
import { useRef, useAsync, useEffect, css, c } from 'atomico';
import hljs from 'highlight.js';
import { Scroll } from './scroll.js';
import { tokensCard, tokensCode } from './tokens.js';
import 'scrollable-component';

const options = {
  cdnTheme: `https://unpkg.com/highlight.js@11.9.0/styles/$.css`
};
async function getCssTheme(theme) {
  const url = options.cdnTheme.replace("$", theme);
  const res = await fetch(url);
  return res.text();
}
function code({ type, value, theme }) {
  const ref = useRef();
  const css2 = useAsync(getCssTheme, [theme]);
  value = decodeURI(value);
  useEffect(() => {
    if (ref.current)
      hljs.highlightElement(ref.current);
  }, [value]);
  return /* @__PURE__ */ jsxs("host", { shadowDom: true, children: [
    /* @__PURE__ */ jsx(Scroll, { children: /* @__PURE__ */ jsx("pre", { class: "code", id: "pre", children: /* @__PURE__ */ jsx(
      "code",
      {
        id: "code",
        textContent: value,
        ref,
        class: `language-${type}`
      }
    ) }) }),
    /* @__PURE__ */ jsx("style", { children: css2 }),
    /* @__PURE__ */ jsx("style", { children: `
        #code{padding:var(--padding); border-radius: var(--radius);}
        #pre{margin: 0px}
      ` })
  ] });
}
code.props = {
  type: String,
  value: String,
  theme: { type: String, value: () => "atom-one-dark.min" },
  role: { type: String, value: "code", reflect: true }
};
code.styles = [
  tokensCard,
  tokensCode,
  css`:host {
      border: var(--border);
      display: block;
      border-radius: var(--radius);
      font-size: var(--font-size);
      line-height: var(--font-height);
    }`
];
const Code = c(code);
customElements.define("stories-code", Code);

export { Code, options };
