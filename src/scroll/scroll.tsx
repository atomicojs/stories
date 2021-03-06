import { c, css } from "atomico";
import customElements from "../system";
import tokens from "../tokens";
import { ScrollableComponentElement } from "scrollable-component";

function scroll() {
  return <host></host>;
}

scroll.styles = [
  tokens,
  css`
    :host {
      width: 100%;
      --scrollbar-width: var(--scroll-width);
    }
  `,
];

export const Scroll = c(scroll, ScrollableComponentElement);

customElements.define("scroll", Scroll);
