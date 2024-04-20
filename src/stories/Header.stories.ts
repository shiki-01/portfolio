import type { Meta, StoryObj } from '@storybook/svelte';
import Header from './Header.svelte';

const meta = {
  title: 'Main/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'select' },
      options: ['Home', 'About', 'Works', 'Blogs'],
    },
  },
} satisfies Meta<Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    title: 'Home',
  },
};

export const About: Story = {
  args: {
    title: 'About',
  },
};

export const Blogs: Story = {
  args: {
    title: 'Blogs',
  },
};