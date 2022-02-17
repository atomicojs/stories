import { Props, c, useRef, render, useEffect } from "atomico";
import { useSlot } from "@atomico/hooks/use-slot";
import customElements from "../../custom-elements";
import { useRender } from "@atomico/hooks/use-render";

function story({ values, render: propRender }: Props<typeof story.props>) {
  const ref = useRef();
  const children = useSlot(ref).filter((child) => child instanceof Element);

  useEffect(
    () =>
      values &&
      children.forEach((child) => render(<host {...values}></host>, child)),
    [values, ...children]
  );
  useRender(
    () => (propRender ? propRender(values) : null),
    [values, propRender]
  );

  return (
    <host shadowDom>
      <slot ref={ref}></slot>
    </host>
  );
}

story.props = {
  label: String,
  show: {
    type: Boolean,
    reflect: true,
    event: {
      type: "StoryChangeShow",
      bubbles: true,
    },
  },
  values: Object,
  render: Function,
};

export const Story = c(story);

customElements.define("story", Story);
