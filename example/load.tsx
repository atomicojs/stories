import { render } from "atomico";
import { Doc, ModuloPage } from "../src/components";
import logo from "./logo.svg";

const modules = Object.values(
  //@ts-ignore
  import.meta.globEager("./docs/**/*.tsx")
).reduce(
  (pages: any, md: any) => ({
    ...pages,
    [md.meta.path]: md,
  }),
  {}
) as ModuloPage;

render(
  <host>
    <Doc modules={modules} brand={logo} showMenu></Doc>
  </host>,
  document.body
);
