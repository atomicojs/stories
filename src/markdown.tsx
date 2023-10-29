import { c, css } from "atomico";
import readme from "./README.md";

function markdown() {
  return (
    <host shadowDom>
      <main>{readme}</main>
    </host>
  );
}

markdown.styles = css`
  :host {
    display: block;
    font-size: 18px;
    line-height: 1.8;
  }
  main {
    max-width: 920px;
    margin: auto;
  }
`;

customElements.define("my-markdown", c(markdown));
