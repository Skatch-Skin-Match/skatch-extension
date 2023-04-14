import RadioButton from "@/components/common/RadioButton";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Components/RadioButton",
  component: RadioButton,
} as ComponentMeta<typeof RadioButton>;

const Template: ComponentStory<typeof RadioButton> = (args) => <RadioButton {...args} />;

export const RadioBtn = Template.bind({});
RadioBtn.args = {
  value: "radio",
  id: "radio",
  label: "radioButton",
};
