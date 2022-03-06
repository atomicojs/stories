import { Props, c, css } from "atomico";
import customElements from "../custom-elements";
import { IconFolder, IconSlash } from "./icons";
import { useRouteMatch } from "@atomico/hooks/use-router";
import tokens from "../tokens";

export interface Directory {
  title?: string;
  icon?: any;
  path?: string;
  items?: {
    [slug: string]: Directory;
  };
}

function folder({ directory, slug, indent = 0 }: Props<typeof folder>) {
  const { title = slug, items, icon, path } = directory || {};

  const match = useRouteMatch();

  const entries = items ? Object.entries(items) : [];

  return (
    <host shadowDom active={path && match(path) ? true : false}>
      {title && (
        <a class="folder-row" href={path}>
          <div>
            {icon ? (
              icon
            ) : entries.length && !path ? (
              <IconFolder cloneNode></IconFolder>
            ) : (
              <IconSlash cloneNode></IconSlash>
            )}
          </div>
          <div>{title}</div>
        </a>
      )}
      <div class="folder-sub">
        {entries.map(([nextSlug, item]) => (
          <Folder
            indent={indent + 1}
            directory={item}
            slug={(nextSlug == "/" ? "" : (slug || "") + "/") + nextSlug}
          ></Folder>
        ))}
      </div>
      <style>{`:host{--folder-indent:${indent};}`}</style>
    </host>
  );
}

folder.props = {
  slug: String,
  indent: {
    type: Number,
    reflect: true,
    value: 0,
  },
  directory: {
    type: Object,
    value: (): Directory => ({}),
  },
  active: {
    type: Boolean,
    reflect: true,
  },
};

folder.styles = [
  tokens,
  css`
    :host {
      --font-weight: 600;
      --opacity: 1;
      color: var(--color-accent);
    }
    :host(:not([active])) {
      --color-tab: transparent;
      --font-weight: 400;
      color: var(--color-neutral);
    }
    .folder-row {
      width: 100%;
      display: grid;
      padding: 0.5em 1em;
      grid-template-columns: 20px auto;
      grid-gap: 0.625em;
      justify-content: flex-start;
      font: unset;
      border: none;
      text-decoration: none;
      color: unset;
      box-sizing: border-box;
      border-radius: var(--radius);
      font-weight: var(--font-weight);
      opacity: var(--opacity);
    }
    .folder-sub {
      padding-left: calc(1em * var(--folder-indent));
    }
  `,
];

export const Folder = c(folder);

customElements.define("folder", Folder);
