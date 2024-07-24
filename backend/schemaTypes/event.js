import {SparkleIcon} from '@sanity/icons'

export default {
  name: 'event',
  title: 'Events',
  type: 'document',
  icon: SparkleIcon,
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
      name: 'start',
      type: 'date',
      fieldset: 'date',
    },
    {
      name: 'end',
      type: 'date',
      fieldset: 'date',
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
      start: 'start',
      end: 'end',
      cover: 'cover',
    },
    prepare(selection) {
      const {title, start, end, cover} = selection;
      return {
        title: title,
        subtitle: `${start ? start : ''}${end ? ' - ' + end : ''}`,
        media: cover,
      }
    }
  },
}