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

function story({ values, render: propRender }: Props<typeof story.props>) {
  const host = useHost();
  const ref = useRef();
  const [showCode, setShowCode] = useProp<boolean>("showCode");
  const children = useSlot(ref).filter((child) => child instanceof Element);

  useMemo(() => {
    if (propRender) {
      const child = propRender(values);
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
      <div class="story-content">
        <slot ref={ref}></slot>
      </div>
      <div class="story-meta">
        <div class="story-buttons">
          <Button onclick={() => setShowCode(!showCode)} theme="square">
            <Icon type="code"></Icon>
          </Button>
        </div>
      </div>
      {showCode && (
        <Code
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
      --_space-y: calc(var(--space-y) / 2);
    }

    :host(:not([full-width])) .story-content {
      padding: var(--space-y) 0 0;
      max-width: var(--content-max-width);
      margin: auto;
    }

    .story-meta {
      max-width: var(--content-max-width);
      margin: auto;
      padding: var(--_space-y) 0;
      position: relative;
    }
    .story-buttons {
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translateY(50%);
    }
    .story-code {
      border-top: var(--divide-border-width) solid var(--divide-border-color);
    }
  `,
];

export const Story = c(story);

customElements.define("story", Story);
