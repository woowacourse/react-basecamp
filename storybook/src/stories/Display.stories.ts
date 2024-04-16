import type { Meta, StoryObj } from "@storybook/react";
import App from "../App";
import Display from "./Display";

const meta = {
  title: "Example/Display",
  component: Display,
} satisfies Meta<typeof App>;

type Story = StoryObj<typeof meta>;

export default meta;
export const LoggedOut: Story = { name: "Display" };
