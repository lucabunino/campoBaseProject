import { getAbout } from '$lib/utils/sanity.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const slug = await getAbout();
	if (slug) {
		return {
			slug,
		};
	}
  throw error(404, 'Not found');
}