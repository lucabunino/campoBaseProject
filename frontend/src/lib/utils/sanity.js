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
				project->{
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
			content,
		}
		`
	);
}

export async function getEvents() {
	return await client.fetch(
		`
		*[_type == "event" && !(_id in path('drafts.**')) && featuredProject == true] {
			_type,
			title,
			subtitle,
			slug {
				current,
			},
			project->{
				orderRank,
				title
			},
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
			externalUrl,
		} | order(start desc)
		`
	);
}

export async function getFestivalsMenu() {
	return await client.fetch(
		`
		*[_type == "festival" && !(_id in path('drafts.**')) && featuredMenu == true] {
			_type,
			title,
			subtitle,
			externalUrl,
			slug {
				current,
			},
			days,
		} | order(days[0].date asc)
		`
	);
}

export async function getFestivals() {
	return await client.fetch(
		`
		*[_type == "festival" && !(_id in path('drafts.**')) && featuredProject == true] {
			title,
			subtitle,
			slug {
				current,
			},
			project->{
				orderRank,
				title
			},
			start,
			end,
			days,
			cover {
				asset {
					_ref
				},
				'height': asset->metadata.dimensions.height,
				'width': asset->metadata.dimensions.width,
				'aspectRatio': asset->metadata.dimensions.aspectRatio,
			},
			externalUrl,
		} | order(${nonNull('start', 'days[0].date')} desc)
		`
	);
}

export async function getFestival(slug) {
	return await client.fetch(
		`
		*[_type == "festival" && slug.current == $slug]{
			_type,
			title,
			subtitle,
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
			content,
			background,
			hover,
			backgroundImage,
			location,
			googleMaps,
		}
		`,
		{
		slug
	});
}

export async function getEvent(slug) {
	return await client.fetch(
		`
		*[_type == "event" && slug.current == $slug]{
			_type,
			title,
			subtitle,
			slug {
				current,
			},
			project,
			start,
			end,
			time,
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
			content,
			location,
			googleMaps,
			price,
			reservationRequired,
			reservationUrl,
			reservationContact,
			sponsoredBy
		}
		`,
		{
		slug
	});
}

function nonNull(a, b) {
  // Returns first nonNull argument
  if (a) {
    return a
  }
  if (b[0]) {
    return b[0].date
  }
  return ''
}