import type { Meta, StoryObj } from '@storybook/svelte';
import Toggle from './Toggle.svelte';

const meta = {
  title: 'Main/Toggle',
  component: Toggle,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
  },
};