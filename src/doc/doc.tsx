import { Props, c, css, useProp, useEffect, useHost } from "atomico";
import { useRender } from "@atomico/hooks/use-render";
import { useRouter, useRedirect } from "@atomico/hooks/use-router";
import { useChannel } from "@atomico/hooks/use-channel";
import customElements from "../custom-elements";
import { Scroll } from "../scroll/scroll";
import { Folder } from "../folder/folder";
import { Button } from "../button/button";

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
  const [, setShowAside] = useProp("showAside");

  const entries = modules ? Object.entries(modules) : [];

  const host = useHost();

  const groups = entries.reduce((groups, [path, { meta }]) => {
    const paths = path.split("/").filter((value) => value);
    //@ts-ignore
    const last = paths.reduce((group: { items?: any }, title) => {
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
    if (!modules[viewId]) return;
    document.title = modules[viewId]?.meta?.title;
  }, [modules[viewId] && modules[viewId]?.meta?.title]);

  return (
    <host shadowDom>
      <div class="aside aside-left" onclick={() => setShowAside(false)}>
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
      <Button
        class="toggle-menu"
        onclick={() => setShowAside((value) => !value)}
      >
        <svg width="16" height="12" viewBox="0 0 16 12">
          <path
            d="M-4597-323a1,1,0,0,1-1-1,1,1,0,0,1,1-1h14a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm0-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h14a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm0-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h14a1,1,0,0,1,1,1,1,1,0,0,1-1,1Z"
            transform="translate(4598 335)"
            fill="white"
          />
        </svg>
      </Button>
    </host>
  );
}

doc.props = {
  modules: {
    type: Object,
    value: (): ModuloPage => ({}),
  },
  showAside: {
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
      box-sizing: border-box;
    }

    .aside {
      grid-area: aside-left;
      position: sticky;
      top: 0;
      display: flex;
      justify-content: flex-end;
      font-size: var(--font-size-small);
      max-height: 100vh;
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

    .toggle-menu {
      position: fixed;
      bottom: 10px;
      right: 10px;
      --bg-color: black;
    }

    :host([transitions]) {
      --transition: 0.75s ease all;
    }

    @media (max-width: 680px) {
      :host {
        grid-template: "content" auto / 100%;
        grid-gap: 0;
      }
      .content {
        padding: 0px 10%;
        box-sizing: border-box;
      }
      .aside-right {
        display: none;
      }
      .aside-left {
        position: fixed;
        top: 0px;
        right: 100%;
        background: rgba(255, 255, 255, 0.9);
        z-index: 100;
        width: 100%;
        display: grid;
        justify-content: flex-start;
        backdrop-filter: blur(10px);
        opacity: 0;
        transform: scale(1.1);
        min-height: 100%;
        max-height: auto;
        transition: right 0s 1s, opacity 1s ease, transform 1s ease;
        overflow: auto;
        padding: 0 10%;
        box-sizing: border-box;
      }
      :host([show-aside]) .aside-left {
        right: 0;
        opacity: 1;
        transform: scale(1);
        transition: right 0s 0s, opacity 0.5s ease, transform 0.5s ease;
      }
    }
  `,
];

export const Doc = c(doc);

customElements.define("doc", Doc);
