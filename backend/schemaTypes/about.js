export default {
  name: 'about',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'about',
      type: 'array', 
      of: [{type: 'block'}]
    },
  ],
}