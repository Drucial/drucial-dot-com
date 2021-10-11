export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'postNumber',
      title: 'Post Number',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption'
        },
        {
          name: 'attribution',
          type: 'string',
          title: 'Attribution',
        }
      ]
    },
    {
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
    },
    {
      name: 'headerImage',
      title: 'Header image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption'
        },
        {
          name: 'attribution',
          type: 'string',
          title: 'Attribution',
        }
      ]
    },
    {
      name: 'headerAlt',
      title: 'Header Image Alt',
      type: 'string',
    },
    {
      name: 'publishedOn',
      title: 'Published On',
      type: 'date',
      options: {
        dateFormat: 'MM.DD.YYYY',
      }
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
    },
  ],
  orderings: [
    {
      title: 'Post number, New',
      name: 'postNumberDesc',
      by: [
        {field: 'postNumber', direction: 'desc'}
      ]
    }
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
}
