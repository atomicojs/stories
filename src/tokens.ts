import { css } from "atomico";

export const tokensArticle = css`
  :host {
    --embed-radius: 0.5rem;
    --title-h1: clamp(2.2rem, 3.4vw, 2.8rem);
    --title-h2: clamp(1.8rem, 3vw, 2.4rem);
    --title-h3: clamp(1.4rem, 2.8vw, 2.2rem);
    --title-h4: clamp(1rem, 2.4vw, 1.8rem);
    --blockquote-border: 2px solid currentColor;
    --blockquote-space: 0.25rem 0 0.25rem 1rem;
  }
`;

export default css`
  :host {
    --radius: 0.5rem;
    --radius-rounded: 100px;

    --indent: 5%;

    --font-size-small: 0.875rem;

    --bg-color: #eaf5f5;
    --bg-color-story: #fff;
    --bg-color-code: #0a0024;
    --bg-color-action: #dde0e0;

    --color: currentColor;
    --color-story: currentColor;
    --color-code: white;
    --color-action: currentColor;

    --opacity-tab-unselected: 0.5;

    --action-min-size: 2.5rem;
    --action-min-space: 1rem;

    --scroll-width: 10px;
    --content-max-width: 680px;
    --aside-max-width: 280px;

    --padding-y: 2rem;
  }

  @media (max-width: 980px) {
    :host {
      --content-max-width: 80%;
    }
  }
`;
