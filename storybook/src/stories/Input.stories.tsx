import type { Meta, StoryObj } from '@storybook/react';
import Input from '../components/Input';
import { fn } from '@storybook/test';

const meta = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'input 컴포넌트의 value 속성',
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
    value: '',
  },
};
