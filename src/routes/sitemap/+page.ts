import type { PageLoad } from './$types';
import { clampDescription } from '$lib/utils/seo';

export const prerender = true;

export const load: PageLoad = () => {
	return {
		seo: {
			title: 'Sitemap',
			description: clampDescription('サイトマップ。各ページへのリンク一覧です。'),
			path: '/sitemap',
			type: 'website',
			keywords: ['Sitemap', 'サイトマップ', 'shiki']
		}
	};
};
