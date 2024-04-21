import type { Meta, StoryObj } from '@storybook/svelte';
import Blogtitle from './Blogtitle.svelte';

const meta = {
  title: 'Main/Blogtitle',
  component: Blogtitle,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    title: {},
    published: {},
    updated: {},
    eyecatch: {},
    category: {},
  },
} satisfies Meta<Blogtitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '（サンプル）まずはこの記事を開きましょう',
    published: '2024-04-21T13:40:00.315Z',
    updated: '2024-04-21T13:40:00.315Z',
    eyecatch: 'https://images.microcms-assets.io/assets/88fd2dd256cd4385abed34510a068d9d/69db9e3f2b844202a5e600f7d8040f85/blog-template.png',
    category: '更新情報',
  },
}