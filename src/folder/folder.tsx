import { Props, c, css, useEvent } from "atomico";
import customElements from "../custom-elements";
import { IconFolder, IconSlash } from "./icons";

interface Directory {
  label?: string;
  icon?: any;
  href?: string;
  items?: {
    [slug: string]: Directory;
  };
}

function folder({ directory, slug, indent }: Props<typeof folder>) {
  const { label = slug, items, icon, href } = directory;

  return (
    <host shadowDom>
      {label && (
        <a class="folder-row" href={href || slug}>
          <div>
            {icon || items ? (
              <IconFolder cloneNode></IconFolder>
            ) : (
              <IconSlash cloneNode></IconSlash>
            )}
          </div>
          <div>{label}</div>
        </a>
      )}
      {items &&
        Object.entries(items).map(([nextSlug, item]) => (
          <Folder
            indent={indent + 1}
            directory={item}
            slug={(nextSlug == "/" ? "" : (slug || "") + "/") + nextSlug}
          ></Folder>
        ))}
      <style>{`:host{--indent:${indent};}`}</style>
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
};

folder.styles = css`
  .folder-row {
    width: 100%;
    display: grid;
    padding: 0.5em 1em 0.5em calc(1em * var(--indent));
    grid-template-columns: 20px auto;
    grid-gap: 0.625em;
    justify-content: flex-start;
    font: unset;
    border: none;
    background: none;
    text-decoration: none;
    color: unset;
    box-sizing: border-box;
  }
`;

export const Folder = c(folder);

customElements.define("folder", Folder);
