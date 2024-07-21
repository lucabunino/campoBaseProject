import { createClient } from '@sanity/client';
import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';

if (!PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET) {
	throw new Error('Did you forget to run sanity init --env?');
}

export const client = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	useCdn: false, // `false` if you want to ensure fresh data
	apiVersion: '2024-07-21' // date of setup
});

export async function getSEO() {
	return await client.fetch(
		`
		*[_type == "seo" && !(_id in path('drafts.**'))] {
			SEOTitle,
			SEODescription,
			SEOImage,
		}
		`
	);
}

export async function getHomepage() {
	return await client.fetch(
		`
		*[_type == "homepage"] {
			title,
			whatsOn[]-> {
				_type,
				title,
				slug {
					current
				},
				format->{
					title
				},
				cover {
					asset {
						_ref
					},
					'height': asset->metadata.dimensions.height,
					'width': asset->metadata.dimensions.width,
					'aspectRatio': asset->metadata.dimensions.aspectRatio,
				},
				start,
				end,
				days
			}
		}
		`
	);
}

export async function getAbout() {
	return await client.fetch(
		`
		*[_type == "about" && !(_id in path('drafts.**'))] {
			title,
			slug {
				current,
			},
			about,
		}
		`
	);
}

export async function getEvents() {
	return await client.fetch(
		`
		*[_type == "event" && !(_id in path('drafts.**'))] {
			title,
			slug {
				current,
			},
			format,
			start,
			end,
			cover {
				asset {
					_ref
				},
				'height': asset->metadata.dimensions.height,
				'width': asset->metadata.dimensions.width,
				'aspectRatio': asset->metadata.dimensions.aspectRatio,
			},
		} | order(year desc)
		`
	);
}

export async function getFestivalsMenu() {
	return await client.fetch(
		`
		*[_type == "festival" && !(_id in path('drafts.**'))] {
			title,
			slug {
				current,
			},
			featuredMenu,
			days,
		} | order(days[0].date asc)
		`
	);
}

export async function getFestivals() {
	return await client.fetch(
		`
		*[_type == "festival" && !(_id in path('drafts.**'))] {
			title,
			slug {
				current,
			},
			format,
			featuredMenu,
			featuredFormat,
			days,
			cover {
				asset {
					_ref
				},
				'height': asset->metadata.dimensions.height,
				'width': asset->metadata.dimensions.width,
				'aspectRatio': asset->metadata.dimensions.aspectRatio,
			},
		} | order(year desc)
		`
	);
}

export async function getEvent(slug) {
	return await client.fetch(
		`
		*[_type == "event" && slug.current == $slug]{
			title,
			slug {
				current,
			},
			format,
			start,
			end,
			cover {
				asset {
					_ref
				},
				'height': asset->metadata.dimensions.height,
				'width': asset->metadata.dimensions.width,
				'aspectRatio': asset->metadata.dimensions.aspectRatio,
			},
			slider [] {
					asset {
						_ref
					},
					'height': asset->metadata.dimensions.height,
					'width': asset->metadata.dimensions.width,
					'aspectRatio': asset->metadata.dimensions.aspectRatio,
			},
			body,
		}
		`,
		{
		slug
	});
}

export async function getFestival(slug) {
	return await client.fetch(
		`
		*[_type == "festival" && slug.current == $slug]{
			title,
			slug {
				current,
			},
			format,
			days,
			cover {
				asset {
					_ref
				},
				'height': asset->metadata.dimensions.height,
				'width': asset->metadata.dimensions.width,
				'aspectRatio': asset->metadata.dimensions.aspectRatio,
			},
			slider [] {
					asset {
						_ref
					},
					'height': asset->metadata.dimensions.height,
					'width': asset->metadata.dimensions.width,
					'aspectRatio': asset->metadata.dimensions.aspectRatio,
			},
			body,
		}
		`,
		{
		slug
	});
}