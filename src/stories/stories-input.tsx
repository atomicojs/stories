import { Props, c, css } from "atomico";
import { useRender } from "@atomico/hooks/use-render";
import customElements from "../custom-elements";

function input({ type, name, options }: Props<typeof input.props>) {
  useRender(() =>
    type === "select" ? (
      <select name={name}>
        {options &&
          options.map((option) => <option value={option}>{option}</option>)}
      </select>
    ) : (
      <input
        name={name}
        type={type === "switch" ? "checkbox" : type}
        placeholder="Write..."
      />
    )
  );
  return (
    <host shadowDom>
      <slot></slot>
    </host>
  );
}

input.props = {
  type: String,
  name: String,
  value: String,
  options: Array,
  placeholder: String,
};

input.styles = css`
  ::slotted(*) {
    min-height: 30px;
  }
  ::slotted(select),
  ::slotted([type]:not([type="checkbox"])) {
    border: none;
    border-bottom: 1px solid #707070;
  }
  ::slotted([type]:not([type="checkbox"])) {
    width: 100px;
  }
  ::slotted([type="checkbox"]) {
    width: 30px;
    appearance: none;
    cursor: pointer;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='15' viewBox='0 0 30 15'%3E%3Cg id='Checkbox' transform='translate(-930 -471)'%3E%3Cg id='Rectángulo_113' data-name='Rectángulo 113' transform='translate(930 471)' fill='%23fff' stroke='%23000' stroke-width='1' opacity='0.5'%3E%3Crect width='30' height='15' rx='7.5' stroke='none'/%3E%3Crect x='0.5' y='0.5' width='29' height='14' rx='7' fill='none'/%3E%3C/g%3E%3Crect id='Rectángulo_114' data-name='Rectángulo 114' width='9' height='9' rx='4.5' transform='translate(933 474)' opacity='0.1'/%3E%3C/g%3E%3C/svg%3E%0A")
      no-repeat center/contain;
  }
  ::slotted([type="checkbox"]:checked) {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='15' viewBox='0 0 30 15'%3E%3Cg id='Checkbox' transform='translate(-930 -471)'%3E%3Cg id='Rectángulo_113' data-name='Rectángulo 113' transform='translate(930 471)' fill='%23fff' stroke='%23000' stroke-width='1' opacity='0.5'%3E%3Crect width='30' height='15' rx='7.5' stroke='none'/%3E%3Crect x='0.5' y='0.5' width='29' height='14' rx='7' fill='none'/%3E%3C/g%3E%3Crect id='Rectángulo_114' data-name='Rectángulo 114' width='9' height='9' rx='4.5' transform='translate(948 474)'/%3E%3C/g%3E%3C/svg%3E%0A")
      no-repeat center/contain;
  }
`;

export const Input = c(input);

customElements.define("stories-input", Input);
