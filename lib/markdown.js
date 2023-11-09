import { jsxs, jsx } from 'atomico/jsx-runtime';
import { css, c } from 'atomico';
import { useCssLightDom } from '@atomico/hooks/use-css-light-dom';
import { Hero } from './hero.js';
import { Button } from './button.js';
import { Author } from './author.js';
import './tokens.js';
import './button/group.js';
import '@atomico/hooks/use-slot';

const cssLightDom = css`:host {
    display: block;
    margin: auto;
  }
  blockquote {
    margin: 0;
    padding-left: 1rem;
    font-style: italic;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0;
    border-radius: 1rem;
  }
  blockquote:before {
    content: "“";
    font-size: 4em;
    display: inline-block;
    font-family: serif;
  }
  p code {
    padding: 0.1em 0.5em;
    border-radius: 100px;
    background: rgba(0, 0, 0, 0.05);
    font-style: normal;
    font-size: 0.9em;
  }
  ol {
    padding-left: 1em;
    display: grid;
    gap: 0.5em;
  }
  ol ol {
    margin: 0.5em 0px;
  }
  ::marker {
    font-weight: bold;
  }
  img {
    max-width: 100%;
    border-radius: 1rem;
  }
  hr {
    border: none;
    border-bottom: 2px dotted rgba(0, 0, 0, 0.2);
  }`;
function markdown({
  module: { default: content, meta }
}) {
  useCssLightDom(cssLightDom);
  return /* @__PURE__ */ jsxs("host", { children: [
    meta && /* @__PURE__ */ jsxs(Hero, { children: [
      meta.version && /* @__PURE__ */ jsx(Button, { small: true, children: meta.version }),
      /* @__PURE__ */ jsx("h1", { children: meta.title }),
      meta.description && /* @__PURE__ */ jsx("p", { children: meta.description }),
      meta.author && /* @__PURE__ */ jsx(Author, { slot: "footer", user: meta.author })
    ] }),
    /* @__PURE__ */ jsx("main", { children: content })
  ] });
}
markdown.props = {
  module: { type: null, value: { default: "", meta: {} } }
};
const Markdown = c(markdown);
customElements.define("stories-markdown", Markdown);

export { Markdown };
