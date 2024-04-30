import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "vwh-test-button";

const meta = {
  title: "Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Click Me!",
    onClick: () => alert("Button clicked!"),
  },
};
