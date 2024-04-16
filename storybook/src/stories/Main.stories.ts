import type { Meta, StoryObj } from "@storybook/react";

import Display from "./Display";

const meta = {
  title: "Example/Display",
  component: Display,
} satisfies Meta<typeof Display>;

type Story = StoryObj<typeof meta>;

export default meta;

export const LoggedOut: Story = { name: "테스트" };
