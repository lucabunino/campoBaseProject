import {SparklesIcon} from '@sanity/icons'

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
          fields: [
            {
              name: 'dayDate',
              type: 'date',
            },
            {
              name: 'activity',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'day',
                  fields: [
                    {
                      name: 'time',
                      type: 'string',
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
              title: 'dayDate',
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
      name: 'body',
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
      const dates = days.map(day => day.dayDate).sort();
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