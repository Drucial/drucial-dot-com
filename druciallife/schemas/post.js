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
    },
    {
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
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
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}