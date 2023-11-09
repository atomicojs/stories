import { jsx } from 'atomico/jsx-runtime';
import { useRef, css, c } from 'atomico';
export { ButtonGroup } from './button/group.js';
import { tokensButton } from './tokens.js';
import '@atomico/hooks/use-slot';

function button() {
  const refSlot = useRef();
  return /* @__PURE__ */ jsx("host", { shadowDom: true, children: /* @__PURE__ */ jsx("button", { class: "button", children: /* @__PURE__ */ jsx("slot", {}) }) });
}
button.props = {
  checked: { type: Boolean, reflect: true },
  small: { type: Boolean, reflect: true },
  copy: { type: Boolean, reflect: true },
  icon: { type: Boolean, reflect: true },
  appearance: { type: String, reflect: true },
  solid: { type: String, reflect: true }
};
button.styles = [
  tokensButton,
  css`:host {
      display: inline-block;
      ---border-color: transparent;
    }
    .button {
      display: flex;
      border: none;
      background: transparent;
      min-width: var(--size);
      height: var(--size);
      display: flex;
      align-items: center;
      padding: var(--padding);
      color: var(--color-text);
      font-size: 12px;
      font-weight: 500;
      font-family: unset;
      cursor: pointer;
      border-radius: var(--radius);
      align-items: center;
      justify-content: center;
      transition: 0.15s ease all;
      background: var(--color-container);
    }
    :host([checked]) .button {
      transition: 0.5s ease all;
      ---border-color: var(--color-text);
    }`
];
const Button = c(button);
customElements.define("stories-button", Button);

export { Button };
