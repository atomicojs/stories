import { jsx } from 'atomico/jsx-runtime';
import { css, c } from 'atomico';
import { tokensScroll } from './tokens.js';
import { ScrollableComponentElement } from 'scrollable-component';

function scroll() {
  return /* @__PURE__ */ jsx("host", {});
}
scroll.styles = [
  tokensScroll,
  css`:host {
      width: 100%;
      --scrollbar-width: var(--width);
    }`
];
const Scroll = c(scroll, ScrollableComponentElement);
customElements.define("stories-scroll", Scroll);

export { Scroll };
