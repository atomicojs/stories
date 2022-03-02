import { c, css, useRef, useProp, Meta, DOMEvent } from "atomico";
import { useProxySlot } from "@atomico/hooks/use-slot";
import customElements from "../custom-elements";
import tokens from "../tokens";
import { serialize } from "atomico/utils";

function tabs(): Meta<DOMEvent<"ChangeTab">> {
  const ref = useRef();
  const children = useProxySlot<Element>(ref);
  const [value, setValue] = useProp<string>("value");
  const current = children.find(
    (child) => child.getAttribute("value") === value
  );
  return (
    <host shadowDom>
      <slot name="tab" ref={ref}></slot>
      <div class="tabs">
        {children.map((child, index) => (
          <button
            class={serialize(
              "tabs-item",
              value === child.getAttribute("value") && "tabs-item--active"
            )}
            onclick={() => setValue(child.getAttribute("value"))}
          >
            <span class="tabs-item-content">
              <slot name={(child.slot = "tab-" + index)}></slot>
            </span>
          </button>
        ))}
      </div>
      <div className="tabs-content">
        <div
          class={
            current?.hasAttribute("full-width")
              ? "tabs-full-width"
              : "tabs-maxwidth"
          }
        >
          <slot name={value}></slot>
        </div>
      </div>
    </host>
  );
}

tabs.props = {
  value: {
    type: String,
    reflect: true,
    event: {
      type: "ChangeTab",
    },
  },
  fullWidth: {
    type: Boolean,
    reflect: true,
  },
};

tabs.styles = [
  tokens,
  css`
    :host {
      display: flex;
      flex-flow: column nowrap;
      --tab-background: var(--bg-color-tab-unselected);
      --tab-padding: 0.25rem 1.5rem;
    }
    .tabs {
      display: flex;
      max-width: var(--content-max-width);
      margin: 0px auto;
      position: relative;
      overflow: auto;
    }
    .tabs-item {
      background: var(--tab-background);
      padding: var(--tab-padding);
      border: none;
      cursor: pointer;
      padding: var(--tab-padding);
      border-bottom: 0;
      border-radius: var(--radius) var(--radius) 0 0;
      transition: var(--transition-1);
      min-height: var(--action-min-size);
      font: unset;
      font-size: var(--font-size-small);
      line-height: 1em;
    }
    .tabs-item-content {
      opacity: var(--opacity-tab-unselected);
    }
    .tabs-item--active {
      --tab-background: white;
      --opacity-tab-unselected: 1;
    }
    .tabs-content {
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      background: var(--bg-color-story);
      border-radius: var(--radius);
    }

    .tabs-full-width {
      width: 100%;
    }
    .tabs-maxwidth {
      width: 100%;
      max-width: var(--content-max-width);
    }
    :host([full-width]) .tabs-content {
      border-left: none;
      border-right: none;
    }
  `,
];

export const Tabs = c(tabs);

customElements.define("tabs", Tabs);
