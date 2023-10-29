```tsx only preview
import { Hero } from "./hero";
import { Button } from "./button";
import { Author } from "./author";

export default (
  <Hero>
    <Button small>2.0.0</Button>
    <h1>Stories</h1>
    <p>Markdown with Superpowers</p>
    <Author slot="footer" user="uppercod" />
  </Hero>
);
```

@atomico/storie busca brindar una experiencia de demostracion de codigo usando Markdown + Atomico, el resultado es que cada bloque de coidgo dentro del markdown que defina luego de su extension `preview` sera renderizado dentro del markdown, por ejemplo el siguiente bloque de codigo:

````markdown
```tsx preview focus
import { Button } from "./button";

export default <Button>Example</Button>;
```
````

se renderizara de la siguiente manera

```tsx preview focus
import { Button } from "./button";

export default <Button>Example</Button>;
```

Esto es realmente simple de usar y puedes personalizar cada tipo de bloque markdown y remplazarlo por webcomponents
