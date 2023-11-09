## Work in progress 🔨

```tsx
import meta from "./src/**/*.md";

{
    "/":{
        meta: {title: "welcome"},
        load: ()=>import("./demo.md")
    },
    "/user":{
        meta: ""
    }
}

<main>
    <aside>
      <Route path="/...current" load={({current})=>links.map(({path})=><Link path={path} active={ isActive( current,path ) }/>))}/>
    </aside>
    <section>
      <Route cache path="/...current" load={({current})=> modules[current].load()}></Route>
    </section>
</main>
```

```tsx
<Route path="/..args" load={({args})=><Aside currentPath={args}/>}></Route>

<Router>
  <Route />
  <Route />
  <Route />
</Router>
```

```yaml
editor:
  (!*):
    --radius: 0px
```
