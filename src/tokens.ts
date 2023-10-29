import { css } from "atomico";

export const tokensButton = css`
  @tokens "./tokens.yaml" (import: button) (values: true);
`;

export const tokensCard = css`
  @tokens "./tokens.yaml" (import: card) (values: true);
`;

export const tokensCode = css`
  @tokens "./tokens.yaml" (import: code) (values: true);
`;

export const tokensHero = css`
  @tokens "./tokens.yaml" (import: hero) (values: true);
`;

export default [];
