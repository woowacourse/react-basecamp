import type { Meta, StoryObj } from "@storybook/react";
import Button from "../lib/Button";

const meta = {
  title: "Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Click Me!",
    onClick: () => alert("버튼이 클릭되었습니다!"),
  },
};
