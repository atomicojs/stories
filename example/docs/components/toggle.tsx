import { md, Stories, Story, Toggle } from "../../../src/core";

export const meta = {
  path: "/Components/Toggle",
};

export default md`
# Input toggle

${(
  <Stories>
    <Story label="Toggle default">
      <Toggle label="Togggle"></Toggle>
    </Story>
  </Stories>
)}
`;
