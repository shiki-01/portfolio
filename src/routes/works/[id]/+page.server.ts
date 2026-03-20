import type { EntryGenerator, PageServerLoad } from './$types';
import { getServerContentDetail, getServerContentList } from '$lib/server/microcms.server';

type SanitizeHtmlFn = ((dirty: string, options?: Record<string, unknown>) => string) & {
	simpleTransform: (
		tagName: string,
		attribs: Record<string, string>,
		merge?: boolean
	) => (tagName: string, attribs: Record<string, string>) => { tagName: string; attribs: Record<string, string> };
};

let sanitizeHtmlFn: SanitizeHtmlFn | null | undefined;

const getSanitizeHtml = async () => {
	if (sanitizeHtmlFn !== undefined) {
		return sanitizeHtmlFn;
	}

	try {
		const mod = await import('sanitize-html');
		sanitizeHtmlFn = ((mod as { default?: unknown }).default ?? mod) as SanitizeHtmlFn;
	} catch (error) {
		console.warn('[works/[id]] sanitize-html is unavailable. Skip sanitization.', error);
		sanitizeHtmlFn = null;
	}

	return sanitizeHtmlFn;
};

export const prerender = true;

const sanitizeDescription = async (html?: string): Promise<string> => {
	if (!html) return '';
	const sanitizeHtml = await getSanitizeHtml();
	if (!sanitizeHtml) return html;

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
		description: await sanitizeDescription(res.description)
	};

	return {
		detail: safeDetail
	};
};
