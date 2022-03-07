import { Props, c, css, useProp, Meta, DOMEvent } from "atomico";
import { formToObject } from "@uppercod/form-tools";
import customElements from "../custom-elements";
import { Toggle, Radio, Input } from "../inputs/inputs";

interface FieldBase {
  type: string;
  description?: string;
  input?: any;
}

interface FieldGeneric extends FieldBase {
  type: "toggle" | "text" | "number";
}

interface FieldGroups extends FieldBase {
  type: "radio-groups";
  options:
    | string[]
    | {
        [value: string]: string;
      };
}

export interface Fields {
  [field: string]: FieldGeneric | FieldGroups;
}

function storiesProps({
  props,
  types,
}: Props<typeof storiesProps.props>): Meta<DOMEvent<"StoriesChangeValues">> {
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
          {props &&
            Object.entries(props).map(([name, field]) => (
              <tr>
                <td>{name}</td>
                <td>
                  <span class="stories-props-tag">
                    <b>{!!types && types[field.type]}</b>
                  </span>
                </td>
                <td>{field.description}</td>
                <td>
                  {field.input ||
                    (field.type === "text" || field.type === "number" ? (
                      <Input name={name} type={field.type}></Input>
                    ) : field.type === "radio-groups" ? (
                      Array.isArray(field.options) ? (
                        field.options.map((value) => (
                          <Radio
                            name={name}
                            value={value}
                            label={value}
                          ></Radio>
                        ))
                      ) : (
                        Object.entries(field.options).map(([value, label]) => (
                          <Radio
                            name={name}
                            value={value}
                            label={label}
                          ></Radio>
                        ))
                      )
                    ) : field.type === "toggle" ? (
                      <Toggle name={name}></Toggle>
                    ) : null)}
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
    value: (): { [type: string]: string } => ({
      "radio-groups": "string",
      number: "number",
      toggle: "boolean",
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

  table tr {
    vertical-align: baseline;
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
