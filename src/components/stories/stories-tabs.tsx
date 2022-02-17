import { Props, c, css, useProp } from "atomico";
import { serialize } from "atomico/utils";
import customElements from "../../custom-elements";
import tokens from "../../tokens";

function storiesTabs({ tabs }: Props<typeof storiesTabs.props>) {
  const [value, setValue] = useProp<string>("value");
  return (
    <host shadowDom>
      <div className="stories-tabs">
        {tabs.map((tab) => (
          <button
            onclick={() => setValue(tab)}
            class={serialize(
              "stories-tab",
              value == tab && "stories-tab-selected"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </host>
  );
}

storiesTabs.props = {
  value: {
    type: String,
    reflect: true,
    event: {
      type: "StoriesTabsChange",
    },
  },
  tabs: {
    type: Array,
    reflect: true,
    value: (): string[] => [],
  },
  props: Object,
};

storiesTabs.styles = [
  tokens,
  css`
    .stories-tabs {
      display: flex;
    }

    .stories-tab {
      display: flex;
      background: none;
      border: none;
      padding: 0.25rem 0;
      min-height: 30px;
      align-items: center;
      box-sizing: border-box;
      margin-right: 1rem;
      border-bottom: var(--border-width-divide) solid transparent;
      margin-bottom: calc(var(--border-width-divide) * -1);
      cursor: pointer;
    }
    .stories-tab-selected {
      border-color: var(--border-color-active);
    }
  `,
];

export const StoriesTabs = c(storiesTabs);

customElements.define("stories-tabs", StoriesTabs);
