import { Props, c, css, useProp, useEffect, useHost } from "atomico";
import { useRender } from "@atomico/hooks/use-render";
import { useRouter, useRedirect } from "@atomico/hooks/use-router";
import customElements from "../custom-elements";
import { Scroll } from "../scroll/scroll";
import { useMediaQuery } from "@atomico/hooks/use-media-query";

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

  const matchMedia = useMediaQuery("(max-width: 520px)");

  const host = useHost();

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

  useRedirect(host);

  useRender(() => (
    <host>
      <article
        slot="article"
        onclick={matchMedia ? () => setHideAside(false) : null}
      >
        {view}
      </article>
    </host>
  ));

  useEffect(() => {
    document.title = modules[viewId]?.meta?.title;
  }, [modules[viewId]?.meta?.title]);

  return (
    <host shadowDom>
      <slot name="menu"></slot>
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
};

doc.styles = [
  tokens,
  css`
    :host {
      width: 100%;
      display: flex;
      height: 100%;
      --col-aside: var(--aside-max-width);
      --transition: 0.75s ease all;
      background: var(--bg-color);
      overflow: hidden;
      position: relative;
    }

    :host([hide-aside]) {
      --col-aside: 0px;
    }

    .doc-main {
      width: 100%;
      flex: 0%;
    }

    .doc-aside {
      width: var(--col-aside);
      transition: var(--transition);
      position: relative;
    }

    ::slotted([slot="link"]) {
      display: flex;
      color: unset;
      text-decoration: none;
      padding: 0.5rem 1rem;
      font-weight: 600;
    }

    @media (max-width: 520px) {
      :host {
        --transition-delay: 0.5s;
        --transition: box-shadow 0.75s ease var(--transition-delay),
          transform 0.75s ease 0s;
      }
      .doc-aside {
        width: var(--aside-max-width);
        height: 100%;
        right: 0;
        top: 0;
        position: absolute;
        left: 100%;
        transform: translateX(var(--translate-aside));
        box-shadow: var(--aside-shadow, 0px 0px 0px transparent);
      }
      :host([hide-aside]) {
        --translate-aside: -100%;
        --aside-shadow: var(--aside-phone-box-shadow);
      }
    }
  `,
];

export const Doc = c(doc);

customElements.define("doc", Doc);
