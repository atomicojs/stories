import { Props, c, css, useProp } from "atomico";
export { ButtonGroup } from "./group";
import { tokensButton } from "../tokens";

function button() {
  const [, setAction] = useProp("action");
  return (
    <host shadowDom>
      <button
        class="button"
        onclick={() => {
          setAction((state) => {
            if (!state) setTimeout(setAction, 500, false);
            return true;
          });
        }}
      >
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
  solid: { type: String, reflect: true },
  action: { type: Boolean, reflect: true },
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
      align-items: center;
      justify-content: center;
      transition: 0.15s ease all;
      background: var(--color-container);
      border: 1px solid transparent;
    }

    :host([checked]) .button {
      transition: 0.5s ease all;
      ---border-color: var(--color-text);
    }
  `,
];

export const Button = c(button);
