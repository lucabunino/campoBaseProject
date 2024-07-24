// import { getFestivals } from '$lib/utils/sanity';
// import { getEvents } from '$lib/utils/sanity';
// import { error } from '@sveltejs/kit';

// export async function load() {
//   const festivals = await getFestivals();
//   const events = await getEvents();

//   const formatObject = [...events, ...festivals].reduce((acc, item) => {
//     const formatTitle = item.format.title;
//     const formatOrder = item.format.orderRank;
//     if (!acc[formatTitle]) {
//       acc[formatTitle] = [];
//     }
//     acc[formatTitle].push(item);
//     return acc;
//   }, {});

//   const formatArray = Object.keys(formatObject)
//     .sort()
//     .map(formatTitle => [formatTitle, formatObject[formatTitle]]);

//   if (formatArray) {
//     return {
//       format: formatArray
//     };
//   }

//   throw error(404, 'Not found');
// }

import { getFestivals } from '$lib/utils/sanity';
import { getEvents } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
  const festivals = await getFestivals();
  const events = await getEvents();

  const formatObject = [...events, ...festivals].reduce((acc, item) => {
    const formatTitle = item.format.title;
    const formatOrder = item.format.orderRank;
    if (!acc[formatOrder]) {
      acc[formatOrder] = { title: formatTitle, items: [] };
    }
    acc[formatOrder].items.push(item);
    return acc;
  }, {});

  const formatArray = Object.keys(formatObject)
    .sort()
    .map(formatOrder => [formatObject[formatOrder].title, formatObject[formatOrder].items]);

  if (formatArray.length > 0) {
    return {
      format: formatArray
    };
  }

  throw error(404, 'Not found');
}