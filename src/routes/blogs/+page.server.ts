import { getContentList } from "$lib/services/microcms";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const res = await getContentList("blogs");

	return {
		blogList: res,
	};
};