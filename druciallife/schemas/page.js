export default {
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
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
        name: 'body',
        title: 'Body',
        type: 'blockContent',
      },
      {
        name: 'sideHeading',
        title: 'Sidebar Heading',
        type: 'string',
      },
      {
        name: 'sideBar',
        title: 'Sidebar Content',
        type: 'blockContent',
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'string',
      },
    ],
    preview: {
      select: {
        title: 'title',
        media: 'mainImage',
      },
    },
  }
  