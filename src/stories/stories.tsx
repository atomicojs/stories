import { Props, c, css, useEffect, useRef, useUpdate, useProp } from "atomico";
import { useSlot } from "@atomico/hooks/use-slot";
import customElements from "../custom-elements";
import { Story } from "./story";
import { StoriesTabs } from "./stories-tabs";
import { StoriesProps, Fields } from "./stories-props";
import tokens from "../tokens";
export { Story } from "./story";

function stories({ props }: Props<typeof stories.props>) {
  const ref = useRef();
  const update = useUpdate();
  const [values, setValues] = useProp("values");
  const storiesList = useSlot(ref).filter(
    (el) => el instanceof Story
  ) as InstanceType<typeof Story>[];

  useEffect(() => {
    if (!storiesList.some((el) => el.show)) {
      const [first] = storiesList;
      if (first) first.show = true;
    }
  }, storiesList);

  const currentTab = storiesList.find(({ show }) => show);

  storiesList.forEach((story) => (story.values = values));

  return (
    <host shadowDom onStoryChangeShow={update}>
      <header class="stories-header">
        <div class="stories-content">
          <StoriesTabs
            tabs={storiesList.map(({ label }) => label)}
            value={currentTab?.label}
            onStoriesTabsChange={(event) => {
              const value = event?.target?.value;
              if (!value) return;
              storiesList.map((story) => {
                story.show = story.label === value;
              });
            }}
          ></StoriesTabs>
        </div>
      </header>
      <div class="stories-preview">
        <div class="stories-content">
          <slot ref={ref}></slot>
        </div>
      </div>
      <div class="stories-props">
        <div class="stories-content">
          <StoriesProps
            props={props}
            onStoriesChangeValues={({ target }) => setValues(target.values)}
          ></StoriesProps>
        </div>
      </div>
    </host>
  );
}

stories.props = {
  props: {
    type: Object,
    value: (): Fields => ({}),
  },
  values: {
    type: Object,
  },
  fullWidth: {
    type: Boolean,
    reflect: true,
    value: (): boolean => true,
  },
};

stories.styles = [
  tokens,
  css`
    :host {
      display: block;
      padding: 0px !important;
    }
    ::slotted(*) {
      display: none;
    }
    ::slotted([show]) {
      display: block;
    }
    .stories-preview {
      position: relative;
      background: var(--background-deep-1);
      padding: 20px 0px;
      border: var(--border-width-divide) solid var(--border-color-divide);
      border-left: none;
      border-right: none;
    }
    .stories-content {
      max-width: var(--max-content);
      margin: auto;
    }
    .stories-props {
      padding-top: 20px;
    }
    .stories-header {
      position: relative;
      z-index: 1;
    }
  `,
];

export const Stories = c(stories);

customElements.define("stories", Stories);
