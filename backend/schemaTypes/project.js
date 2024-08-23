import { orderRankField } from '@sanity/orderable-document-list'
import { ProjectsIcon } from '@sanity/icons'


export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
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
  fields: [
    orderRankField({ type: "festival" }),
    {
      name: 'title',
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
      name: 'description',
      type: 'object',
      fields: [
        {
          name: 'it',
          type: 'text',
          rows: 5,
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'en',
          type: 'text',
          rows: 5,
          validation: (Rule) => Rule.required(),
        },
      ],
      group: 'basics',
    },
    {
      name: 'displayAsSinglePage',
      type: 'boolean',
      group: 'basics',
    },
    {
      name: 'cover',
      type: 'image',
      group: 'media',
      hidden: ({ parent }) => !parent?.displayAsSinglePage,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          return context.parent.displayAsSinglePage && !value ? 'Cover image is required when "Display as Single Page" is true' : true;
        }),
    },
    {
      name: 'slider',
      type: 'array',
      group: 'media',
      hidden: ({ parent }) => !parent?.displayAsSinglePage,
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
      group: 'details',
      hidden: ({ parent }) => !parent?.displayAsSinglePage,
      fields: [
        {
          name: 'it',
          type: 'array',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              return context.parent.displayAsSinglePage && !value ? 'Content in Italian is required when "Display as Single Page" is true' : true;
            }),
          of: [{
            type: 'block',
            lists: [],
            styles: [{ title: 'Testo corrente', value: 'normal' }],
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
                { title: 'Strong', value: 'strong' },
                { title: 'Emphasis', value: 'em' },
              ]
            },
          }],
        },
        {
          name: 'en',
          type: 'array',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              return context.parent.displayAsSinglePage && !value ? 'Content in English is required when "Display as Single Page" is true' : true;
            }),
          of: [{
            type: 'block',
            lists: [],
            styles: [{ title: 'Testo corrente', value: 'normal' }],
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
                { title: 'Strong', value: 'strong' },
                { title: 'Emphasis', value: 'em' },
              ]
            },
          }],
        }
      ],
    },
    {
      name: 'partners',
      type: 'array',
      group: 'details',
      hidden: ({ parent }) => !parent?.displayAsSinglePage,
      of: [
        {
          name: 'partner',
          type: 'file',
        },
      ]
    },
  ],
}