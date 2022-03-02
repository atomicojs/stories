import { render } from "atomico";
import { Doc, ModuloPage, Folder, Menu } from "../src/components";
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
    <Doc modules={modules}>
      <img src={logo} slot="brand" />
      <a slot="link" href="github">
        Github
      </a>
      <a slot="link" href="github">
        Twitter
      </a>
      <Menu slot="menu">
        <img src={logo} slot="brand" />
      </Menu>
    </Doc>
  </host>,
  document.body
);
