import { css } from "atomico";
import { cssProps } from "./system";

export const tokensArticle = css`
  :host {
    ${cssProps(`
    embed-radius: 0.5rem;
    title-h1: 32px;
    title-h2: 28px;
    title-h3: 22px;
    title-h4: 18px;
    blockquote-border: 2px solid currentColor;
    blockquote-space: 0.25rem 0 0.25rem 1rem;
    color-accent: black;
    color-neutral: rgba(0, 0, 0, 0.75);
    color-link: #005aff;
    `)}
  }
`;

export const tokensInput = css`
  :host {
    ${cssProps(`
      color-active: black;
      color-inactive: rgba(0, 0, 0, 0.5);
      border-size: 1px;
      min-size: 2rem;
      transition: 0.3s ease all;
    `)}
  }
`;

/**
 * @todo separate the tokens
 */
export default css`
  :host {
    ${cssProps(`
     radius: 0.5rem;
     radius-rounded: 100px;

     shadow-embed: 0px 20px 60px -40px rgba(8, 45, 76, 0.1);

     indent: 5%;

     font-size-small: 0.875rem;

     bg-color: #f6f9f9;
     bg-color-embed: #fff;
     bg-color-story: #fff;
     bg-color-code: #0a0024;
     bg-color-action: #dde0e0;

     color: currentColor;
     color-embed: currentColor;
     color-code: white;
     color-action: currentColor;
     color-tab: black;
     color-divide: rgba(0, 0, 0, 0.1);
     color-accent: black;
     color-neutral: rgba(0, 0, 0, 0.75);

     color-input-active: black;
     color-input-inactive: black;

     opacity-tab-unselected: 0.5;

     action-min-size: 2.5rem;
     action-min-space: 1rem;

     input-min-size: 2rem;

     scroll-width: 10px;
     content-max-width: 680px;
     aside-max-width: 260px;

     divide-size: 1px;
     divide: var(--divide-size) solid var(--color-divide);
     tab-style: 2px solid;

     border-tabs: none;

     padding-x: 1rem;

     transition-1: 0.3s ease all;
     `)}
  }

  @media (max-width: 980px) {
    :host {
      --content-max-width: 80%;
    }
  }
`;
