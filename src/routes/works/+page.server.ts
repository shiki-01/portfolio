import type { PageServerLoad } from './$types';
import { getServerContentList } from '$lib/server/microcms.server';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const res = await getServerContentList('works');

	return {
		worksList: res
	};
};
