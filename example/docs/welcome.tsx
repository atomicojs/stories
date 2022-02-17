import { Article, Stories, Story, Tabs, Code } from "../../src/components";

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
    <Tabs value="1">
      <span slot="tab" value="1" full-width>
        JSX
      </span>
      <span slot="tab" value="2" full-width>
        HTML
      </span>
      <span slot="tab" value="3" full-width>
        tab 3
      </span>
      <Code slot="1" type="html" value={`<host></host>`}></Code>
      <Code slot="2" type="javascript" value={`const x = 100;`}></Code>
      <Code slot="3" type="typescript" value={`const x = 100;`}></Code>
    </Tabs>
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
