import type { RequestHandler } from './$types';
import { getServerContentList } from '$lib/server/microcms.server';
import { toAbsoluteUrl } from '$lib/utils/seo';

export const prerender = true;

const escapeXml = (value: string): string =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');

export const GET: RequestHandler = async () => {
	const staticUrls = ['/', '/about', '/works', '/blogs'];
	const works = await getServerContentList('works');

	const urlEntries: Array<{ loc: string; lastmod?: string }> = [
		...staticUrls.map((path) => ({
			loc: toAbsoluteUrl(path)
		})),
		...works.contents.map((work) => ({
			loc: toAbsoluteUrl(`/works/${work.id}`),
			lastmod: work.updatedAt || work.publishedAt
		}))
	];

	const urls = urlEntries
		.map(
			(entry) => `<url>
	<loc>${escapeXml(entry.loc)}</loc>
	${entry.lastmod ? `<lastmod>${escapeXml(new Date(entry.lastmod).toISOString())}</lastmod>` : ''}
</url>`
		)
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
