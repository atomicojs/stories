import { useSlot } from "@atomico/hooks/use-slot";
import { c, css, useRef } from "atomico";
import { serialize } from "atomico/utils";
import customElements from "../custom-elements";
import tokens from "../tokens";

function button() {
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
      </style>
    </host>
  );
}

button.props = {
  active: { type: Boolean, reflect: true },
  rounded: { type: Boolean, reflect: true },
};

button.styles = [
  tokens,
  css`
    :host {
      --min-size: var(--action-min-size);
      --bg-color: var(--bg-color-action);
      --border: none;
    }
    :host([rounded]) {
      --radius: var(--radius-rounded);
    }
    button {
      min-width: var(--min-size);
      min-height: var(--min-size);
      background: var(--bg-color);
      border-radius: var(--radius);
      border: var(--border);
      font: unset;
      line-height: 1em;
      cursor: pointer;
    }
  `,
];

export const Button = c(button);

customElements.define("button", Button);
