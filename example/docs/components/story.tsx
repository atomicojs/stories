import { md } from "../../../src/core";

export const meta = {
  path: "/Components/Stories/Story",
};

export default md`
# Stories

Define a story

~~~jsx
<Story label="Input default">
  <Input placeholder="Write..."></Input>
</Story>
~~~

## Props

### Story.label: ~String~

Define the title of the story

### Story.content: ~String~

Define the CSS place-content property

### Story.render: ~(props)=>vnode~

Allows you to interact with the story with a function.

~~~jsx
<Story
  render={({ text, disabled }) => <button disabled={disabled}>{text}</button>}
></Story>
~~~
`;
