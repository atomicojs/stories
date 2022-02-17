import { Props, c, css } from "atomico";
import { useRender } from "@atomico/hooks/use-render";
import customElements from "../../custom-elements";
import tokens from "../../tokens";

function article({ title }: Props<typeof article.props>) {
  useRender(() => title && <h1 slot="title">{title}</h1>, [title]);
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

article.styles = [
  tokens,
  css`
    :host {
      display: grid;
      margin: auto;
      grid-gap: 20px;
      padding: 50px 0px;
    }
    ::slotted(*:not([full-width])) {
      margin: 0px;
      width: 100%;
      box-sizing: border-box;
      max-width: var(--max-content);
      margin: auto;
    }
    ::slotted(p) {
      font-size: 14px;
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
