import { c, css, useRef, useProp } from "atomico";
import { useProxySlot } from "@atomico/hooks/use-slot";
import customElements from "../custom-elements";
import tokens from "../tokens";
import { serialize } from "atomico/utils";

function tabs() {
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
            <slot name={(child.slot = "tab-" + index)}></slot>
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
  },
  fullWidth: {
    type: Boolean,
    reflect: true,
    value: true,
  },
};

tabs.styles = [
  tokens,
  css`
    :host {
      --tab-background: transparent;
      --tab-padding: 0.5rem 0px;
      --tab-border-color: transparent;
      display: flex;
      flex-flow: column nowrap;
    }
    .tabs {
      width: 100%;
      display: flex;
      gap: 1rem;
      max-width: var(--max-content);
      margin: 0px auto calc(var(--border-width-divide) * -1);
      position: relative;
    }
    .tabs-item {
      background: var(--tab-background);
      padding: var(--tab-padding);
      border: none;
      cursor: pointer;
      border-bottom: var(--border-width-active) solid var(--tab-border-color);
    }
    .tabs-item--active {
      --tab-border-color: var(--border-color-active);
    }
    .tabs-content {
      width: 100%;
      border: var(--border-width-divide) solid var(--border-color-divide);
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      background: var(--background-deep-1);
    }

    .tabs-full-width {
      width: 100%;
    }
    .tabs-maxwidth {
      width: 100%;
      max-width: var(--max-content);
    }
  `,
];

export const Tabs = c(tabs);

customElements.define("tabs", Tabs);
