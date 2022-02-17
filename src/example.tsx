import { render } from "atomico";
import { Doc, ModuloPage } from "./components";
import logo from "./logo.svg";

const modules = Object.values(
  //@ts-ignore
  import.meta.globEager("./documentation/*.tsx")
).reduce(
  (pages: any, md: any) => ({
    ...pages,
    [md.meta.path]: md,
  }),
  {}
) as ModuloPage;

render(
  <host>
    <Doc modules={modules} brand={logo}></Doc>
  </host>,
  document.body
);
