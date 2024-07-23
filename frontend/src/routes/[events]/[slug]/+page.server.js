import { getItem } from '$lib/utils/sanity.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const item = await getItem(params.slug);
	if (item) {
		return {
			item,
		};
	}
  throw error(404, 'Not found');
}