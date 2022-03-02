import { c, css, Props, useEvent } from "atomico";
import { useChannel } from "@atomico/hooks/use-channel";
import customElements from "../custom-elements";
import tokens from "../tokens";
import { Scroll } from "../scroll/scroll";
import { Folder } from "../folder/folder";

function menu({ width }: Props<typeof menu>) {
  const [docMenu] = useChannel("DocMenu");

  return (
    <host shadowDom>
      <div class="menu-content">
        <a class="menu-brand" href="/">
          <slot name="brand"></slot>
        </a>
        <Scroll>
          <div class="menu-mask">
            <Folder directory={docMenu}></Folder>
          </div>
          <style>{`:host{--width: ${width}}`}</style>
        </Scroll>
        <div class="menu-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </host>
  );
}

menu.props = {
  width: String,
};

menu.styles = [
  tokens,
  css`
    :host {
      width: 100%;
      height: 100%;
      display: block;
      position: relative;
      box-sizing: border-box;
    }
    .links {
      width: 100%;
      display: flex;
      flex-flow: column;
    }
    .menu-mask {
      padding: 1rem 0px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
    }
    .menu-content {
      background: var(--bg-color-story);
      border-radius: var(--radius);
      position: relative;
      min-height: 100%;
    }
    .menu-toggle {
      position: absolute;
      top: 50%;
      transform: translate(50%, -50%);
      right: 0px;
    }
    .menu-brand {
      padding: 2rem 0px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,
];

export const Menu = c(menu);

customElements.define("menu", Menu);
