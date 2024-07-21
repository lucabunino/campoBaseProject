export default {
  name: 'seo',
  type: 'document',
  fieldsets: [

  ],
  fields: [
    {
      name: 'SEOTitle',
      type: 'string',
    },
    {
      name: 'SEODescription',
      type: 'text',
      rows: 5,
    },
    {
      name: 'SEOImage',
      type: 'image',
    },
  ],
  preview: {
    select: {
      title: 'SEOTitle',
    }
  }
}