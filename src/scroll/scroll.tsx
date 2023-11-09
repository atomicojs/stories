import { c, css } from "atomico";
import { tokensScroll } from "../tokens";
import { ScrollableComponentElement } from "scrollable-component";

function scroll() {
  return <host></host>;
}

scroll.styles = [
  tokensScroll,
  css`
    :host {
      width: 100%;
      --scrollbar-width: var(--width);
    }
  `,
];

export const Scroll = c(scroll, ScrollableComponentElement);
