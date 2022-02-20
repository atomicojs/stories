import { md, Stories, Story } from "../../src/core";

export const meta = {
  title: "Welcome",
  path: "/",
};

export default md`
# welcomes



et est sit ipsum occaecat id do excepteur ullamco labore non labore consequat deserunt veniam anim fugiat tempor non proident dolore proident commodo incididunt amet tempor pariatur ullamco qui voluptate minim tempor exercitation nisi voluptate sit laboris adipisicing officia velit qui ut commodo proident in ea laborum

> welcome...

1. a
2. a
3. a

![img](https://images.unsplash.com/photo-1590907047706-ee9c08cf3189?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80)

welmcome **normalize** ~ready~ ...

1. "one"

~~~html
<!DOCTYPE html>
<html>
<head>
<style> 
div {
  border: 2px solid;
  padding: 20px; 
  width: 300px;
  resize: both;
  overflow: auto;
}
</style>
</head>
<body>

<h1>The resize Property</h1>

<div>
  <p>Let the user resize both the height and the width of this div element.</p>
  <p>To resize: Click and drag the bottom right corner of this div element.</p>
</div>

</body>
</html>

~~~

~~~js
const x = 100;
~~~

~~~js tab(group-1, JS)
const x = 101;
~~~

~~~js tab(group-1, React)
const x = 102;
~~~

~~~js tab(group-1, Atomico)
const x = 103;
~~~

## Storie

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
      label="Example 1"
      render={(props = { label: "button" }) => <button>{props.label}</button>}
    ></Story>
    <Story label="Example 2">
      <button>hola - 2</button>
    </Story>
  </Stories>
)}
`;
