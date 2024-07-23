import { getFestivals } from '$lib/utils/sanity';
import { getEvents } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
  const festivals = await getFestivals();
  const events = await getEvents();

  const formatObject = [...events, ...festivals].reduce((acc, item) => {
    const formatTitle = item.format.title;
    if (!acc[formatTitle]) {
      acc[formatTitle] = [];
    }
    acc[formatTitle].push(item);
    return acc;
  }, {});

  const formatArray = Object.keys(formatObject)
    .sort()
    .map(formatTitle => [formatTitle, formatObject[formatTitle]]);

  if (formatArray) {
    return {
      format: formatArray
    };
  }

  throw error(404, 'Not found');
}