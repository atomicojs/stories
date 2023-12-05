import { c, css } from "atomico";
import { Pattern } from "../pattern";
import { tokensColor, tokensHero, tokensLayout } from "../tokens";
function hero() {
  return (
    <host shadowDom>
      <Pattern absolute />
      <div class="center">
        <div class="content">
          <slot />
        </div>
      </div>
      <div class="center">
        <footer class="footer">
          <slot name="footer" />
        </footer>
      </div>
    </host>
  );
}

hero.styles = [
  tokensColor,
  tokensLayout,
  tokensHero,
  css`
    :host {
      background: var(--color-container);
      display: grid;
      gap: calc(var(--space-y) / 2);
      padding-top: var(--space-y);
      position: relative;
    }

    .center {
      width: 100%;
      max-width: var(--max-width);
      margin: 0px auto;
      position: relative;
    }
    ::slotted(*) {
      grid-column: content;
    }
    ::slotted(h1) {
      font-size: clamp(2rem, 5vw, 5rem);
    }
    ::slotted(p) {
      font-size: clamp(1rem, 10vw, 1.5rem);
    }
    ::slotted(*) {
      line-height: 1.2em;
      margin: 0;
    }
    .footer {
      background: var(--color-container-layer);
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 100px;
      transform: translateY(50%);
      border: 1px solid var(--color-primary-frame);
    }
  `,
];

export const Hero = c(hero);
