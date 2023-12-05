import { css } from "atomico";

export const tokensColor = css`
  @tokens "./tokens.yaml" filter(color);
`;

export const tokensButton = css`
  @tokens "./tokens.yaml" use(button);
`;

export const tokensButtons = css`
  @tokens "./tokens.yaml" use(buttons);
`;

export const tokensCard = css`
  @tokens "./tokens.yaml" use(card);
`;

export const tokensCode = css`
  @tokens "./tokens.yaml" use(code);
`;

export const tokensEditor = css`
  @tokens "./tokens.yaml" use(editor);
`;

export const tokensHero = css`
  @tokens "./tokens.yaml" use(hero);
`;

export const tokensScroll = css`
  @tokens "./tokens.yaml" use(scroll);
`;

export const tokensLayout = css`
  @tokens "./tokens.yaml" use(layout);
`;

export const tokens = css`
  @tokens "./tokens.yaml" scope(:root);
`;

//@ts-ignore
document.adoptedStyleSheets = [tokens, ...document.adoptedStyleSheets];
