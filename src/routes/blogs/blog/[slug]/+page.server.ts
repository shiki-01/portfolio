import { getContentDetail } from "$lib/services/microcms";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;
  const res = await getContentDetail("blogs", slug);

  return {
    detail: res,
  };
};