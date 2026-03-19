import { createClient, type MicroCMSQueries } from 'microcms-js-sdk';
import worksDetail from '$lib/assets/mocks/works-detail.json';
import workssList from '$lib/assets/mocks/works-list.json';
import type { EndPoints } from '$lib/types/microcms';

const viteEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
const USE_MOCKS =
	process.env.USE_MOCKS === 'true' ||
	viteEnv?.VITE_USE_MOCKS === 'true' ||
	process.env.NODE_ENV === 'development';

const getCredentials = () => ({
	serviceDomain:
		process.env.MICROCMS_SERVICE_DOMAIN ??
		process.env.VITE_MICROCMS_SERVICE_DOMAIN ??
		viteEnv?.VITE_MICROCMS_SERVICE_DOMAIN ??
		'',
	apiKey:
		process.env.MICROCMS_API_KEY ??
		process.env.VITE_MICROCMS_API_KEY ??
		viteEnv?.VITE_MICROCMS_API_KEY ??
		''
});

const hasMicroCMSCredentials = () => {
	const { serviceDomain, apiKey } = getCredentials();
	return Boolean(serviceDomain && apiKey);
};

let hasWarnedMockFallback = false;

const shouldUseMocks = () => {
	if (USE_MOCKS) return true;
	if (hasMicroCMSCredentials()) return false;

	if (!hasWarnedMockFallback) {
		hasWarnedMockFallback = true;
		console.warn(
			'[microCMS] Credentials are missing. Falling back to mock data for build/runtime safety.'
		);
	}

	return true;
};

let client: ReturnType<typeof createClient> | null = null;

function getMicroCMSClient() {
	if (!client) {
		const { serviceDomain, apiKey } = getCredentials();

		if (!serviceDomain || !apiKey) {
			throw new Error(
				'MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY must be set (or VITE_MICROCMS_SERVICE_DOMAIN / VITE_MICROCMS_API_KEY for Vite dev)'
			);
		}

		client = createClient({
			serviceDomain,
			apiKey
		});
	}
	return client;
}

export async function getServerContentList<T extends keyof EndPoints['gets']>(
	key: T,
	queries?: MicroCMSQueries
): Promise<EndPoints['gets'][T]> {
	if (shouldUseMocks()) {
		switch (key) {
			case 'works':
				return workssList as never;
			default:
				throw new Error('Invalid key');
		}
	}

	const client = getMicroCMSClient();
	return client.get({
		endpoint: key as string,
		queries: { limit: 100, ...queries }
	}) as Promise<EndPoints['gets'][T]>;
}

export async function getServerContentDetail<T extends keyof EndPoints['get']>(
	key: T,
	id: string,
	queries: MicroCMSQueries = {}
): Promise<EndPoints['get'][T]> {
	if (shouldUseMocks()) {
		switch (key) {
			case 'works':
				return worksDetail as never;
			default:
				throw new Error('Invalid key');
		}
	}

	const client = getMicroCMSClient();
	return client.getListDetail<EndPoints['get'][T]>({
		endpoint: key as string,
		contentId: id,
		queries
	});
}

export async function getServerDraftContentDetail<T extends keyof EndPoints['get']>(
	key: T,
	id: string,
	draftKey: string,
	queries: MicroCMSQueries = {}
): Promise<EndPoints['get'][T]> {
	if (shouldUseMocks() && !draftKey) {
		switch (key) {
			case 'works':
				return worksDetail as never;
			default:
				throw new Error('Invalid key');
		}
	}
	const client = getMicroCMSClient();
	return client.get<EndPoints['get'][T]>({
		endpoint: key as string,
		contentId: id,
		queries: { draftKey, ...queries }
	});
}
