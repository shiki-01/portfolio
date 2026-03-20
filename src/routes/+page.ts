import type { PageLoad } from './$types';
import { clampDescription } from '$lib/utils/seo';
import { SITE_URL } from '$lib/utils/seo';

export const prerender = true;

export const load: PageLoad = ({ data }) => {
	const featuredWorks = (data.worksList?.contents || []).slice(0, 3);

	return {
		...data,
		seo: {
			title: 'Home',
			description: clampDescription(
				'Web領域を中心に活動する shiki のポートフォリオ。プロフィール、スキル、制作実績をまとめています。'
			),
			path: '/',
			image: '/og/home-1200x630.png',
			type: 'website',
			keywords: ['shiki', 'ポートフォリオ', 'Webエンジニア', 'SvelteKit', 'TypeScript'],
			jsonLd: {
				'@context': 'https://schema.org',
				'@type': 'WebSite',
				name: 'shiki Portfolio',
				inLanguage: 'ja-JP',
				url: `${SITE_URL}/`,
				author: {
					'@type': 'Person',
					name: 'shiki'
				},
				hasPart: featuredWorks.map((work) => ({
					'@type': 'CreativeWork',
					name: work.title,
					url: `${SITE_URL}/works/${work.id}`
				}))
			}
		}
	};
};
