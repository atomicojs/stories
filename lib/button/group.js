import { jsx } from 'atomico/jsx-runtime';
import { useSlot } from '@atomico/hooks/use-slot';
import { useRef, useEffect, css, c } from 'atomico';
import { tokensButton } from '../tokens.js';

function buttonGroup() {
  const ref = useRef();
  const elements = useSlot(
    ref,
    (element) => element instanceof HTMLElement
  );
  useEffect(() => {
    elements.forEach((elements2) => elements2.setAttribute("appearance", "tab"));
  }, elements);
  return /* @__PURE__ */ jsx("host", { shadowDom: true, children: /* @__PURE__ */ jsx("slot", { ref }) });
}
buttonGroup.styles = [
  tokensButton,
  css`:host {
      border-radius: 14px;
      background: var(--group-color);
      border: var(--group-border);
      display: inline-flex;
    }
    :host([appearance="tab"]) {
      min-height: 100%;
    }`
];
const ButtonGroup = c(buttonGroup);
customElements.define("stories-button-group", ButtonGroup);

export { ButtonGroup };
