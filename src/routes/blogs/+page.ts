import type { PageLoad } from './$types';
import { clampDescription } from '$lib/utils/seo';

export const prerender = true;

export const load: PageLoad = () => {
	return {
		seo: {
			title: 'Blogs',
			description: clampDescription(
				'ブログ記事の公開予定ページです。技術メモや制作プロセスを今後掲載予定です。'
			),
			path: '/blogs',
			image: '/og/blogs-1200x630.png',
			type: 'website',
			keywords: ['ブログ', '技術記事', '開発ログ', 'shiki']
		}
	};
};
