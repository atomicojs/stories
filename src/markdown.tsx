import { c, css } from "atomico";
import type { Props } from "atomico";
import { useCssLightDom } from "@atomico/hooks/use-css-light-dom";
import { Hero } from "./hero";
import { Button } from "./button";
import { Author } from "./author";

const cssLightDom = css`
  :host {
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
  }
`;

interface Module {
  meta: { [prop: string]: any };
  default: any;
}

function markdown({
  module: { default: content, meta },
}: Props<typeof markdown>) {
  useCssLightDom(cssLightDom);
  return (
    <host>
      {meta.title && (
        <Hero>
          {meta.version && <Button small>{meta.version}</Button>}
          <h1>{meta.title}</h1>
          {meta.description && <p>{meta.description}</p>}
          {meta.author && <Author slot="footer" user={meta.author} />}
        </Hero>
      )}
      <main>{content}</main>
    </host>
  );
}

markdown.props = {
  module: { type: null, value: { default: "", meta: {} } as Module },
};

export const Markdown = c(markdown);
