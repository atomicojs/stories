import markdown from "@atomico/markdown";
import { Article, Code, Tabs, Stories, Divide } from "./components";
import { parseCssParams } from "@uppercod/parse/parse-css-params";

export function md(part, ...args) {
  const nodes = markdown.call(null, part, ...args);
  const groups = {};
  const children = nodes.reduce((children, node) => {
    if (node.type === "p") {
      const [first] = node.children.flat(1);
      if (first.type === Stories) {
        children.push(first);
        return children;
      } else {
        children.push(node);
      }
    } else if (node.type === "pre") {
      const [[type, ...meta]] = parseCssParams(node.props.type);

      const tab = meta.find(([fn]) => fn == "tab");

      const code = (
        <Code type="js" value={node.children[0].children.join("\n")}></Code>
      );
      if (tab) {
        const [, [id, label]] = tab as any;
        if (!groups[id]) {
          groups[id] = [];
          children.push(<Tabs value={"0"}>{groups[id]}</Tabs>);
        }
        const index = groups[id].length;
        groups[id].push(
          <span slot="tab" value={index}>
            {label}
          </span>,
          { ...code, props: { ...code.props, slot: index } }
        );

        return children;
      } else {
        children.push(<Divide>{code}</Divide>);
      }
    } else {
      children.push(node);
    }
    return children;
  }, []);

  return <Article>{children}</Article>;
}
