import { md, Stories, Story, Input } from "../../../src/core";

export const meta = {
  path: "/Components/Input",
};

export default md`
# Input

${(
  <Stories>
    <Story label="Input default">
      <Input placeholder="Write..."></Input>
    </Story>
    <Story label="Input number">
      <Input type="number" value="0"></Input>
    </Story>
  </Stories>
)}
`;
