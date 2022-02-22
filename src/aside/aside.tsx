import { c, css, Props } from "atomico";
import customElements from "../custom-elements";
import tokens from "../tokens";
import { Scroll } from "../scroll/scroll";

function aside({ width }: Props<typeof aside>) {
  return (
    <host shadowDom>
      <Scroll>
        <div class="aside-mask">
          <div class="links">
            <slot name="link"></slot>
          </div>
        </div>
        <style>{`:host{--width: ${width}}`}</style>
      </Scroll>
    </host>
  );
}

aside.props = {
  width: String,
};

aside.styles = [
  tokens,
  css`
    :host {
      width: 100%;
      height: 100%;
      display: flex;
      background: var(--background-deep-2);
      overflow: hidden;
      position: relative;
    }
    .links {
      width: 100%;
      display: flex;
      flex-flow: column;
    }
    .aside-mask {
      width: var(--width);
      padding: 5rem 0px;
      box-sizing: border-box;
    }
  `,
];

export const Aside = c(aside);

customElements.define("aside", Aside);
