import { useRouter, redirect } from "@atomico/hooks/use-router";
import { useRender } from "@atomico/hooks/use-render";
import { Props, c, css, useProp, useEffect } from "atomico";
import customElements from "../custom-elements";
import { Header } from "../header/header";
import { Aside } from "../aside/aside";
import tokens from "../tokens";

export interface ModuloPage {
  [path: string]: {
    meta: {
      title: any;
      path: string;
    };
    default: any;
  };
}

function doc({ modules, brand }: Props<typeof doc.props>) {
  const [, setShowMenu] = useProp("showMenu");

  const entries = Object.entries(modules);

  const [view, viewId] = useRouter(
    entries.reduce(
      (router, [path, meta]) => ({
        ...router,
        [path]: () => meta.default,
      }),
      {}
    )
  );

  useRender(() => (
    <host>
      <Header
        slot="header"
        onShowMenu={({ currentTarget }) => setShowMenu(currentTarget.showMenu)}
      >
        <img src={brand} alt="" slot="brand" />
      </Header>
      <article slot="article">{view}</article>
      <Aside slot="aside">
        {entries.map(([path, { meta }]) => (
          <a
            slot="link"
            href={path}
            class={path === viewId ? "active" : ""}
            onclick={(event) => {
              event.preventDefault();
              redirect(path);
            }}
          >
            {meta.title}
          </a>
        ))}
      </Aside>
    </host>
  ));

  useEffect(() => {
    document.title = modules[viewId]?.meta?.title;
  }, [modules[viewId]?.meta?.title]);

  return (
    <host shadowDom>
      <main class="doc-main">
        <header class="doc-header">
          <slot name="header"></slot>
        </header>
        <div class="doc-article">
          <slot name="article"></slot>
        </div>
      </main>
      <aside class="doc-aside">
        <slot name="aside"></slot>
      </aside>
    </host>
  );
}

doc.props = {
  modules: {
    type: Object,
    value: (): ModuloPage => ({}),
  },
  brand: String,
  showMenu: {
    type: Boolean,
    reflect: true,
  },
};

doc.styles = [
  tokens,
  css`
    :host {
      display: flex;
      min-height: 100%;
      --col-aside: 0px;
      --transition: 0.75s ease all;
      background: var(--background);
    }

    :host([show-menu]) {
      --col-aside: var(--max-content-aside);
    }

    .doc-main {
      width: 100%;
      flex: 0%;
      transition: var(--transition);
      overflow: hidden auto;
    }

    .doc-aside {
      width: var(--col-aside);
      transition: var(--transition);
    }

    .doc-header {
      width: 100%;
      max-width: var(--max-content);
      margin: auto;
      position: relative;
      z-index: 10;
    }
  `,
];

export const Doc = c(doc);

customElements.define("doc", Doc);
