export const SITE_NAME = 'Shiki Portfolio';
export const DEFAULT_LOCALE = 'ja_JP';
export const DEFAULT_SEO_IMAGE = '/og/default-1200x630.png';

const FALLBACK_SITE_URL = 'https://shiki-01.com';

export const normalizeSiteUrl = (url: string): string => {
	if (!url) return FALLBACK_SITE_URL;
	return url.endsWith('/') ? url.slice(0, -1) : url;
};

export const SITE_URL = normalizeSiteUrl(import.meta.env.PUBLIC_SITE_URL || FALLBACK_SITE_URL);

export const toAbsoluteUrl = (pathOrUrl: string): string => {
	if (!pathOrUrl) return SITE_URL;
	if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
		return pathOrUrl;
	}

	const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
	return `${SITE_URL}${normalizedPath}`;
};

export const stripHtml = (value: string): string =>
	value
		.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, ' ')
		.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

export const clampDescription = (value: string, maxLength = 140): string => {
	if (value.length <= maxLength) return value;
	return `${value.slice(0, maxLength - 1)}…`;
};

export type SeoData = {
	title?: string;
	description?: string;
	path?: string;
	image?: string;
	type?: 'website' | 'article';
	keywords?: string[];
	noindex?: boolean;
	publishedTime?: string;
	modifiedTime?: string;
	jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};
