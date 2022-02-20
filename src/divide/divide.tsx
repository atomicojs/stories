import { c, css } from "atomico";
import customElements from "../custom-elements";
import tokens from "../tokens";

function divide() {
  return (
    <host shadowDom>
      <slot></slot>
    </host>
  );
}

divide.props = { fullWidth: { type: Boolean, reflect: true, value: true } };

divide.styles = [
  tokens,
  css`
    :host {
      display: block;
      width: 100%;
      --border: var(--divide-border-width) solid var(--divide-border-color);
      border-top: var(--border);
      border-bottom: var(--border);
    }
  `,
];

export const Divide = c(divide);

customElements.define("divide", Divide);
