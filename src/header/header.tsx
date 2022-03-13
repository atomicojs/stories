import { c, css, useProp, Meta, DOMEvent } from "atomico";

import customElements from "../system";
import tokens from "../tokens";

function header(): Meta<DOMEvent<"Toggle">> {
  const [, setToggle] = useProp<boolean>("toggle");

  return (
    <host shadowDom>
      <div class="header-row">
        <button
          class="header-action header-action-left"
          onclick={() => setToggle((showMenu) => !showMenu)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path
              d="M-34,246a1,1,0,0,1-1-1,1,1,0,0,1,1-1h14a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm0-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h14a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm0-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h14a1,1,0,0,1,1,1,1,1,0,0,1-1,1Z"
              transform="translate(35 -232)"
              fill="#2c3a41"
            />
          </svg>
        </button>
        <div class="header-brand">
          <slot name="brand"></slot>
        </div>
        <button class="header-action header-action-right">
          <svg width="19.799" height="19.799" viewBox="0 0 19.799 19.799">
            <path
              d="M-11258.5,3a6,6,0,0,1,6-6,6,6,0,0,1,5.916,5h3.083a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-3.083a6,6,0,0,1-5.916,5A6,6,0,0,1-11258.5,3Zm2,0a4,4,0,0,0,4,4,4,4,0,0,0,4-4,4,4,0,0,0-4-4A4,4,0,0,0-11256.5,3Z"
              transform="translate(7967.326 7963.084) rotate(45)"
            />
          </svg>
        </button>
      </div>
    </host>
  );
}

header.props = {
  toggle: {
    type: Boolean,
    reflect: true,
    event: {
      type: "Toggle",
    },
  },
};

header.styles = [
  tokens,
  css`
    :host {
      --height: 60px;
      width: 100%;
      display: flex;
      justify-content: center;
      border-bottom: var(--divide);
    }
    .header-row {
      width: 100%;
      display: grid;
      grid-template: var(--height) / var(--height) auto var(--height);
    }

    .header-brand,
    .header-action {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .header-action {
      width: var(--height);
      background: none;
      border: none;
      padding: none;
      font: unset;
    }
    .header-action-right {
      border-left: var(--divide);
    }
    .header-action-left {
      border-right: var(--divide);
    }
  `,
];

export const Header = c(header);

customElements.define("header", Header);
