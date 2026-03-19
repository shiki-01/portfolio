import type { EntryGenerator, PageServerLoad } from './$types';
import { getServerContentDetail, getServerContentList } from '$lib/server/microcms.server';
import sanitizeHtml from 'sanitize-html';

export const prerender = true;

const sanitizeDescription = (html?: string): string => {
	if (!html) return '';

	return sanitizeHtml(html, {
		allowedTags: [
			'p',
			'br',
			'strong',
			'em',
			'b',
			'i',
			'u',
			's',
			'ul',
			'ol',
			'li',
			'blockquote',
			'code',
			'pre',
			'a',
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			'table',
			'thead',
			'tbody',
			'tr',
			'th',
			'td',
			'img'
		],
		allowedAttributes: {
			a: ['href', 'target', 'rel'],
			img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
			'*': ['id']
		},
		allowedSchemes: ['http', 'https', 'mailto'],
		transformTags: {
			a: sanitizeHtml.simpleTransform('a', {
				target: '_blank',
				rel: 'noopener noreferrer'
			})
		}
	});
};

export const entries: EntryGenerator = async () => {
	const list = await getServerContentList('works');
	return list.contents.map((item) => ({ id: item.id }));
};

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	const res = await getServerContentDetail('works', id);
	const safeDetail = {
		...res,
		description: sanitizeDescription(res.description)
	};

	return {
		detail: safeDetail
	};
};
