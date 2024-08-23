import { getFestivals } from '$lib/utils/sanity';
import { getEvents } from '$lib/utils/sanity';
import { getProjects } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
  const projects = await getProjects();  
  const festivals = await getFestivals();
  const events = await getEvents();

  // Combine events and festivals with projects
  const allItems = [...projects, ...events, ...festivals];

  // Create a project object with keys as orderRank
  const projectObject = allItems.reduce((acc, item) => {
    const projectTitle = item.project?.title || item.title; // Fallback to item's own title if no project field
    const projectOrder = item.project?.orderRank || item.orderRank; // Fallback to item's own orderRank if no project field
    const projectDescription = item.project?.description || item.description; // Fallback to item's own description if no project field

    if (!acc[projectOrder]) {
      acc[projectOrder] = { title: projectTitle, description: projectDescription ? projectDescription : false, items: [] };
    }

    acc[projectOrder].items.push(item);
    return acc;
  }, {});

  // Convert the projectObject into an array and sort it by orderRank
  const projectsArray = Object.keys(projectObject)
    .sort() // Sort by numerical orderRank
    .map(projectOrder => [projectObject[projectOrder].title, projectObject[projectOrder].description, projectObject[projectOrder].items]);

  if (projectsArray.length > 0) {
    return {
      projects: projectsArray
    };
  }

  throw error(404, 'Not found');
}
