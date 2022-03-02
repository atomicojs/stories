import { md, Stories, Story } from "../../src/core";

export const meta = {
  title: "My story component",
  path: "/",
};

export default md`
# My story ${(<br />)} component

et est sit ipsum occaecat id do excepteur ullamco labore non labore consequat deserunt veniam anim fugiat tempor non proident dolore proident commodo incididunt amet tempor pariatur ullamco qui voluptate minim tempor exercitation nisi voluptate sit laboris adipisicing officia velit qui ut commodo proident in ea laborum

et est sit ipsum occaecat id do excepteur ullamco labore non labore consequat deserunt veniam anim fugiat tempor non proident dolore proident commodo incididunt amet tempor pariatur ullamco qui voluptate minim tempor exercitation nisi voluptate sit laboris adipisicing officia velit qui ut commodo proident in ea laborum

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
      render={(props) => (
        <button style="background: black; color: white; height: 40px;width:180px;border:none;border-radius:.5rem;font-size: unset;font-family:unset;">
          {props.label || "button"}
        </button>
      )}
    ></Story>
    <Story label="I am story 2">
      <button>hola - 2</button>
    </Story>
  </Stories>
)}
`;
