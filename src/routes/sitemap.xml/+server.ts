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

// 不正な日付を toISOString() に渡すと RangeError で sitemap 生成ごと失敗するため、
// パースできない値は lastmod を省略する。
const toLastmod = (value?: string): string | undefined => {
	if (!value) return undefined;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

export const GET: RequestHandler = async () => {
	const staticUrls = ['/', '/about', '/works', '/blogs', '/sitemap'];
	const works = await getServerContentList('works');

	const urlEntries: Array<{ loc: string; lastmod?: string }> = [
		...staticUrls.map((path) => ({
			loc: toAbsoluteUrl(path)
		})),
		...works.contents.map((work) => ({
			loc: toAbsoluteUrl(`/works/${work.id}`),
			lastmod: toLastmod(work.updatedAt || work.publishedAt)
		}))
	];

	const urls = urlEntries
		.map((entry) => {
			const lines = [`\t<url>`, `\t\t<loc>${escapeXml(entry.loc)}</loc>`];
			if (entry.lastmod) {
				lines.push(`\t\t<lastmod>${escapeXml(entry.lastmod)}</lastmod>`);
			}
			lines.push(`\t</url>`);
			return lines.join('\n');
		})
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
