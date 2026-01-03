import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'product-catalog',
  title: 'Product Catalog',
  
  projectId,
  dataset,
  
  basePath: '/studio',
  
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Products section
            S.listItem()
              .title('Products')
              .schemaType('product')
              .child(
                S.documentTypeList('product')
                  .title('All Products')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),
            
            // Categories section
            S.listItem()
              .title('Categories')
              .schemaType('category')
              .child(
                S.documentTypeList('category')
                  .title('All Categories')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
            
            S.divider(),
            
            // All documents
            ...S.documentTypeListItems().filter(
              (listItem) => !['product', 'category'].includes(listItem.getId() || '')
            ),
          ]),
    }),
    visionTool({
      defaultApiVersion: '2024-01-01',
      defaultDataset: dataset,
    }),
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  // Customize document actions
  document: {
    // For products and categories, show live preview
    productionUrl: async (prev, context) => {
      const { document } = context
      
      if (document._type === 'product') {
        const slug = (document.slug as { current?: string })?.current
        if (slug) {
          return `${process.env.NEXT_PUBLIC_SITE_URL || ''}/products/${slug}`
        }
      }
      
      return prev
    },
  },
})

