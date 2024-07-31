export default {
  name: 'about',
  type: 'document',
  fieldsets: [
    {
      name: 'place',
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
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
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
          of: [
            {
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
            }
          ]
        },
        {
          name: 'en',
          type: 'array',
          validation: (Rule) => Rule.required(),
          of: [
            {
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
            }
          ]
        },
        
      ]
    },
    {
      name: 'adress',
      type: 'string',
      fieldset: 'place',
    },
    {
      name: 'googleMaps',
      type: 'url',
      fieldset: 'place',
    },
    {
      name: 'email',
      type: 'string',
    },
  ],
}