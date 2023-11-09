import { Markdown } from "./markdown.js";
import * as readme from "./README.md";

export default (
  <host>
    <Markdown style="max-width: 980px" module={readme}></Markdown>
  </host>
);
