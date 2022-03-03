import {
  Props,
  c,
  h,
  useRef,
  render,
  useMemo,
  css,
  useProp,
  useHost,
} from "atomico";
import { useSlot } from "@atomico/hooks/use-slot";
import customElements from "../custom-elements";
import tokens from "../tokens";
import { Code } from "../code/code";
import { Button } from "../button/button";
import { Icon } from "../icon/icon";
import { serialize } from "atomico/utils";

function story({ values, render: propRender }: Props<typeof story.props>) {
  const host = useHost();
  const ref = useRef();
  const [showCode, setShowCode] = useProp<boolean>("showCode");
  const children = useSlot(ref).filter((child) => child instanceof Element);

  useMemo(() => {
    if (propRender) {
      const child = propRender(values || {});
      render(
        <host>{child instanceof Node ? h(child) : child}</host>,
        host.current
      );
    } else {
      children.forEach((child) => render(<host {...values}></host>, child));
    }
  }, [values, ...children]);

  return (
    <host shadowDom>
      <div class={serialize("story-content", showCode && "hidden")}>
        <slot ref={ref}></slot>
      </div>
      {showCode && (
        <Code
          disableRadiusTop
          class="story-code"
          type="html"
          value={host.current.innerHTML}
        ></Code>
      )}
    </host>
  );
}

story.props = {
  label: String,
  values: Object,
  render: Function,
  showCode: {
    type: Boolean,
    reflect: true,
  },
  fullWidth: {
    type: Boolean,
    reflect: true,
  },
};

story.styles = [
  tokens,
  css`
    :host {
      display: block;
      --_padding-y: calc(var(--padding-y) / 2);
    }

    .story-content {
      min-height: 15vh;
      display: flex;
      align-items: center;
      padding: var(--padding-x);
      box-sizing: border-box;
    }

    .hidden {
      display: none;
    }
  `,
];

export const Story = c(story);

customElements.define("story", Story);
