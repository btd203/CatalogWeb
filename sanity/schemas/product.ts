import { defineType, defineField, defineArrayMember } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'main', title: 'Main Info', default: true },
    { name: 'media', title: 'Media' },
    { name: 'pricing', title: 'Pricing' },
    { name: 'details', title: 'Details' },
  ],
  fields: [
    // Main Info
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      group: 'main',
      validation: (Rule) => Rule.required().min(3).max(200),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'main',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'main',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Stock Status',
      type: 'string',
      group: 'main',
      options: {
        list: [
          { title: 'In Stock', value: 'IN_STOCK' },
          { title: 'Out of Stock', value: 'OUT_OF_STOCK' },
          { title: 'Call for Price', value: 'CALL_FOR_PRICE' },
        ],
        layout: 'radio',
      },
      initialValue: 'IN_STOCK',
      validation: (Rule) => Rule.required(),
    }),

    // Media
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      group: 'media',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description: 'Important for SEO and accessibility',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(10),
    }),

    // Pricing
    defineField({
      name: 'price',
      title: 'Price (AUD)',
      type: 'number',
      group: 'pricing',
      validation: (Rule) => Rule.required().min(0).precision(2),
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare at Price (AUD)',
      type: 'number',
      group: 'pricing',
      description: 'Original price for showing discount (optional)',
      validation: (Rule) => Rule.min(0).precision(2),
    }),

    // Details
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      group: 'details',
      rows: 3,
      description: 'Brief description for product cards (max 200 characters)',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      group: 'details',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      group: 'details',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'specification',
          fields: [
            defineField({
              name: 'key',
              title: 'Specification Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'key',
              subtitle: 'value',
            },
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Price Low to High',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }],
    },
    {
      title: 'Price High to Low',
      name: 'priceDesc',
      by: [{ field: 'price', direction: 'desc' }],
    },
    {
      title: 'Newest First',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      price: 'price',
      status: 'status',
      category: 'category.title',
    },
    prepare({ title, media, price, status, category }) {
      const statusLabel = {
        IN_STOCK: '✅',
        OUT_OF_STOCK: '❌',
        CALL_FOR_PRICE: '📞',
      }[status as string] || ''
      
      return {
        title: `${statusLabel} ${title}`,
        subtitle: `$${price?.toFixed(2) || '0.00'} AUD${category ? ` • ${category}` : ''}`,
        media,
      }
    },
  },
})

