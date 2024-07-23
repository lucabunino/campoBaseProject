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
      name: 'days',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'day',
          icon: CalendarIcon,
          fields: [
            {
              name: 'date',
              type: 'date',
            },
            {
              name: 'activities',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'activity',
                  icon: TaskIcon,
                  fields: [
                    {
                      name: 'time',
                      type: 'string',
                      validation: Rule => Rule.regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
                        name: 'HH:MM', // Error message is "Does not match time pattern"
                        invert: false // Boolean to allow any value that does NOT match pattern
                      })
                    },
                    {
                      name: 'title',
                      type: 'string',
                    },
                    {
                      name: 'url',
                      type: 'url',
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
    },
    prepare(selection) {
      const {title, cover, days} = selection;
      
      // Extract dates
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