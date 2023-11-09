import { jsxs, jsx } from 'atomico/jsx-runtime';
import { useProxySlot } from '@atomico/hooks/use-slot';
import { useProp, useRef, css, c } from 'atomico';
import { Button } from './button.js';
import { tokensColor, tokensCard, tokensEditor } from './tokens.js';
import { copy } from '@atomico/hooks/use-copy';
import { ButtonGroup } from './button/group.js';

function editor({ text }) {
  const [tab, setTab] = useProp("tab");
  const ref = useRef();
  const slots = useProxySlot(
    ref,
    (node) => node instanceof HTMLElement
  );
  return /* @__PURE__ */ jsxs("host", { shadowDom: true, children: [
    /* @__PURE__ */ jsx("slot", { ref }),
    /* @__PURE__ */ jsxs("div", { class: "header", children: [
      /* @__PURE__ */ jsx(ButtonGroup, { children: slots.map((element, i) => {
        const label = element.getAttribute("label");
        const value = element.getAttribute("value") || label;
        const checked = tab ? value === tab : !i;
        return /* @__PURE__ */ jsx(
          Button,
          {
            checked,
            class: "button",
            onclick: () => setTab(value),
            small: true,
            children: label || value
          }
        );
      }) }),
      text && /* @__PURE__ */ jsx(
        Button,
        {
          icon: true,
          active: true,
          small: true,
          staticNode: true,
          onclick: () => copy(decodeURI(text)),
          class: "buttons",
          children: /* @__PURE__ */ jsxs(
            "svg",
            {
              width: "11",
              height: "11",
              viewBox: "0 0 11 11",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M0 3C0 2.44772 0.447715 2 1 2H8C8.55229 2 9 2.44772 9 3V10C9 10.5523 8.55229 11 8 11H1C0.447715 11 0 10.5523 0 10V3Z",
                    fill: "currentColor"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "rect",
                  {
                    opacity: "0.5",
                    x: "2",
                    width: "9",
                    height: "9",
                    rx: "1",
                    fill: "currentColor"
                  }
                )
              ]
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { class: "view", children: slots.map((element, i) => {
      const label = element.getAttribute("label");
      const value = element.getAttribute("value") || label;
      const isShow = tab ? tab === value : !i;
      return /* @__PURE__ */ jsx("div", { class: `tab ${isShow ? "show" : "hide"}`, children: /* @__PURE__ */ jsx("slot", { name: element.slot = `tab-${i}` }) });
    }) })
  ] });
}
editor.props = {
  tab: String,
  text: String,
  role: { type: String, value: "editor", reflect: true }
};
editor.styles = [
  tokensColor,
  tokensCard,
  tokensEditor,
  css`:host {
      display: block;
      max-width: 100%;
      border-radius: var(--radius);
      border: var(--border);
      box-sizing: border-box;
      background: var(--color-background);
    }
    .header {
      display: grid;
      grid-template-columns: auto auto;
      justify-content: space-between;
      align-items: center;
      padding: var(--padding);
      box-sizing: border-box;
      border-bottom: var(--border);
    }
    .view {
      border-radius: 0 0 var(--radius) var(--radius);
      background: var(--background);
    }
    .hide {
      display: none;
    }`
];
const Editor = c(editor);
customElements.define("stories-editor", Editor);

export { Editor };
