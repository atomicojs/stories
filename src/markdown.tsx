import { Article, Code, Tabs, Stories, Divide } from "./components";
import { parseCssParams } from "@uppercod/parse/parse-css-params";
import { h } from "atomico";
import { setup } from "@uppercod/markdown-inline";
import { VNode } from "atomico/types/vnode";

type VNodeList = VNode<any, any, any>[];

const markdown = setup<VNodeList>(h, {
  inlineCode: "doc-inline-code",
});

export function md(part: TemplateStringsArray, ...args: any[]) {
  const nodes = markdown.call(null, part, ...args);

  const groups: { [index: string]: any } = {};
  const children: VNode<any, any, any>[] = nodes.reduce(
    (children: any, node) => {
      if (node.type === "p") {
        const [first] = node.children.flat(1);
        if (first.type === Stories) {
          children.push(first);
          return children;
        } else {
          children.push(node);
        }
      } else if (node.type === "pre") {
        const [[[type], ...meta]] = parseCssParams(node.props.type) as any;

        const tab = meta.find(([fn]: any) => fn == "tab");

        const code = (
          <Code type={type} value={node.children[0].children.join("\n")}></Code>
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
            {
              ...code,
              props: { ...code.props, slot: index, disableRadiusTop: true },
            }
          );

          return children;
        } else {
          children.push(<Divide>{code}</Divide>);
        }
      } else {
        children.push(node);
      }
      return children;
    },
    []
  );

  return <Article>{children}</Article>;
}
