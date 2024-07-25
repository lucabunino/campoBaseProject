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
        dateFormat: 'DD-MM-YYYY',
      },
      hidden: ({ parent }) => !parent.externalUrl
    },
    {
      name: 'end',
      type: 'date',
      fieldset: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
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
                dateFormat: 'DD-MM-YYYY',
              },
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
                      validation: Rule => Rule.regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
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
                  ]
                }
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
      name: 'name',
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
      of: [{type: 'block'}]
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
          subtitle: `${start ? start : ''}${end ? ' - ' + end : ''}`,
          media: cover,
        }
      } else {
        const dates = days ? days.map(day => day.date).sort() : '';
        const firstDate = dates.length > 0 ? dates[0] : '';
        const lastDate = dates.length > 1 ? dates[dates.length - 1] : '';
        return {
          title: title,
          subtitle: `${firstDate ? firstDate : ''}${lastDate ? ' - ' + lastDate : ''}`,
          media: cover,
        }
      }
    }
  }
}