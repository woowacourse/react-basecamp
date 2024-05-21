<<<<<<< HEAD
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../lib/Button';

const meta = {
  title: 'Button',
=======
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "vwh-test-button";

const meta = {
  title: "Button",
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
<<<<<<< HEAD
    label: 'Click me!',
    onClick: () => alert('Button clicked!'),
=======
    label: "Click Me!",
    onClick: () => alert("Button clicked!"),
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
  },
};
