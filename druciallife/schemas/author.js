export default {
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
      },
      {
        name: 'profileImage',
        title: 'Profile image',
        type: 'image',
        options: {
          hotspot: false,
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
        name: 'subImage',
        title: 'Sub image',
        type: 'image',
        options: {
          hotspot: false,
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
        name: 'description',
        title: 'Description',
        type: 'string',
      },
      {
        name: 'details',
        title: 'Details',
        type: 'blockContent',
      },
      {
        name: 'bio',
        title: 'Bio',
        type: 'blockContent',
      },
    ],
    preview: {
      select: {
        title: 'name',
        media: 'profileImage',
      },
    },
  }
  