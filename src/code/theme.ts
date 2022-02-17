import { css } from "atomico";

export const themeA11yDark = css`
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #d4d0ab;
  }
  .token.punctuation {
    color: #fefefe;
  }
  .token.property,
  .token.tag,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #ffa07a;
  }
  .token.boolean,
  .token.number {
    color: #00e0e0;
  }
  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #abe338;
  }
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.variable {
    color: #00e0e0;
  }
  .token.atrule,
  .token.attr-value,
  .token.function {
    color: #ffd700;
  }
  .token.keyword {
    color: #00e0e0;
  }
  .token.regex,
  .token.important {
    color: #ffd700;
  }
  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }
  .token.entity {
    cursor: help;
  }
  @media screen and (-ms-high-contrast: active) {
    code[class*="language-"],
    pre[class*="language-"] {
      color: windowText;
      background: window;
    }
    :not(pre) > code[class*="language-"],
    pre[class*="language-"] {
      background: window;
    }
    .token.important {
      background: highlight;
      color: window;
      font-weight: normal;
    }
    .token.atrule,
    .token.attr-value,
    .token.function,
    .token.keyword,
    .token.operator,
    .token.selector {
      font-weight: bold;
    }
    .token.attr-value,
    .token.comment,
    .token.doctype,
    .token.function,
    .token.keyword,
    .token.operator,
    .token.property,
    .token.string {
      color: highlight;
    }
    .token.attr-value,
    .token.url {
      font-weight: normal;
    }
  }
`;
