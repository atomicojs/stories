import { Component, Sheets, c, css, DOMEvent } from "atomico";

const alert: Component<{ name: string }> = (props) => {
  return <host shadowDom>{props.name}</host>;
};

alert.props = {
  name: {
    type: String,
  },
};

alert.styles = css`
  :host {
  }
`;

export const Alert = c(alert);

customElements.define("my-alert", Alert);
