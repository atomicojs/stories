import { md, Stories, Story } from "../../../src/core";

export const meta = {
  title: "Code",
  path: "/tutorial/code",
};

export default md`
# Code

~~~html tab(example, html)
<button>button</button>
~~~

~~~js tab(example, js)
const x = 100;
~~~

~~~css tab(example, css)
:host {
  width: 100px;
}
~~~

~~~ts tab(example, ts)
const x: number = 10;
~~~

~~~jsx tab(example, jsx)
const x = <host></host>;
~~~

~~~tsx tab(example, tsx)
const x = <host></host>;
~~~

~~~json tab(example, json)
{
  "name": "welcome"
}
~~~

~~~yaml tab(example, yaml)
name: "welcome"
~~~
`;
