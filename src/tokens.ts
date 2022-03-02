import { css } from "atomico";

export const tokensArticle = css`
  :host {
    --embed-radius: 0.5rem;
    --title-h1: 32px;
    --title-h2: 28px;
    --title-h3: 22px;
    --title-h4: 18px;
    --blockquote-border: 2px solid currentColor;
    --blockquote-space: 0.25rem 0 0.25rem 1rem;
  }
`;

export default css`
  :host {
    --radius: 0;
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
    --color-tab: black;

    --opacity-tab-unselected: 0.5;

    --action-min-size: 2.5rem;
    --action-min-space: 1rem;

    --scroll-width: 10px;
    --content-max-width: 768px;
    --aside-max-width: 260px;

    --divide: 1px solid #b9c5cc;
    --tab-style: 2px solid;

    --padding-y: 2rem;
  }

  @media (max-width: 980px) {
    :host {
      --content-max-width: 80%;
    }
  }
`;
