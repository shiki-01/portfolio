import type { PageLoad } from './$types';
import { clampDescription } from '$lib/utils/seo';

export const prerender = true;

export const load: PageLoad = () => {
	return {
		seo: {
			title: 'About',
			description: clampDescription(
				'プロフィールとスキルセットを掲載したページです。興味領域や技術スタックを確認できます。'
			),
			path: '/about',
			image: '/og/about-1200x630.png',
			type: 'website',
			keywords: ['About', 'プロフィール', 'スキル', 'フルスタック', 'shiki']
		}
	};
};
