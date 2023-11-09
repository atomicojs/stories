import { useSlot } from "@atomico/hooks/use-slot";
import { Props, c, css, useEffect, useRef } from "atomico";
import { tokensButton } from "../tokens";

function buttonGroup() {
  const ref = useRef();

  const elements = useSlot<HTMLElement>(
    ref,
    (element) => element instanceof HTMLElement
  );

  useEffect(() => {
    elements.forEach((elements) => elements.setAttribute("appearance", "tab"));
  }, elements);

  return (
    <host shadowDom>
      <slot ref={ref} />
    </host>
  );
}

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
