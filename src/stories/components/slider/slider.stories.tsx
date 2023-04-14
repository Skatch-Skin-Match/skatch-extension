import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ChangeEvent } from "react";
// import Slider from "src/components/common/Slider";
import Slider from "../../../components/common/Slider";

export default {
  title: "components/slider",
  component: Slider,
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />;
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  // console.log(e);
};

export const Default = Template.bind({});
Default.args = {
  name: "slider",
  min: 4,
  max: 6,
  changeHandler: (e) => handleChange(e),
};
