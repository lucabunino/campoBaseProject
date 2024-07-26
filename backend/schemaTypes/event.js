import {SparkleIcon} from '@sanity/icons'

export default {
  name: 'event',
  title: 'Events',
  type: 'document',
  icon: SparkleIcon,
  groups: [
    {
      name: 'media',
    },
  ],
  fieldsets: [
    {
      name: 'date',
      options: { columns: 2 },
    },
    {
      name: 'place',
      options: { columns: 2 },
    },
    {
      name: 'featured',
      options: { columns: 2 },
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'featuredFormat',
      title: 'Formats',
      type: 'boolean',
      fieldset: 'featured',
    },
    {
      name: 'format',
      type: 'reference',
      to: [{type: 'format'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'start',
      type: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
      fieldset: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'end',
      type: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
      fieldset: 'date',
    },
    {
      name: 'location',
      type: 'string',
      fieldset: 'place',
    },
    {
      name: 'googleMaps',
      type: 'url',
      fieldset: 'place',
    },
    {
      name: 'content',
      type: 'array', 
      of: [{
        type: 'block',
        lists: [],
        styles: [{title: 'Testo corrente', value: 'normal'},],
        marks: {
          annotations: [
            {
              name: 'link',
              type: 'object',
              title: 'External link',
              fields: [
                {
                  name: 'href',
                  type: 'url',
                  title: 'URL'
                },
                {
                  title: 'Open in new tab',
                  name: 'blank',
                  description: 'Read https://css-tricks.com/use-target_blank/',
                  type: 'boolean'
                }
              ]
            },
          ],
          decorators: [
            {title: 'Strong', value: 'strong'},
            {title: 'Emphasis', value: 'em'},
          ]
        },
      }]
    },
    {
      name: 'cover',
      type: 'image',
      group: 'media',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slider',
      type: 'array',
      group: 'media',
      of: [
        {
          name: 'slide',
          type: 'image',
        },
      ],
      preview: {
        select: {
          title: 'title',
          media: 'slide',
        },
      },
    },
  ],
  orderings: [
    {
      title: 'Title AZ',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    },
    {
      title: 'Title ZA',
      by: [
        {field: 'title', direction: 'desc'}
      ]
    },
    {
      title: 'Date (Oldest)',
      by: [
        {field: 'start', direction: 'asc'}
      ]
    },
    {
      title: 'Date (Latest)',
      by: [
        {field: 'start', direction: 'desc'}
      ]
    },
  ],
  preview: {
    select: {
      title: 'title',
      start: 'start',
      end: 'end',
      cover: 'cover',
    },
    prepare(selection) {
      const {title, start, end, cover} = selection;
      return {
        title: title,
        subtitle: formatDate(start, end),
        media: cover,
      }
    }
  },
}

function formatDate(date1, date2) {
  // Parse the input dates
  let d1, d2;
  if (date1) {
    d1 = date1 ? new Date(date1) : '';
  } else {
    return {}
  }
  if (date2) {
    d2 = date2 ? new Date(date2) : new Date(date1);
  } else {
    const day1 = d1.getDate().toString().padStart(2, '0');
    const month1 = (d1.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year1 = d1.getFullYear();
    return `${day1}.${month1}.${year1}`;
  }

  // Extract the parts of the dates
  const day1 = d1.getDate().toString().padStart(2, '0');
  const month1 = (d1.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year1 = d1.getFullYear();

  const day2 = d2.getDate().toString().padStart(2, '0');
  const month2 = (d2.getMonth() + 1).toString().padStart(2, '0');
  const year2 = d2.getFullYear();

  // Check if month and year are the same
  if (year1 === year2 && month1 === month2) {
    return `${day1}-${day2}.${month1}.${year1}`;
  } else {
    return `${day1}.${month1}.${year1}-${day2}.${month2}.${year2}`;
  }
}