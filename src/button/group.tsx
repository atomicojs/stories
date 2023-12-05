import { c, css } from "atomico";
import { tokensButtons } from "../tokens";

function buttonGroup() {
  return (
    <host shadowDom>
      <slot />
    </host>
  );
}

buttonGroup.props = {
  theme: { type: String, reflect: true, value: "button-group" },
};

buttonGroup.styles = [
  tokensButtons,
  css`
    :host {
      border-radius: 14px;
      border: var(--group-border);
      display: inline-flex;
    }
    :host([appearance="tab"]) {
      min-height: 100%;
    }
  `,
];

export const ButtonGroup = c(buttonGroup);
