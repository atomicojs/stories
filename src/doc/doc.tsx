import { useRouter, redirect } from "@atomico/hooks/use-router";
import { useRender } from "@atomico/hooks/use-render";
import { Props, c, css, useProp, useEffect } from "atomico";
import customElements from "../custom-elements";
import { Header } from "../header/header";
import { Aside } from "../aside/aside";
import { Button } from "../button/button";
import { Icon } from "../icon/icon";
import { Scroll } from "../scroll/scroll";

import tokens from "../tokens";

export interface ModuloPage {
  [path: string]: {
    meta: {
      title: any;
      icon: any;
      path: string;
    };
    default: any;
  };
}

function doc({ modules, brand }: Props<typeof doc.props>) {
  const [showMenu, setShowMenu] = useProp("showMenu");

  const entries = Object.entries(modules);

  const groups = entries.reduce(
    (groups, [path, { meta }]) => {
      const paths = path.split("/").filter((value) => value);
      const last = paths.reduce((group, folder, deep) => {
        group[folder] = group[folder] || { deep };
        return group[folder];
      }, groups);

      last.meta = meta;

      return groups;
    },
    { deep: 0, meta: null }
  );

  const { meta, deep, ...subgrops } = groups;

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
        showMenu={showMenu}
        onShowMenu={({ currentTarget }) => setShowMenu(currentTarget.showMenu)}
      >
        <img src={brand} alt="" slot="brand" />
      </Header>
      <article slot="article">{view}</article>
      <Aside slot="aside" width="var(--aside-max-width)">
        {meta && (
          <Button
            theme="aside"
            slot="link"
            active={meta.path === viewId}
            onclick={(event) => {
              event.preventDefault();
              redirect(meta.path);
            }}
          >
            <span slot="prefix">
              <Icon type="component"></Icon>
            </span>
            <span>{meta.title}</span>
          </Button>
        )}
        {Object.entries(subgrops).map(function g([
          title,
          { meta, deep, ...subgrops },
        ]) {
          return [
            <Button
              theme="aside"
              slot="link"
              active={meta?.path === viewId}
              indent={deep + 1}
              onclick={
                meta?.path
                  ? (event) => {
                      event.preventDefault();
                      redirect(meta?.path);
                    }
                  : null
              }
            >
              <span slot="prefix">
                <Icon type={meta ? "component" : "folder"}></Icon>
              </span>
              <span>{title}</span>
            </Button>,
            Object.entries(subgrops).map(g),
          ];
        })}
      </Aside>
    </host>
  ));

  useEffect(() => {
    document.title = modules[viewId]?.meta?.title;
  }, [modules[viewId]?.meta?.title]);

  return (
    <host shadowDom>
      <Scroll class="doc-main">
        <header class="doc-header">
          <slot name="header"></slot>
        </header>
        <div class="doc-article">
          <slot name="article"></slot>
        </div>
      </Scroll>
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
      height: 100%;
      --col-aside: 0px;
      --transition: 0.75s ease all;
      background: var(--background);
    }

    :host([show-menu]) {
      --col-aside: var(--aside-max-width);
    }

    .doc-main {
      width: 100%;
      flex: 0%;
    }

    .doc-aside {
      width: var(--col-aside);
      transition: var(--transition);
    }

    .doc-header {
      width: 100%;
      max-width: var(--content-max-width);
      margin: auto;
      position: relative;
      z-index: 10;
    }
  `,
];

export const Doc = c(doc);

customElements.define("doc", Doc);
