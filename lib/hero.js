import { jsx, jsxs } from 'atomico/jsx-runtime';
import { css, c } from 'atomico';
import { tokensHero } from './tokens.js';

function hero() {
  return /* @__PURE__ */ jsx("host", { shadowDom: true, children: /* @__PURE__ */ jsxs("div", { class: "pattern", children: [
    /* @__PURE__ */ jsx("div", { class: "content", children: /* @__PURE__ */ jsx("slot", {}) }),
    /* @__PURE__ */ jsx("footer", { class: "footer", children: /* @__PURE__ */ jsx("slot", { name: "footer" }) })
  ] }) });
}
hero.styles = [
  tokensHero,
  css`:host {
      display: block;
      background: radial-gradient(
        farthest-side at 50% -100%,
        var(--color-gradient),
        transparent
      );
    }
    .pattern {
      display: grid;
      padding: 10% 0 5%;
      background-size: 2rem 2rem;
      background-image: radial-gradient(
        circle,
        var(--color-dot) 1px,
        rgba(0, 0, 0, 0) 1px
      );
      gap: 1rem;
    }
    ::slotted(h1) {
      font-size: clamp(2rem, 10vw, 5rem);
    }
    ::slotted(p) {
      font-size: clamp(1rem, 10vw, 1.5rem);
    }
    ::slotted(*) {
      line-height: 1.2em;
      margin: 0;
    }`
];
const Hero = c(hero);
customElements.define("stories-hero", Hero);

export { Hero };
