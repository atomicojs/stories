import { Props, c, css, useProp, useEffect, useHost } from "atomico";
import { useRender } from "@atomico/hooks/use-render";
import { useRouter, useRedirect } from "@atomico/hooks/use-router";
import { useChannel } from "@atomico/hooks/use-channel";
import customElements from "../custom-elements";
import { Scroll } from "../scroll/scroll";
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
  const [hideAside, setHideAside] = useProp("hideAside");

  const entries = Object.entries(modules);

  const host = useHost();

  const [, setDocMenu] = useChannel("DocMenu");

  useEffect(() => {
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
    setDocMenu(groups);
  }, []);

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
      <div
        class="doc-layer"
        onclick={(event) =>
          event.currentTarget === event.target && setHideAside(false)
        }
      ></div>
      <div class="doc-aside">
        <div class="doc-aside-mask">
          <slot name="menu"></slot>
          <Button
            class="doc-aside-toggle"
            onclick={() => setHideAside(!hideAside)}
          >
            <svg width="15.999" height="12" viewBox="0 0 15.999 12">
              <path
                d="M-1659,31a1,1,0,0,1-1-1,1,1,0,0,1,1-1h14a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm0-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h14a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm0-5a1,1,0,0,1-1-1,1,1,0,0,1,1-1h14a1,1,0,0,1,1,1,1,1,0,0,1-1,1Z"
                transform="translate(1660 -19)"
              />
            </svg>
          </Button>
        </div>
      </div>
      <Scroll class="doc-main">
        <slot name="header"></slot>
        <div class="doc-article">
          <slot name="article"></slot>
        </div>
      </Scroll>
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
      display: flex;
      height: 100%;
      --aside-width: var(--aside-max-width);
      --aside-position: relative;
      --aside-transform: none;
      background: var(--bg-color);
      overflow: hidden;
      position: relative;
    }

    .doc-main {
      width: 100%;
      flex: 0%;
    }

    .doc-aside {
      width: var(--aside-width);
      height: 100%;
      z-index: 2;
      position: var(--aside-position);
      transform: var(--aside-transform);
      transition: var(--transition);
      padding: 10px;
      box-sizing: border-box;
    }

    .doc-aside-mask {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .doc-aside-toggle {
      position: absolute;
      bottom: 0px;
      left: calc(100% + 10px);
      z-index: 2;
    }

    .doc-layer {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 2;
      background: linear-gradient(47deg, #f5747491, #29fff938);
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      transition: top 0s 0.5s, opacity 0.5s ease;
      opacity: 0;
      top: 100%;
    }

    ::slotted([slot="link"]) {
      display: flex;
      color: unset;
      text-decoration: none;
      padding: 0.5rem 1rem;
      font-weight: 600;
    }

    :host([hide-aside]) .doc-layer {
      opacity: 1;
      top: 0;
      transition: top 0s, opacity 0.5s ease;
    }

    :host([transitions]) {
      --transition: 0.75s ease all;
    }

    @media (max-width: 680px) {
      :host {
        --aside-position: absolute;
        --aside-transform: translateX(calc(-100% + 10px));
      }
      :host([hide-aside]) {
        --aside-transform: translateX(0%);
      }
    }
  `,
];

export const Doc = c(doc);

customElements.define("doc", Doc);
