import { getProject } from '$lib/utils/sanity.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const item = await getProject(params.slug);
	if (item) {
		return {
			item,
		};
	}
  throw error(404, 'Not found');
}