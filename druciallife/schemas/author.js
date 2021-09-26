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
          hotspot: true,
        },
      },
      {
        name: 'profileAlt',
        title: 'Profile Image Alt Text',
        type: 'string',
      },
      {
        name: 'subImage',
        title: 'Sub image',
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
  