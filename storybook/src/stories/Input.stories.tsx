import type { Meta, StoryObj } from "@storybook/react";
import Input from "../components/Input";
import { fn } from "@storybook/test";

const meta = {
  title: "Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      options: ["text", "number"],
      control: {
        type: "select",
      },
      description: "공용 인풋 컴포넌트에 대한 type",
    },
    value: {
      control: "text",
      description: "공용 인풋 컴포넌트에 대한 value",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "text",
    value: "",
  },
};
