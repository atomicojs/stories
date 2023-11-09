import { Markdown } from "./markdown.js";
import * as readme from "./README.md";

const modules = import.meta.glob("./**/*.md", {
  query: { meta: true },
  eager: true,
});

export default (
  <host>
    <Markdown style="max-width: 980px" module={readme}></Markdown>
  </host>
);
