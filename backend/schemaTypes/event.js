import {SparkleIcon} from '@sanity/icons'

export default {
  name: 'event',
  title: 'Events',
  type: 'document',
  icon: SparkleIcon,
  groups: [
    {
      name: 'basics',
    },
    {
      name: 'media',
    },
    {
      name: 'details',
    },
  ],
  fieldsets: [
    {
      name: 'datetime',
      options: { columns: 2 },
    },
    {
      name: 'priceAndReservation',
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
      group: 'basics',
    },
    {
      name: 'subtitle',
      type: 'string',
      group: 'basics',
    },
    {
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'basics',
    },
    {
      name: 'featuredProject',
      title: 'Projects',
      type: 'boolean',
      fieldset: 'featured',
      group: 'basics',
    },
    {
      name: 'project',
      type: 'reference',
      to: [{type: 'project'}],
      validation: (Rule) => Rule.required(),
      group: 'basics',
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
    {
      name: 'start',
      type: 'datetime',
      options: {
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH.mm',
      },
      fieldset: 'datetime',
      validation: (Rule) => Rule.custom((start, context) => {
        if (context.document?.time === false && !start) {
          return 'Start date is required when "Hide time" is not checked';
        }
        return true;
      }),
      group: 'details',
    },
    {
      name: 'end',
      type: 'datetime',
      options: {
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH.mm',
      },
      fieldset: 'datetime',
      group: 'details',
    },
    {
      name: 'time',
      title: 'Hide time',
      type: 'boolean',
      fieldset: 'datetime',
      group: 'details',
    },
    {
      name: 'location',
      type: 'string',
      fieldset: 'place',
      group: 'details',
    },
    {
      name: 'googleMaps',
      type: 'url',
      fieldset: 'place',
      group: 'details',
    },
    {
      name: 'price',
      type: 'number',
      fieldset: 'priceAndReservation',
      group: 'details',
      validation: Rule => Rule.precision(2).positive(),
    },
    {
      name: 'freeOffer',
      type: 'boolean',
      fieldset: 'priceAndReservation',
      group: 'details',
    },
    {
      name: 'buyUrl',
      type: 'url',
      fieldset: 'priceAndReservation',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      }),
      group: 'details',
    },
    {
      name: 'reservationUrl',
      type: 'url',
      fieldset: 'priceAndReservation',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      }),
      group: 'details',
    },
    {
      name: 'content',
      type: 'object',
      fields: [
        {
          name: 'it',
          type: 'array',
          validation: (Rule) => Rule.required(),
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
          }],
        },
        {
          name: 'en',
          type: 'array',
          validation: (Rule) => Rule.required(),
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
          }],
        }
      ],
      group: 'details',
    },
    {
      name: 'partners',
      type: 'array',
      group: 'details',
      of: [
        {
          name: 'partner',
          type: 'file',
        },
      ]
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
    return ''
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
  if (day1 === day2 && year1 === year2 && month1 === month2) {
    return `${day1}.${month1}.${year1}`;
  } else if (year1 === year2 && month1 === month2) {
    return `${day1}-${day2}.${month1}.${year1}`;
  } else {
    return `${day1}.${month1}.${year1}-${day2}.${month2}.${year2}`;
  }
}