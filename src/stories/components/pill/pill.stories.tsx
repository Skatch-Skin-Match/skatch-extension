import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ChangeEvent } from "react";
import { Pill } from "../../../components/common/pill/pill";
import { string } from "yup";

export default {
  title: "components/Pills",
  component: Pill,
  //   argTypes: {
  //     backgroundColor: { control: "color" },
  //   },
} as ComponentMeta<typeof Pill>;

const Template: ComponentStory<typeof Pill> = (args) => <Pill {...args} />;
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  // console.log(e);
};

export const Primary = Template.bind({});
Primary.args = {
  title: "Standard",
  className: "bg-blue-600 text-white text-xs px-4 py-1 rounded-full",

  onClick: (e) => {
    handleClick(e);
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  title: "24 Hours",
  className: "bg-transparent border border-white text-white text-xs px-4 py-1 rounded-full",

  onClick: (e) => {
    handleClick(e);
  },
};
