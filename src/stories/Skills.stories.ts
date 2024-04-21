import type { Meta, StoryObj } from '@storybook/svelte';
import Skills from './Skills.svelte';

const meta = {
  title: 'Main/Skills',
  component: Skills,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    title: {},
    icons: [],
  },
} satisfies Meta<Skills>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'program',
    icons: [
        {
            name: 'HTML',
            url: 'vscode-icons:file-type-html'
        },
        {
            name: 'CSS',
            url: 'vscode-icons:file-type-css'
        },
        {
            name: 'SASS',
            url: 'vscode-icons:file-type-sass'
        },
        {
            name: 'JS',
            url: 'vscode-icons:file-type-js'
        },
        {
            name: 'TS',
            url: 'vscode-icons:file-type-typescript'
        },
        {
            name: 'Svelte',
            url: 'vscode-icons:file-type-svelte'
        },
        {
            name: 'React',
            url: 'vscode-icons:file-type-reactjs'
        },
        {
            name: 'Vue',
            url: 'vscode-icons:file-type-vue'
        },
        {
            name: 'storybook',
            url: 'vscode-icons:file-type-storybook'
        },
        {
            name: 'electron',
            url: 'devicon:electron'
        },
        {
            name: 'MySQL',
            url: 'logos:mysql-icon'
        },
        {
            name: 'Python',
            url: 'logos:python'
        },
        {
            name: 'Firebase',
            url: 'devicon:firebase'
        },
        {
            name: 'GitHub',
            url: 'ph:github-logo-fill'
        },
    ],
  },
};