```tsx meta
export const meta = {
  title: `Stories with @atomico/stories`,
  description: (
    <>
      Markdown with <b>superpowers</b>
    </>
  ),
  author: "uppercod",
};
```

**@atomico/storie** aims to provide a code demo experience using Markdown + Atomico. For example, if you add the preview declaration to your Markdown code block, it will be rendered by Atomico, allowing you to have a preview of the code written within your Markdown. Here's an example of the declaration:

````markdown
```tsx preview focus
import { Author } from "./author";

export default <Button>Example</Button>;
```
````

Result of the previous declaration:

```tsx preview focus
import { Button } from "./button";

export default <Button>Example</Button>;
```

This is really simple to use, and you can customize each type of Markdown block and replace it with webcomponents.

---

## Markdown component

The `<Markdown/>` component allows rendering content generated by the \*.md modules generated by @atomico/vite.

# title 1

## title 2

### title 3

#### title 4

##### title 5

Lorem ipsum dolor sit amet consectetur adipiscing elit blandit felis posuere, tincidunt donec iaculis libero bibendum vitae penatibus quis. Nibh est senectus nulla mus lectus risus porttitor, duis commodo conubia scelerisque et etiam magna.

> Lorem ipsum dolor sit amet consectetur adipiscing elit blandit felis posuere, tincidunt `donec iaculis libero` bibendum vitae penatibus quis.

1. Lorem ipsum dolor sit amet consectetur adipiscing elit blandit
2. felis posuere, tincidunt donec iaculis libero bibendum vitae
3. penatibus quis. Nibh est senectus nulla mus lectus risus porttitor,
   1. duis commodo conubia scelerisque et etiam magna.
   2. duis commodo conubia scelerisque et etiam magna.

![image](https://images.unsplash.com/photo-1698399134573-cf1754493ead?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)
