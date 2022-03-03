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
        <div className="tabs-items">
          {children.map((child, index) => (
            <button
              class={serialize(
                "tabs-item",
                value === child.getAttribute("value") && "tabs-item--active"
              )}
              onclick={() => setValue(child.getAttribute("value"))}
            >
              <slot name={(child.slot = "tab-" + index)}></slot>
            </button>
          ))}
        </div>
        <slot name="options"></slot>
      </div>
      <div className="tabs-inner">
        <slot name={value}></slot>
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
      display: block;
      border-radius: var(--radius);
      background: var(--bg-color-story);
      box-shadow: var(--shadow-embed);
    }
    .tabs {
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-bottom: var(--divide);
      font-size: var(--font-size-small);
    }
    .tabs-items {
      position: relative;
      z-index: 1;
    }
    .tabs-item {
      background: transparent;
      border: none;
      height: var(--action-min-size);
      padding: 0px var(--padding-x);
      font: unset;
      margin-bottom: calc(var(--divide-size) * -1);
      border-bottom: var(--divide-size) solid transparent;
      cursor: pointer;
    }
    .tabs-item--active.tabs-item {
      border-bottom: var(--divide-size) solid var(--color-tab);
    }
  `,
];

export const Tabs = c(tabs);

customElements.define("tabs", Tabs);
