import { md, Stories, Story } from "../../src/core";

export const meta = {
  title: "Welcome",
  path: "/s",
};

export default md`
# Bienvenido a @atomico/stories

Una forma rapida y simple de documentar  webcomponents

~~~jsx
import { md } from "@atomico/stories";

export const meta = { 
  title: "welcome!",
  path: "/" 
};

export default md\`
# Title...

Content...

\${<button onclick={console.log}>I am JSX</button>}

\`;
~~~



Con ~@atomico/stories~ podras documentar  tus webcomponents y crear storias reactivas, ejemplo:

${(
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
      label="I am story 1"
      render={(props) => <button>{props.label || "button"}</button>}
    ></Story>
    <Story label="I am story 2">
      <button>hola - 2</button>
    </Story>
  </Stories>
)}
`;
