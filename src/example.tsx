import { Markdown } from "./markdown.js";
import * as readme from "./README.md";

export default (
  <host theme="dark">
    <Markdown module={readme}></Markdown>
  </host>
);
