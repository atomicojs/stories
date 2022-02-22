import { Props, c, css, useProp, useHost, Meta, DOMEvent } from "atomico";

import customElements from "../custom-elements";
import tokens from "../tokens";

function header(): Meta<DOMEvent<"Toggle">> {
  const [, setToggle] = useProp<boolean>("toggle");

  return (
    <host shadowDom>
      <div class="header-row">
        <slot name="brand"></slot>
        <button
          class="header-toggle"
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
      width: 100%;
      display: block;
      padding: 30px 0px;
      --scale-aside: 0;
      --transition-ms: 0.5s;
      --transition-delay: var(--transition-ms);
      --transform: translateX(150%);
      --transition: var(--transition-ms) ease all;
    }
    .header-row {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
    }
    .header-toggle {
      width: 40px;
      height: 40px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  `,
];

export const Header = c(header);

customElements.define("header", Header);
