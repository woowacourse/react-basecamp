import type { Meta, StoryObj } from '@storybook/react';
import Input from '../components/Input';

const meta = {
	title: 'Input',
	component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story: '신용카드 컴포넌트',
			},
		},
	},

	args: {
		cardNumberError: { isError: false, errorMessage: '' },
		cardNumbers: ['', '', '', ''],
	},
};
