// import { getFestivals } from '$lib/utils/sanity';
// import { getEvents } from '$lib/utils/sanity';
// import { error } from '@sveltejs/kit';

// export async function load() {
//   const festivals = await getFestivals();
//   const events = await getEvents();

//   const projectObject = [...events, ...festivals].reduce((acc, item) => {
//     const projectTitle = item.project.title;
//     const projectOrder = item.project.orderRank;
//     if (!acc[projectOrder]) {
//       acc[projectOrder] = { title: projectTitle, items: [] };
//     }
//     acc[projectOrder].items.push(item);
//     return acc;
//   }, {});

//   const projectsArray = Object.keys(projectObject)
//     .sort()
//     .map(projectOrder => [projectObject[projectOrder].title, projectObject[projectOrder].items]);

//   if (projectsArray.length > 0) {
//     return {
//       projects: projectsArray
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

  const projectObject = [...events, ...festivals].reduce((acc, item) => {
    const projectTitle = item.project.title;
    const projectOrder = item.project.orderRank;
    if (!acc[projectOrder]) {
      acc[projectOrder] = { title: projectTitle, items: [] };
    }
    acc[projectOrder].items.push(item);
    return acc;
  }, {});

  const projectsArray = Object.keys(projectObject)
    .sort()
    .map(projectOrder => [projectObject[projectOrder].title, projectObject[projectOrder].items]);

  if (projectsArray.length > 0) {
    return {
      projects: projectsArray
    };
  }

  throw error(404, 'Not found');
}