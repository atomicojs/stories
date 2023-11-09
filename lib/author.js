import { jsxs, jsx } from 'atomico/jsx-runtime';
import { useAsync, css, c } from 'atomico';

const options = {
  github: [
    `https://api.github.com/users/$`,
    (data) => ({
      name: data.name,
      username: data.login,
      avatar: data.avatar_url
    })
  ]
};
const getUser = (source, user) => {
  const [url, map] = options[source];
  return fetch(url.replace("$", user)).then((res) => res.json()).then(map);
};
function author({ source, user }) {
  const data = useAsync(getUser, [source, user]);
  return /* @__PURE__ */ jsxs("host", { shadowDom: true, children: [
    /* @__PURE__ */ jsx("img", { src: data.avatar, alt: "" }),
    /* @__PURE__ */ jsxs("div", { class: "names", children: [
      /* @__PURE__ */ jsx("strong", { children: data.name }),
      /* @__PURE__ */ jsxs("span", { children: [
        "@",
        data.username
      ] })
    ] })
  ] });
}
author.props = {
  source: { type: String, value: "github" },
  user: { type: String }
};
author.styles = css`:host {
    display: inline-grid;
    grid-template-columns: auto auto;
    text-align: left;
    align-items: center;
    gap: 0.5rem;
  }
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
  }
  .names {
    display: grid;
    font-size: 14px;
    line-height: 1.2;
  }`;
const Author = c(author);
customElements.define("stories-author", Author);

export { Author, options };
