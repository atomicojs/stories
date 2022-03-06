import { Props, c, css, useProp, useRef } from "atomico";
import customElements from "../custom-elements";
import { useRender } from "@atomico/hooks/use-render";
import { useCssLightDom } from "@atomico/hooks/use-css-light-dom";
import { tokensInput } from "../tokens";

export const style = [
  tokensInput,
  css`
    :host {
      --color: var(--color-inactive);
      --opacity: 0.5;
      --flow: row;
    }
    :host([reverse]) {
      --flow: row-reverse;
    }
    label {
      display: flex;
      align-items: center;
      flex-flow: var(--flow);
      gap: 0.5em;
      min-height: var(--min-size);
      cursor: pointer;
    }
    input {
      --state: -1;
      width: var(--input-min-size);
      height: calc(var(--input-min-size) / 2);
      border: 1px solid var(--color);
      appearance: none;
      border-radius: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin: 0;
    }

    input:checked {
      --state: 1;
      --color: var(--color-active);
      --opacity: 1;
    }

    input::after {
      --size: calc(1rem - 8px);
      width: var(--size);
      height: var(--size);
      content: "";
      display: block;
      background: var(--color);
      border-radius: 100%;
      transform: translateX(calc(100% * var(--state)));
      transition: var(--transition);
      opacity: var(--opacity);
    }
  `,
];

interface DOMHandler<E = Event> extends AddEventListenerOptions {
  (event: E): any;
}

function toggle({ label, reverse, ...props }: Props<typeof toggle>) {
  const ref = useRef<HTMLInputElement>();
  const [, setChecked] = useProp<boolean>("checked");
  useRender(() => (
    <label>
      <input type="checkbox" ref={ref} {...props} />
      {label}
    </label>
  ));

  useCssLightDom(style);

  const handler: DOMHandler = () =>
    ref.current && setChecked(ref.current?.checked);

  handler.capture = true;

  return <host onchange={handler}></host>;
}

toggle.props = {
  label: String,
  checked: {
    type: Boolean,
    reflect: true,
  },
  name: String,
  value: String,
  reverse: {
    type: Boolean,
    reflect: true,
  },
};

export const Toggle = c(toggle);

customElements.define("toggle", Toggle);
