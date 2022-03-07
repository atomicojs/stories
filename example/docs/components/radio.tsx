import { md, Stories, Story, Radio } from "../../../src/core";

export const meta = {
  path: "/Components/Radio",
};

export default md`
# Input radio

${(
  <Stories>
    <Story label="Radio default">
      <Radio label="radio"></Radio>
    </Story>
    <Story label="Radio group">
      <div>
        <Radio name="radio" value="1" label="Radio 1"></Radio>
        <Radio name="radio" value="2" label="Radio 2"></Radio>
        <Radio name="radio" value="3" label="Radio 3"></Radio>
        <Radio name="radio" value="4" label="Radio 4"></Radio>
      </div>
    </Story>
  </Stories>
)}

`;
