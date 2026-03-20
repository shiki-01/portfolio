import type { PageLoad } from './$types';
import { clampDescription } from '$lib/utils/seo';

export const prerender = true;

export const load: PageLoad = ({ data }) => {
	return {
		...data,
		seo: {
			title: 'Works',
			description: clampDescription(
				'制作実績の一覧ページです。Webアプリやデザイン制作などのプロジェクトを掲載しています。'
			),
			path: '/works',
			image: '/og/works-1200x630.png',
			type: 'website',
			keywords: ['制作実績', 'Works', 'Web制作', 'SvelteKit', 'shiki']
		}
	};
};
