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

divide.props = { fullWidth: { type: Boolean, reflect: true, value: false } };

divide.styles = [
  tokens,
  css`
    :host {
      display: block;
      width: 100%;
      border-top: var(--border);
      border-bottom: var(--border);
      border-radius: var(--divide-border-radius);
      overflow: hidden;
    }
  `,
];

export const Divide = c(divide);

customElements.define("divide", Divide);
