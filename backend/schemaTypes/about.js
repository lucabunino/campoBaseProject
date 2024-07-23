export default {
  name: 'about',
  type: 'document',
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
      name: 'content',
      type: 'array', 
      of: [
        {
          type: 'block',
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
              ]
            },
        }
      ]
    },
  ],
}