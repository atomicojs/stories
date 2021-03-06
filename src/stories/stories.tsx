import { Props, c, css, useRef, useProp } from "atomico";
import { useProxySlot } from "@atomico/hooks/use-slot";
import { Tabs } from "../tabs/tabs";
import customElements from "../system";
import { Story } from "./story";
import { StoriesProps, Fields } from "./stories-props";
import { Toggle } from "../inputs/inputs";
import tokens from "../tokens";
export { Story } from "./story";

function stories({ props }: Props<typeof stories.props>) {
  const ref = useRef();
  const [values, setValues] = useProp<any>("values");
  const [value, setValue] = useProp<string>("value");
  const storiesList = useProxySlot(ref).filter(
    (el) => el instanceof Story
  ) as InstanceType<typeof Story>[];

  storiesList.forEach((story) => (story.values = values));

  return (
    <host shadowDom>
      <slot ref={ref}></slot>

      <Tabs
        value={value}
        onChangeTab={({ currentTarget }) =>
          currentTarget.value && setValue(currentTarget.value)
        }
        class="stories-tabs"
      >
        {storiesList.map(({ label }, index) => (
          <span slot="tab" value={index} full-width>
            {label}
          </span>
        ))}
        {storiesList.map((story, i) => (
          <slot slot={"" + i} name={(story.slot = "" + i)}></slot>
        ))}
        <label class="stories-option-switch" slot="options">
          <Toggle
            onchange={({ currentTarget }) => {
              console.log(currentTarget);
              storiesList.forEach(
                (story) => (story.showCode = currentTarget.checked)
              );
            }}
            label="Code"
            reverse
          ></Toggle>
        </label>
      </Tabs>
      {props && !!Object.keys(props).length && (
        <div class="stories-props">
          <div class="stories-content">
            <StoriesProps
              props={props}
              onStoriesChangeValues={({ currentTarget }) =>
                setValues(currentTarget.values)
              }
            ></StoriesProps>
          </div>
        </div>
      )}
    </host>
  );
}

stories.props = {
  value: {
    type: String,
    value: "0",
  },
  props: {
    type: Object,
    value: (): Fields => ({}),
  },
  values: {
    type: Object,
  },
};

stories.styles = [
  tokens,
  css`
    :host {
      display: block;
      padding: 0px !important;
    }
    .stories-content {
      margin: auto;
    }
    .stories-props {
      padding-top: 20px;
    }

    .stories-header {
      position: relative;
      z-index: 1;
    }
    .stories-option-switch {
      display: flex;
      align-items: center;
      padding: 0 var(--padding-x);
      cursor: pointer;
    }
  `,
];

export const Stories = c(stories);

customElements.define("stories", Stories);
