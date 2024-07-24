import {orderRankField} from '@sanity/orderable-document-list'

export default {
  name: 'format',
  title: 'Format',
  type: 'document',
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
  ],
}
