import { Props, c, css } from "atomico";
import { useRender } from "@atomico/hooks/use-render";
import { style } from "./toggle";
import { useCssLightDom } from "@atomico/hooks/use-css-light-dom";
import customElements from "../custom-elements";

const styleRadio = [
  style,
  css`
    :host {
      --opacity: 0;
    }
    input {
      --state: 0 !important;
      width: 1rem;
    }
  `,
];

function radio({ label, ...props }: Props<typeof radio>) {
  useRender(() => (
    <label>
      <input type="radio" {...props} />
      {label}
    </label>
  ));
  useCssLightDom(styleRadio);
  return <host></host>;
}

radio.props = {
  label: String,
  checked: Boolean,
  name: String,
  value: String,
  reverse: {
    type: Boolean,
    reflect: true,
  },
};

export const Radio = c(radio);

customElements.define("radio", Radio);
