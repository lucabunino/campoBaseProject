import { getFestivals } from '$lib/utils/sanity';
import { getEvents } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
  const festivals = await getFestivals();
  const events = await getEvents();
	const { pathname } = url
	if (festivals && events) {
		return {
			festivals,
      events,
		};
	}
  throw error(404, 'Not found');
}