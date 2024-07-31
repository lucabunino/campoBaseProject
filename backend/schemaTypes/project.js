import { orderRankField } from '@sanity/orderable-document-list'
import { ProjectsIcon } from '@sanity/icons'


export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    orderRankField({ type: "festival" }),
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
      ]
    },
  ],
}
