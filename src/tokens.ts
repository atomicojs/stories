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
    --aside-phone-box-shadow: -100px 0px 100px rgba(13, 42, 62, 0.1);
    --scroll-width: 10px;
  }
  @media (max-width: 980px) {
    :host {
      --content-max-width: 80%;
    }
  }
`;
