import { Article, Stories, Story, md } from "../../src/core";

export const meta = {
  title: "Components",
  path: "/components",
};

export default md`
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
