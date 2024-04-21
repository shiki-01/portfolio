import type { Meta, StoryObj } from '@storybook/svelte';
import Title from './Title.svelte';

const meta = {
  title: 'Main/Title',
  component: Title,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    title: {},
  },
} satisfies Meta<Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '',
  },
};