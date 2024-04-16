import type { Meta, StoryObj } from "@storybook/react";
import App from "../App";

const meta = {
  title: "Example/App",
  component: App,
} satisfies Meta<typeof App>;

type Story = StoryObj<typeof meta>;

export default meta;
export const LoggedOut: Story = { name: "테스트" };
