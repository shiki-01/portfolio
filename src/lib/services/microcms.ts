import { createClient, type MicroCMSQueries } from 'microcms-js-sdk';
import worksDetail from '$lib/assets/mocks/works-detail.json';
import workssList from '$lib/assets/mocks/works-list.json';
import type { EndPoints } from '../types/microcms';

let microcmsClient: ReturnType<typeof createClient> | null = null;

function getMicroCMSClient() {
	if (!microcmsClient) {
		const serviceDomain = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN || '';
		const apiKey = import.meta.env.VITE_MICROCMS_API_KEY || '';

		if (!serviceDomain || !apiKey) {
			throw new Error('VITE_MICROCMS_SERVICE_DOMAIN and VITE_MICROCMS_API_KEY must be set');
		}

		microcmsClient = createClient({
			serviceDomain,
			apiKey
		});
	}
	return microcmsClient;
}

export async function getContentList<T extends keyof EndPoints['gets']>(
	key: T,
	queries?: MicroCMSQueries
): Promise<EndPoints['gets'][T]> {
	if (import.meta.env.VITE_USE_MOCKS === 'true') {
		switch (key) {
			case 'works':
				return workssList as never;
			default:
				throw new Error('Invalid key');
		}
	}

	const client = getMicroCMSClient();
	return client.get({
		endpoint: key,
		queries: {
			limit: 100,
			...queries
		}
	});
}

export async function getContentDetail<T extends keyof EndPoints['get']>(
	key: T,
	id: string,
	queries: MicroCMSQueries = {}
): Promise<EndPoints['get'][T]> {
	if (import.meta.env.VITE_USE_MOCKS === 'true') {
		switch (key) {
			case 'works':
				return worksDetail as never;
			default:
				throw new Error('Invalid key');
		}
	}

	const client = getMicroCMSClient();

	return client.getListDetail<EndPoints['get'][T]>({
		endpoint: key,
		contentId: id,
		queries
	});
}

export async function getDraftContentDetail<T extends keyof EndPoints['get']>(
	key: T,
	id: string,
	draftKey: string,
	queries: MicroCMSQueries = {}
): Promise<EndPoints['get'][T]> {
	if (import.meta.env.VITE_USE_MOCKS === 'true' && !draftKey) {
		switch (key) {
			case 'works':
				return worksDetail as never;
			default:
				throw new Error('Invalid key');
		}
	}

	const client = getMicroCMSClient();

	return client.get<EndPoints['get'][T]>({
		endpoint: key,
		contentId: id,
		queries: { draftKey, ...queries }
	});
}
