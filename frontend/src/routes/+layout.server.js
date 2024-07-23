import { getSEO, getHomepage, getAbout, getFestivalsMenu } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
	const seo = await getSEO();
	const homepage = await getHomepage();
	const about = await getAbout();
  const festivalsMenu = await getFestivalsMenu();
	const { pathname } = url
	if (seo && homepage && about && festivalsMenu && pathname) {
		return {
			seo,
      homepage,
      about,
      festivalsMenu,
			pathname,
		};
	}
  throw error(404, 'Not found');
}