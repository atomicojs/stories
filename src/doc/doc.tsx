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
      <div class="aside aside-left">
        <div className="aside-inner">
          <div class="aside-brand">
            <slot name="brand"></slot>
          </div>
          <Scroll class="aside-scroll">
            <Folder directory={groups}></Folder>
          </Scroll>
          <slot name="footer"></slot>
        </div>
      </div>
      <div class="content">
        <div class="article-inner">
          <slot name="article"></slot>
        </div>
      </div>
      <div class="aside aside-right"></div>
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
        "aside-left content aside-right" auto / 1fr var(--content-max-width)
        1fr;
      grid-gap: 60px;
      overflow: hidden auto;
      background: var(--bg-color);
      align-items: flex-start;
    }

    .aside {
      grid-area: aside-left;
      position: sticky;
      top: 0;
      display: flex;
      justify-content: flex-end;
      font-size: var(--font-size-small);
    }

    .aside-inner {
      width: 100%;
      max-width: var(--aside-max-width);
      padding: 2rem 0px;
      display: grid;
      grid-gap: 2rem;
      justify-content: center;
    }

    .aside-scroll {
      width: 100%;
      height: auto;
    }

    .aside-brand {
      padding: 0px 1rem;
    }

    .aside-left {
      grid-area: aside-left;
    }
    .aside-right {
      grid-area: aside-right;
    }

    .content {
      width: 100%;
      height: 100%;
      grid-area: content;
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
