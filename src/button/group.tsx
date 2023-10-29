import { useSlot } from "@atomico/hooks/use-slot";
import { Props, c, css, useEffect, useRef } from "atomico";
import { tokensButton } from "../tokens";

function buttonGroup({ appearance }: Props<typeof buttonGroup>) {
  const ref = useRef();
  const elements = useSlot<HTMLElement>(
    ref,
    (element) => element instanceof HTMLElement
  );
  useEffect(() => {
    if (!appearance) return;
    elements.forEach((elements) =>
      elements.setAttribute("appearance", appearance)
    );
  }, [appearance, ...elements]);

  return (
    <host shadowDom>
      <slot ref={ref} />
    </host>
  );
}

buttonGroup.props = {
  appearance: { type: String, reflect: true },
};

buttonGroup.styles = [
  tokensButton,
  css`
    :host {
      border-radius: 14px;
      background: var(--group-color);
      border: var(--group-border);
      display: inline-flex;
    }
    :host([appearance="tab"]) {
      min-height: 100%;
    }
  `,
];

export const ButtonGroup = c(buttonGroup);
