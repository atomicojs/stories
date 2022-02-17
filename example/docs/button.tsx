import { Article, Stories, Story } from "../../src/components";
import { md } from "@atomico/markdown";

export const meta = {
  title: "Button",
  path: "/components/button",
};

const intro = md`
---
title: article
---

# welcome

~~~html tab(items, Html)
<fm-button>button</fm-button>
~~~

~~~tsx tab(items, React)
import { Button } from "formilk/react";

function App(){
  return <>
    <Button>button<Button>
  </>
}
~~~
`;

export default (
  <Article title="Button">
    {intro}
    <Stories
      props={{
        disabled: {
          type: "switch",
          description: "my prop...",
        },
        size: {
          type: "select",
          description: "my prop...",
          options: ["small", "large"],
        },
        label: {
          type: "text",
          description: "Write content...",
        },
      }}
    >
      <Story
        label="Example 1"
        render={(props = { label: "button" }) => <button>{props.label}</button>}
      ></Story>
      <Story label="Example 2">
        <button>hola - 2</button>
      </Story>
    </Stories>
  </Article>
);
