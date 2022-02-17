import { Article, Stories, Story } from "../components";

export const meta = {
  title: "Welcome",
  path: "/",
};

export default (
  <Article title="Welcome">
    <p columns>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium
      reiciendis, cupiditate sapiente ratione ea cum eveniet deserunt magni
      voluptates obcaecati similique possimus odio animi est dolorem doloremque
      inventore non fuga.
      <br />
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium
      reiciendis, cupiditate sapiente ratione ea cum eveniet deserunt magni
      voluptates obcaecati similique possimus odio animi est dolorem doloremque
      inventore non fuga.
    </p>
    <h3>Button</h3>
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
      <Story label="Example: 1">
        <button>Hi 1</button>
      </Story>
      <Story label="Example: 2">
        <button>Hi 2</button>
      </Story>
    </Stories>
  </Article>
);
