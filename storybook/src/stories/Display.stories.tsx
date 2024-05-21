import type { Meta, StoryObj } from '@storybook/react';
import Display from '../components/Display';

const meta = {
  title: 'Display',
  component: Display,
} satisfies Meta<typeof Display>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
