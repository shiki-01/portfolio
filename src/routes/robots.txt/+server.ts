import type { RequestHandler } from './$types';
import { toAbsoluteUrl } from '$lib/utils/seo';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${toAbsoluteUrl('/sitemap.xml')}`].join(
		'\n'
	);

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
