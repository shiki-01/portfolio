import type { Meta, StoryObj } from '@storybook/svelte';
import Blogpage from './Blogpage.svelte';

const meta = {
  title: 'Main/Blogpage',
  component: Blogpage,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    id: {},
    title: {},
    published: {},
    updated: {},
    eyecatch: {},
    category: {},
    content: {},
  },
} satisfies Meta<Blogpage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'j8a-avkhfh',
    title: '（サンプル）まずはこの記事を開きましょう',
    published: '2024-04-21T13:40:00.315Z',
    updated: '2024-04-21T13:40:00.315Z',
    eyecatch: 'https://images.microcms-assets.io/assets/88fd2dd256cd4385abed34510a068d9d/69db9e3f2b844202a5e600f7d8040f85/blog-template.png',
    category: '更新情報',
    content: "<h2 id=\"hdb41525ba7\">ブログテンプレートから作成されました🎉</h2><p>ブログテンプレートからAPIを作成しました。<br>おつかれさまでした🎉</p><h2 id=\"hf45076424a\">APIプレビューを試そう🚀</h2><p>最初に「APIプレビュー」をしてみましょう。</p><p>入稿したコンテンツはAPI経由で取得し、Viewに繋ぎ込みます。<br>APIプレビューでは実際のAPIレスポンスを確認でき、あなたの開発を加速させます。</p><p>👇まずはここをクリックします。</p><figure><img src=\"https://images.microcms-assets.io/assets/88fd2dd256cd4385abed34510a068d9d/16570a39decf48d4a0ac74ce1809e531/blog-template-description1.png\" alt=\"\" width=\"2490\" height=\"1652\"></figure><p>APIプレビュー画面が開いたら、<strong>「取得」</strong>ボタンでリクエストを試してみましょう。</p><figure><img src=\"https://images.microcms-assets.io/assets/88fd2dd256cd4385abed34510a068d9d/5f384e19f26548edad3496fc7c40fd15/blog-template-description2.png\" alt=\"\" width=\"2492\" height=\"1648\"></figure><p>この記事の内容がAPIで取得できていることがわかります。</p><figure><img src=\"https://images.microcms-assets.io/assets/88fd2dd256cd4385abed34510a068d9d/eddf492185f84414ba0627a09f2c9d58/blog-template-description3.png\" alt=\"\" width=\"1592\" height=\"1246\"></figure><h2 id=\"h88398f2fb7\">次にやること🏃</h2><p>APIプレビューで確認したレスポンスを参考に、あなた自身のWebサイトを構築しましょう。<br>microCMSはAPIでコンテンツを取得するため、お好きな言語・フレームワークで画面を構築できます。</p><ul><li><a href=\"https://document.microcms.io/tutorial/javascript/javascript-top\" target=\"_blank\" rel=\"noopener noreferrer nofollow\"><u>JavaScript SDK</u></a></li><li><a href=\"https://document.microcms.io/tutorial/nuxt/nuxt-top\" target=\"_blank\" rel=\"noopener noreferrer nofollow\"><u>Nuxt SDK</u></a></li><li><a href=\"https://document.microcms.io/tutorial/gatsby/gatsby-top\" target=\"_blank\" rel=\"noopener noreferrer nofollow\"><u>Gatsby SDK</u></a></li></ul><p>その他に<a href=\"https://microcms.io/features/sdk\" target=\"_blank\" rel=\"noopener noreferrer nofollow\"><u>サーバーサイドSDK（PHP / Go / Ruby）やモバイルSDK（iOS / Android）</u></a>もございます。</p><p>お困りなことや疑問点などございましたらお気軽にご連絡ください。<br>サポート窓口：<a href=\"mailto:support@microcms.io\">support@microcms.io</a><br>よくある質問：<a href=\"https://help.microcms.io/ja/knowledge\"><u>https://help.microcms.io/ja/knowledge</u></a></p>",
  },
}