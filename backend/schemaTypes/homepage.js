export default {
  name: 'homepage',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'whatsOn',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'event'},
            {type: 'festival'},
          ],
        }
      ],
    },
  ],
}