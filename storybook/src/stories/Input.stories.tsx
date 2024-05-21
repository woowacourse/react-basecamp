import type { Meta, StoryObj } from '@storybook/react';
import Input from '../components/Input';
<<<<<<< HEAD
const meta = {
  title: 'Input',
  component: Input,
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
=======

const meta = {
  title: 'Base/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 input 컴포넌트 입니다.',
      },
    },
  },
};
>>>>>>> bb7b51d9b22bbb08fa7c3785cfe93ab21e05c80f
