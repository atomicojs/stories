import { c, css, Props, useEvent } from "atomico";
import customElements from "../custom-elements";
import tokens from "../tokens";
import { Scroll } from "../scroll/scroll";
import { Folder } from "../folder/folder";
import { Button } from "../button/button";

function menu({ width }: Props<typeof menu>) {
  const dispatchRedirect = useEvent("Redirect", {
    bubbles: true,
    composed: true,
  });
  return (
    <host shadowDom>
      <div class="menu-content">
        <div class="menu-brand" onclick={() => dispatchRedirect("/")}>
          <slot name="brand"></slot>
        </div>
        <Scroll>
          <div class="menu-mask">
            <Folder
              directory={{
                items: {
                  "/": {
                    label: "welcome",
                  },
                  components: {
                    label: "Components",
                    items: {
                      buttons: { label: "Buttons" },
                      alerts: { label: "alerts" },
                      cards: { label: "cards" },
                    },
                  },
                  socials: {
                    label: "Socials",
                    items: {
                      github: { label: "Github" },
                    },
                  },
                },
              }}
            ></Folder>
          </div>
          <style>{`:host{--width: ${width}}`}</style>
        </Scroll>
        <div class="menu-footer">
          <slot name="footer"></slot>
        </div>
        <div class="menu-toggle">
          <Button style="--bg-color: #75F9C8"></Button>
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
      --width: 220px;
      position: relative;
      display: block;
      padding: 10px;
    }
    .links {
      width: 100%;
      display: flex;
      flex-flow: column;
    }
    .menu-mask {
      width: var(--width);
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
