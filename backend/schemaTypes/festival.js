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
      name: 'date',
      options: { columns: 2 },
    },
    {
      name: 'externalLink',
      options: { columns: 1 },
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
      name: 'color',
      options: { columns: 2 },
    },
    {
      name: 'featured',
      options: { columns: 2 },
    },
    {
      name: 'exhibitionDate',
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
      name: 'featuredMenu',
      title: 'Menu',
      type: 'boolean',
      fieldset: 'featured',
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
      name: 'use',
      type: 'boolean',
      fieldset: 'externalLink',
      group: 'basics',
    },
    {
      name: 'url',
      type: 'url',
      fieldset: 'externalLink',
      group: 'basics',
      hidden: ({ parent }) => !parent.use,
      validation: Rule => Rule.custom((externalUrl, context) => {
        if (context.parent.use && !externalUrl) {
          return 'External url is required';
        }
        return true;
      }),
    },
    {
      name: 'start',
      type: 'date',
      fieldset: 'externalLink',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
      hidden: ({ parent }) => !parent.use,
      validation: Rule => Rule.custom((start, context) => {
        if (context.parent.use && !start) {
          return 'Start date is required';
        }
        return true;
      }),
      group: 'basics',
    },
    {
      name: 'end',
      type: 'date',
      fieldset: 'externalLink',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
      hidden: ({ parent }) => !parent.use,
      group: 'basics',
    },
    {
      name: 'cover',
      type: 'image',
      group: 'media',
      validation: (Rule) => Rule.required(),
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
      name: 'exhibitionTitle',
      type: 'object',
      fields: [
        {
          name: 'it',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'en',
          type: 'string',
          validation: (Rule) => Rule.required(),
          
        }
      ],
      group: 'details',
    },
    {
      name: 'exhibitionStart',
      type: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
      group: 'details',
      fieldset: 'exhibitionDate'
    },
    {
      name: 'exhibitionEnd',
      type: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
      group: 'details',
      fieldset: 'exhibitionDate'
    },
    {
      name: 'exhibitionContent',
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
      name: 'days',
      type: 'array',
      hidden: ({ parent }) => !!parent.use,
      validation: Rule => Rule.custom((days, context) => {
        if (!context.parent.use && !days) {
          return 'At least one day is required';
        }
        return true;
      }),
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
                    {
                      name: 'priceAndReservation',
                      options: { columns: 2 },
                    },
                    {
                      name: 'place',
                      title: 'Place (punto d’incontro)',
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
                      name: 'description',
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
                      name: 'price',
                      type: 'number',
                      fieldset: 'priceAndReservation',
                      validation: Rule => Rule.precision(2).positive(),
                    },
                    {
                      name: 'freeOffer',
                      type: 'boolean',
                      fieldset: 'priceAndReservation',
                    },
                    {
                      name: 'buyUrl',
                      type: 'url',
                      fieldset: 'priceAndReservation',
                      validation: Rule => Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel']
                      }),
                    },
                    {
                      name: 'reservationUrl',
                      type: 'url',
                      fieldset: 'priceAndReservation',
                      validation: Rule => Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel']
                      }),
                    },
                    {
                      name: 'infoUrl',
                      type: 'url',
                      fieldset: 'priceAndReservation',
                      validation: Rule => Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel']
                      }),
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
      group: 'details',
    },
    {
      name: 'infoTitle',
      type: 'object',
      fields: [
        {
          name: 'it',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'en',
          type: 'string',
          validation: (Rule) => Rule.required(),
          
        }
      ],
      group: 'details',
    },
    {
      name: 'infoContent',
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
      use: 'use'
    },
    prepare(selection) {
      const {title, cover, days, start, end, use} = selection;

      if (use) {
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