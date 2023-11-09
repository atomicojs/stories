import { jsx } from 'atomico/jsx-runtime';
import { useRender } from '@atomico/hooks/use-render';
import { useRef, useAsync, useEffect, css, c } from 'atomico';
import { tokensCard } from './tokens.js';

const preloadAtomico = async (children) => (await import('atomico')).h("host", { children });
const loadAsync = async (sandbox, load) => {
  if (sandbox)
    return void 0;
  return load();
};
function preview({ load, sandbox }) {
  const ref = useRef();
  const module = useAsync(loadAsync, [sandbox, load]);
  useRender(() => {
    return sandbox ? /* @__PURE__ */ jsx("iframe", { ref, style: "border: none; width: 100%;" }) : module.default;
  }, [module, load]);
  useEffect(() => {
    if (!load || !sandbox)
      return;
    const script = document.createElement("script");
    script.type = "module";
    script.id = "load";
    script.textContent = `
      (await (${preloadAtomico.toString()})(
        (await (${load.toString()})()).default
      )).render(document.body);
      load.remove();
      const resize = new ResizeObserver(([entry])=>{
        window.dispatchEvent(new CustomEvent("ResizeObserver",{detail:entry.contentRect}))
      });
      resize.observe(document.body);
    `;
    const style = document.createElement("style");
    style.textContent = `
        body{
          margin: 0px;
          height: auto;
        }
    `;
    ref.current.contentDocument.body.append(script);
    ref.current.contentDocument.head.append(style);
    ref.current.contentWindow.addEventListener(
      "ResizeObserver",
      ({ detail }) => {
        ref.current.style.height = `${detail.height}px`;
      }
    );
  }, [load, sandbox]);
  return /* @__PURE__ */ jsx("host", { shadowDom: true, children: /* @__PURE__ */ jsx("slot", {}) });
}
preview.props = {
  load: Function,
  sandbox: { type: Boolean, reflect: true },
  focus: { type: Boolean, reflect: true },
  role: { type: String, value: "preview", reflect: true }
};
preview.styles = [
  tokensCard,
  css`:host {
      --background: var(--stories--color-primary);
    }
    :host {
      display: flex;
      resize: horizontal;
      overflow-x: auto;
      max-width: 100%;
      min-width: 280px;
      box-sizing: border-box;
      padding: var(---padding);
      border-radius: var(--radius);
      background: var(--background);
    }
    :host([focus]) {
      align-items: center;
      justify-content: center;
      padding: 5%;
    }`
];
const Preview = c(preview);
customElements.define("stories-preview", Preview);

export { Preview };
