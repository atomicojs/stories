import { css } from "atomico";

export const tokensArticle = css`
  :host {
    --embed-radius: 0.5rem;
    --title-h1: 2.4rem;
    --title-h2: 2rem;
    --title-h3: 1.8rem;
    --title-h4: 1.4rem;
    --title-h5: 1rem;
    --title-h6: 0.8rem;
    --blockquote-border: 2px solid currentColor;
    --blockquote-space: 0.25rem 0 0.25rem 1rem;
  }
`;

export default css`
  :host {
    --divide-border-width: 1px;
    --divide-border-color: #e0e3e2;
    --active-border-width: 2px;
    --active-border-color: #000;
    --transition-1: 0.35s easea all;
    --transition-2: 0.5s easea all;
    --background: #fdfdfd;
    --background-deep-1: #fff;
    --background-deep-2: #f4f4f7;
    --background-code: var(--background-deep-1);
    --code-color: currentColor;
    --content-max-width: 768px;
    --aside-max-width: 220px;
    --space-y: 2rem;
    --active-min-height: 2rem;
    --aside-font-size: 14px;
    --scroll-width: 10px;
  }
`;
