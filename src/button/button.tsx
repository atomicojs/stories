import { useSlot } from "@atomico/hooks/use-slot";
import { Props, c, css, useRef } from "atomico";
import { serialize } from "atomico/utils";
import customElements from "../custom-elements";
import tokens from "../tokens";

function button({ indent }: Props<typeof button>) {
  const refSlot = useRef();
  const refSlotPrefix = useRef();
  const slot = useSlot(refSlot);
  const slotPrefix = useSlot(refSlotPrefix);
  return (
    <host shadowDom>
      <button class="button-center button">
        <div class={serialize("button-prefix", !slotPrefix.length && "hidden")}>
          <slot name="prefix" ref={refSlotPrefix}></slot>
        </div>
        <div
          class={serialize(
            "button-center button-label",
            !slot.length && "hidden"
          )}
        >
          <slot ref={refSlot}></slot>
        </div>
      </button>
      <style>
        {":host{"}
        --columns: {!!slotPrefix.length && "var(--prefix-width)"}
        {!!slot.length && "auto"}; --indent: {indent || 1};{"}"}
      </style>
    </host>
  );
}

button.props = {
  theme: { type: String, reflect: true },
  active: { type: Boolean, reflect: true },
  indent: { type: Number },
};

button.styles = [
  tokens,
  css`
    :host {
      min-height: var(--active-min-height);
      --prefix-width: auto;
      --justify-content: center;
      --font-size: 14px;
      --gap: 1rem;
      --padding: 0;
      --opacity: 1;
      display: block;
    }
    .button {
      width: 100%;
      height: 100%;
      background: transparent;
      border: none;
      display: grid;
      align-items: center;
      justify-content: var(--justify-content);
      padding: var(--padding);
      font-size: var(--font-size);
      grid-template-columns: var(--columns);
      grid-gap: var(--gap);
      cursor: pointer;
      box-sizing: border-box;
      opacity: var(--opacity);
      font-family: unset;
    }
    .button-prefix {
      line-height: 0;
    }
    .hidden {
      display: none;
    }
    :host([theme="square"]) {
      width: var(--active-min-height);
      height: var(--active-min-height);
      border: var(--divide-border-width) solid var(--divide-border-color);
      background: var(--background-deep-1);
      cursor: pointer;
    }
    :host([theme="aside"]) {
      --justify-content: flex-start;
      --padding: 0.5rem 1rem 0.5rem calc(1rem * var(--indent));
      --opacity: 0.6;
    }
    :host([theme="aside"][active]) {
      --opacity: 1;
      background: var(--background);
    }
  `,
];

export const Button = c(button);

customElements.define("button", Button);
