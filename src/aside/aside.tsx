import { c, css } from "atomico";
import customElements from "../custom-elements";
import tokens from "../tokens";

function aside() {
  return (
    <host shadowDom>
      <div class="links">
        <slot name="link"></slot>
      </div>
    </host>
  );
}

aside.styles = [
  tokens,
  css`
    :host {
      width: 100%;
      height: 100%;
      display: flex;
      background: var(--background-deep-2);
      padding: 5rem 0px;
      --link-current-border-color: transparent;
      --link-current-font-weight: 500;
      box-sizing: border-box;
      overflow: hidden;
    }
    .links {
      width: 100%;
      display: flex;
      flex-flow: column;
    }
    ::slotted([slot="link"]) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
      padding: 0.5rem 2rem;
      text-decoration: none;
      color: unset;
      border-left: var(--border-width-active) solid
        var(--link-current-border-color);
      font-weight: var(--link-current-font-weight);
      transition: var(--transition-2);
    }
    ::slotted([slot="link"].active) {
      --link-current-border-color: var(--border-color-active);
    }
  `,
];

export const Aside = c(aside);

customElements.define("aside", Aside);
