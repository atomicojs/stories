import { Props, c, css } from "atomico";
import { useRender } from "@atomico/hooks/use-render";
import { useCssLightDom } from "@atomico/hooks/use-css-light-dom";
import customElements from "../custom-elements";
import tokens, { tokensArticle } from "../tokens";

function article({ title }: Props<typeof article.props>) {
  useRender(() => title && <h1 slot="title">{title}</h1>, [title]);
  useCssLightDom(cssLightDom);

  return (
    <host shadowDom>
      <header>
        <slot name="title"></slot>
      </header>
      <slot></slot>
    </host>
  );
}

article.props = {
  title: String,
  path: {
    type: String,
    reflect: true,
  },
};

const cssLightDom = css`
  :host {
    color: var(--color-neutral);
    line-height: 2rem;
  }
  img,
  video,
  iframe {
    max-width: 100%;
    border-radius: var(--embed-radius);
  }
  h1 {
    font-size: var(--title-h1);
  }
  h2 {
    font-size: var(--title-h2);
  }
  h3 {
    font-size: var(--title-h3);
  }
  h4 {
    font-size: var(--title-h4);
  }
  h5 {
    font-size: var(--title-h5);
  }
  h6 {
    font-size: var(--title-h6);
  }
  blockquote {
    border-left: var(--blockquote-border);
    padding: var(--blockquote-space);
    margin: 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  blockquote,
  strong,
  code {
    color: var(--color-accent);
  }
`;

article.styles = [
  tokens,
  tokensArticle,
  css`
    :host {
      display: grid;
      margin: auto;
      grid-gap: 20px;
      padding: 50px 0px;
    }
    ::slotted(*) {
      max-width: 100%;
    }
    ::slotted(p) {
      line-height: 2em;
    }
    ::slotted([columns]) {
      columns: 2 280px;
      column-gap: 40px;
    }
  `,
];

export const Article = c(article);

customElements.define("article", Article);
