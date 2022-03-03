import { Props, c, css, useProp } from "atomico";
import { formToObject } from "@uppercod/form-tools";
import customElements from "../custom-elements";
import { Input } from "./stories-input";

interface FieldBase {
  type: string;
  description?: string;
  input?: any;
}

interface FieldGeneric extends FieldBase {
  type: "switch" | "text" | "number";
}

interface FieldSelect extends FieldBase {
  type: "select";
  options: string[];
}

export interface Fields {
  [field: string]: FieldGeneric | FieldSelect;
}

function storiesProps({ props, types }: Props<typeof storiesProps.props>) {
  const [values, setValues] = useProp<any>("values");
  return (
    <host shadowDom>
      <h3>Properties</h3>
      <form
        class="stories-props-scroll"
        onchange={({ currentTarget }) => {
          setValues(formToObject(values)(currentTarget));
        }}
      >
        <table>
          <tr align="left">
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Value</th>
          </tr>
          {Object.entries(props).map(([name, field]) => (
            <tr>
              <td>{name}</td>
              <td>
                <span class="stories-props-tag">
                  {field.type == "select" ? (
                    field.options.reduce(
                      (current, value, index) => [
                        ...current,
                        !!index && <span>|</span>,
                        <b>"{value}"</b>,
                      ],
                      []
                    )
                  ) : (
                    <b>{types[field.type]}</b>
                  )}
                </span>
              </td>
              <td>{field.description}</td>
              <td>
                {field.input || (
                  <Input
                    name={name}
                    type={field.type}
                    options={field.type === "select" ? field.options : null}
                  ></Input>
                )}
              </td>
            </tr>
          ))}
        </table>
      </form>
    </host>
  );
}

storiesProps.props = {
  values: {
    type: Object,
    event: {
      type: "StoriesChangeValues",
    },
  },
  props: {
    type: Object,
    value: (): Fields => ({}),
  },
  types: {
    type: Object,
    value: () => ({
      switch: "boolean",
      checked: "boolean",
      select: "string",
      text: "string",
    }),
  },
};

storiesProps.styles = css`
  :host {
    --font-size-table: var(--font-size-small);
    display: grid;
    grid-gap: 20px;
  }
  table {
    width: 100%;
    font-size: var(--font-size-table);
    border-spacing: 0;
  }
  table th,
  table td {
    padding: 10px 20px 10px 0px;
  }
  table td {
    border-top: var(--divide);
  }
  h3 {
    margin: 0px;
  }

  .stories-props-tag span {
    padding: 0px 0.5em;
    opacity: 0.5;
  }
  .stories-props-scroll {
    overflow: auto;
  }
`;

export const StoriesProps = c(storiesProps);

customElements.define("stories-props", StoriesProps);
