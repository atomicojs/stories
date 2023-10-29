import { useProxySlot } from "@atomico/hooks/use-slot";
import { Props, c, css, useProp, useRef } from "atomico";
import { Button, ButtonGroup } from "../button";
import { tokensCard } from "../tokens";
import { copy } from "@atomico/hooks/use-copy";

function codeEditor({ text }: Props<typeof codeEditor>) {
  const [tab, setTab] = useProp<string>("tab");
  const ref = useRef();
  const slots = useProxySlot<HTMLElement>(
    ref,
    (node) => node instanceof HTMLElement
  );
  return (
    <host shadowDom>
      <slot ref={ref} />
      <div class="header">
        <ButtonGroup appearance="tab">
          {slots.map((element, i) => {
            const label = element.getAttribute("label");
            const value = element.getAttribute("value") || label;
            const checked = tab ? value === tab : !i;
            return (
              <Button
                checked={checked}
                class="button"
                onclick={() => setTab(value)}
                small
              >
                {label || value}
              </Button>
            );
          })}
        </ButtonGroup>
        {text && (
          <Button
            icon
            active
            small
            staticNode
            onclick={() => copy(decodeURI(text))}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 3C0 2.44772 0.447715 2 1 2H8C8.55229 2 9 2.44772 9 3V10C9 10.5523 8.55229 11 8 11H1C0.447715 11 0 10.5523 0 10V3Z"
                fill="#151718"
              />
              <rect
                opacity="0.5"
                x="2"
                width="9"
                height="9"
                rx="1"
                fill="#151718"
              />
            </svg>
          </Button>
        )}
      </div>
      <div class="view">
        {slots.map((element, i) => {
          const label = element.getAttribute("label");
          const value = element.getAttribute("value") || label;
          const isShow = tab ? tab === value : !i;
          return (
            <div class={`tab ${isShow ? "show" : "hide"}`}>
              <slot name={(element.slot = `tab-${i}`)}></slot>
            </div>
          );
        })}
      </div>
    </host>
  );
}

codeEditor.props = {
  tab: String,
  text: String,
};

codeEditor.styles = [
  tokensCard,
  css`
    :host {
      display: block;
      max-width: 100%;
    }
    .header {
      display: grid;
      grid-template-columns: auto auto;
      justify-content: space-between;
      padding: 0 var(--padding);
      min-height: 2.25rem;
    }
    .hide {
      display: none;
    }
  `,
];

export const CodeEditor = c(codeEditor);
