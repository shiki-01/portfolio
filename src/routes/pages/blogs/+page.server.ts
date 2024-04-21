import type { PageServerLoad } from './$types';
export const load = (async ({ fetch }) => {
  const response = await fetch('https://shiki-01.microcms.io/api/v1/blogs', {
    headers: {
      'X-API-KEY': 'PZV4I3wsuw0x6apqKaUYoTEa46CtZHfczQq8'
    }
  
  });
  const blogs = await response.json();
  return {
    blogs
  };
}) satisfies PageServerLoad;