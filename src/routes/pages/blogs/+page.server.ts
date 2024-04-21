import type { PageServerLoad } from './$types';
export const load = (async ({ fetch }) => {
  const response = await fetch('https://shiki-01.microcms.io/api/v1/blogs', {
    headers: {
      'X-API-KEY': process.env.MICRO_CMS_API_KEY
    }
  
  });
  const blogs = await response.json();
  return {
    blogs
  };
}) satisfies PageServerLoad;