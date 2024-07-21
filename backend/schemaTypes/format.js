import {TagsIcon} from '@sanity/icons'

export default {
  name: 'format',
  title: 'Formats',
  type: 'document',
  icon: TagsIcon,
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
  ],
}
