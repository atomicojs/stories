import { Props, c, css, useProp, useEffect, useHost } from "atomico";
import { useRender } from "@atomico/hooks/use-render";
import { useRouter, useRedirect } from "@atomico/hooks/use-router";
import { useChannel } from "@atomico/hooks/use-channel";
import customElements from "../custom-elements";
import { Scroll } from "../scroll/scroll";
import { Folder } from "../folder/folder";

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

function doc({ modules }: Props<typeof doc.props>) {
  const [hideAside, setHideAside] = useProp("hideAside");

  const entries = Object.entries(modules);

  const host = useHost();

  const [, setDocMenu] = useChannel("DocMenu");

  const groups = entries.reduce((groups, [path, { meta }]) => {
    const paths = path.split("/").filter((value) => value);
    const last = paths.reduce((group, title) => {
      group.items = group.items || {};
      group.items[title] = group.items[title] || { title, items: {} };
      return group.items[title];
    }, groups);

    Object.assign(last, meta);

    last.path =
      "/" +
      paths
        .map((path) =>
          path
            .trim()
            .toLowerCase()
            .replace(/([^\w/])/g, "-")
        )
        .join("/");

    return groups;
  }, {});

  const [view, viewId] = useRouter(
    entries.reduce(
      (router, [path, meta]) => ({
        ...router,
        [path]: () => meta.default,
      }),
      {}
    )
  );

  useRedirect(host);

  useRender(() => (
    <host>
      <article slot="article">{view}</article>
    </host>
  ));

  useEffect(() => {
    document.title = modules[viewId]?.meta?.title;
  }, [modules[viewId]?.meta?.title]);

  return (
    <host shadowDom>
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="aside">
        <Scroll class="aside-scroll">
          <Folder directory={groups}></Folder>
        </Scroll>
      </div>
      <div class="content">
        <Scroll class="content-scroll">
          <div class="article-inner">
            <slot name="article"></slot>
          </div>
        </Scroll>
      </div>
    </host>
  );
}

doc.props = {
  modules: {
    type: Object,
    value: (): ModuloPage => ({}),
  },
  hideAside: {
    type: Boolean,
    reflect: true,
  },
  sizeToCollapseAside: {
    type: String,
    value: "(max-width: 520px)",
  },
  transitions: {
    type: Boolean,
    reflect: true,
    value: true,
  },
};

doc.styles = [
  tokens,
  css`
    :host {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template:
        "header header" 60px
        "aside content" auto / var(--aside-max-width) 1fr;
      overflow: hidden;
      background: var(--bg-color);
    }

    .header {
      grid-area: header;
    }

    .aside {
      grid-area: aside;
      border-right: var(--divide);
      padding: 1rem 0px;
      box-sizing: border-box;
    }

    .aside-scroll {
      width: 100%;
      height: 100%;
    }

    .content {
      width: 100%;
      height: 100%;
      grid-area: content;
      overflow: hidden;
    }

    .content-scroll {
      width: 100%;
      height: 100%;
    }

    :host([transitions]) {
      --transition: 0.75s ease all;
    }

    @media (max-width: 680px) {
      :host {
        grid-template:
          "header" 60px
          "content" auto / 1fr;
      }
    }
  `,
];

export const Doc = c(doc);

customElements.define("doc", Doc);
