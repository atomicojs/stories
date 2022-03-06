import { Props, DOMEvent, Meta, c, css } from "atomico";
import { useRender } from "@atomico/hooks/use-render";
import { tokensInput } from "../tokens";
import customElements from "../custom-elements";

function input(props: Props<typeof input>): Meta<DOMEvent<"change">> {
  useRender(() => <input {...props} />);
  return (
    <host shadowDom>
      <slot></slot>
    </host>
  );
}

input.props = {
  type: {
    type: String,
    value: "text",
  },
  name: String,
  value: {
    type: String,
    event: {
      type: "change",
      bubbles: true,
    },
  },
  placeholder: String,
};

input.styles = [
  tokensInput,
  css`
    :host {
      width: auto;
      display: flex;
    }
    ::slotted(input) {
      width: 100%;
      height: var(--min-size);
      border: none;
      border-bottom: var(--border-size) solid var(--color-inactive);
      box-sizing: border-box;
      background: none;
      outline: none;
      transition: var(--transition);
      font: unset;
    }
    ::slotted(input:focus) {
      border-color: var(--color-active);
    }
  `,
];

export const Input = c(input);

customElements.define("input", Input);
