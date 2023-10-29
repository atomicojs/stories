import { c, css, useRef } from "atomico";
export { ButtonGroup } from "./group";
import { tokensButton } from "../tokens";

function button() {
  const refSlot = useRef();
  return (
    <host shadowDom>
      <button class="button">
        <slot />
      </button>
    </host>
  );
}

button.props = {
  checked: { type: Boolean, reflect: true },
  small: { type: Boolean, reflect: true },
  copy: { type: Boolean, reflect: true },
  icon: { type: Boolean, reflect: true },
  appearance: { type: String, reflect: true },
};

button.styles = [
  tokensButton,
  css`
    :host {
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
      background: var(--color-container);
      align-items: center;
      justify-content: center;
      transition: 0.15s ease all;
    }
    :host([checked]) .button {
      transition: 0.5s ease all;
      ---border-color: var(--color-text);
    }
    :host([appearance="tab"]) .button {
      border-bottom: 2px solid var(---border-color);
      border-radius: 0;
      min-height: 100%;
    }
  `,
];

export const Button = c(button);
