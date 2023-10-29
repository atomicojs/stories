import { Props, c, useAsync, css } from "atomico";

export const options: {
  [source: string]: [
    string,
    (data: any) => { name: string; username: string; avatar: string }
  ];
} = {
  github: [
    `https://api.github.com/users/$`,
    (data) => ({
      name: data.name,
      username: data.login,
      avatar: data.avatar_url,
    }),
  ],
};

const getUser = (source: string, user: string) => {
  const [url, map] = options[source];
  return fetch(url.replace("$", user))
    .then((res) => res.json())
    .then(map);
};

function author({ source, user }: Props<typeof author>) {
  const data = useAsync(getUser, [source, user]);
  return (
    <host shadowDom>
      <img src={data.avatar} alt="" />
      <div class="names">
        <strong>{data.name}</strong>
        <span>@{data.username}</span>
      </div>
    </host>
  );
}

author.props = {
  source: { type: String, value: "github" },
  user: { type: String },
};

author.styles = css`
  :host {
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
  }
`;

export const Author = c(author);
