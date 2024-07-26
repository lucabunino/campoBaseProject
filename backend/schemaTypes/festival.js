import {SparklesIcon} from '@sanity/icons'
import {CalendarIcon} from '@sanity/icons'
import {TaskIcon} from '@sanity/icons'

export default {
  name: 'festival',
  title: 'Festivals',
  type: 'document',
  icon: SparklesIcon,
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
      name: 'color',
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
      name: 'featuredMenu',
      title: 'Menu',
      type: 'boolean',
      fieldset: 'featured'
    },
    {
      name: 'featuredFormat',
      title: 'Formats',
      type: 'boolean',
      fieldset: 'featured'
    },
    {
      name: 'format',
      type: 'reference',
      to: [{type: 'format'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'externalUrl',
      description: 'Adding this field adds an external link from Format, bypassing the single page',
      type: 'url',
    },
    {
      name: 'start',
      type: 'date',
      fieldset: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
      hidden: ({ parent }) => !parent.externalUrl,
      validation: Rule => Rule.custom((start, context) => {
        if (context.parent.externalUrl && !start) {
          return 'Start date is required when externalUrl is provided';
        }
        return true;
      })
    },
    {
      name: 'end',
      type: 'date',
      fieldset: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
      hidden: ({ parent }) => !parent.externalUrl
    },
    {
      name: 'days',
      type: 'array',
      hidden: ({ parent }) => !!parent.externalUrl,
      of: [
        {
          type: 'object',
          name: 'day',
          icon: CalendarIcon,
          fields: [
            {
              name: 'date',
              type: 'date',
              options: {
                dateFormat: 'DD.MM.YYYY',
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'activities',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'activity',
                  icon: TaskIcon,
                  fieldsets: [
                    {
                      name: 'time',
                      options: { columns: 2 },
                    },
                    {
                      name: 'link',
                      options: { columns: 2 },
                    },
                  ],
                  fields: [
                    {
                      name: 'start',
                      type: 'string',
                      fieldset: 'time',
                      validation: Rule => Rule.required() && Rule.regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
                        name: 'HH:MM', // Error message is "Does not match time pattern"
                        invert: false // Boolean to allow any value that does NOT match pattern
                      }),
                    },
                    {
                      name: 'end',
                      type: 'string',
                      fieldset: 'time',
                      validation: Rule => Rule.regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
                        name: 'HH:MM', // Error message is "Does not match time pattern"
                        invert: false // Boolean to allow any value that does NOT match pattern
                      }),
                    },
                    {
                      name: 'title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'label',
                      type: 'string',
                      fieldset: 'link',
                    },
                    {
                      name: 'url',
                      type: 'url',
                      fieldset: 'link',
                    },
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      start: 'start',
                      end: 'end',
                    },
                    prepare(selection) {
                      const {title, start, end} = selection;
                      return {
                        title: title,
                        subtitle: `${start ? start : ''}${end ? '-' + end : ''}`,
                      }
                    }
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'date',
            },
          },
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
      }],
    },
    {
      name: 'cover',
      type: 'image',
      group: 'media',
    },
    {
      name: 'background',
      type: 'color',
      options: {
        disableAlpha: true
      },
      fieldset: 'color',
      group: 'media',
    },
    {
      name: 'hover',
      type: 'color',
      options: {
        disableAlpha: true
      },
      fieldset: 'color',
      group: 'media',
    },
    {
      name: 'backgroundImage',
      type: 'image',
      group: 'media',
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
        {field: nonNull('start', 'days'), direction: 'asc'}
      ]
    },
    {
      title: 'Date (Latest)',
      by: [
        {field: nonNull('start', 'days'), direction: 'desc'}
      ]
    },
  ],
  preview: {
    select: {
      title: 'title',
      cover: 'cover',
      days: 'days',
      start: 'start',
      end: 'end',
      url: 'externalUrl'
    },
    prepare(selection) {
      const {title, cover, days, start, end, url} = selection;

      if (url) {
        return {
          title: title,
          subtitle: formatDate(start, end),
          media: cover,
        }
      } else {
        const dates = days ? days.map(day => day.date).sort() : '';
        const firstDate = dates.length > 0 ? dates[0] : '';
        const lastDate = dates.length > 1 ? dates[dates.length - 1] : '';
        return {
          title: title,
          subtitle: formatDate(firstDate, lastDate),
          media: cover,
        }
      }
    }
  }
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