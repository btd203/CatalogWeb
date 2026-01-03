import { groq } from 'next-sanity'

// Base image projection
const imageProjection = `{
  "url": asset->url,
  "alt": alt
}`

// Category fields projection
const categoryProjection = `{
  _id,
  title,
  "slug": slug.current
}`

// ============================================
// CATEGORY QUERIES
// ============================================

/**
 * Get all categories ordered by display order
 */
export const getAllCategoriesQuery = groq`
  *[_type == "category"] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "image": image ${imageProjection}
  }
`

/**
 * Get single category by slug
 */
export const getCategoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "image": image ${imageProjection}
  }
`

// ============================================
// PRODUCT QUERIES
// ============================================

/**
 * Get all products with basic info for listing
 */
export const getAllProductsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "mainImage": images[0] ${imageProjection},
    price,
    compareAtPrice,
    status,
    shortDescription,
    "category": category-> ${categoryProjection}
  }
`

/**
 * Get products by category slug
 */
export const getProductsByCategoryQuery = groq`
  *[_type == "product" && category->slug.current == $categorySlug] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "mainImage": images[0] ${imageProjection},
    price,
    compareAtPrice,
    status,
    shortDescription,
    "category": category-> ${categoryProjection}
  }
`

/**
 * Get featured products (first 8, in stock)
 */
export const getFeaturedProductsQuery = groq`
  *[_type == "product" && status == "IN_STOCK"][0...8] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "mainImage": images[0] ${imageProjection},
    price,
    compareAtPrice,
    status,
    shortDescription,
    "category": category-> ${categoryProjection}
  }
`

/**
 * Get single product by slug (full details)
 */
export const getProductBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "images": images[] ${imageProjection},
    price,
    compareAtPrice,
    status,
    shortDescription,
    description,
    "specifications": specifications[] {
      "key": key,
      "value": value
    },
    "category": category-> ${categoryProjection}
  }
`

/**
 * Get all product slugs for static generation
 */
export const getAllProductSlugsQuery = groq`
  *[_type == "product" && defined(slug.current)] {
    "slug": slug.current
  }
`

/**
 * Get related products (same category, excluding current)
 */
export const getRelatedProductsQuery = groq`
  *[_type == "product" && category._ref == $categoryId && _id != $currentId][0...4] {
    _id,
    title,
    "slug": slug.current,
    "mainImage": images[0] ${imageProjection},
    price,
    compareAtPrice,
    status,
    shortDescription,
    "category": category-> ${categoryProjection}
  }
`

/**
 * Search products by title or description
 */
export const searchProductsQuery = groq`
  *[_type == "product" && (
    title match $searchTerm ||
    shortDescription match $searchTerm
  )] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "mainImage": images[0] ${imageProjection},
    price,
    compareAtPrice,
    status,
    shortDescription,
    "category": category-> ${categoryProjection}
  }
`

// ============================================
// AGGREGATION QUERIES
// ============================================

/**
 * Get product count by category
 */
export const getProductCountByCategoryQuery = groq`
  *[_type == "category"] {
    _id,
    title,
    "slug": slug.current,
    "productCount": count(*[_type == "product" && references(^._id)])
  }
`

/**
 * Get price range for filtering
 */
export const getPriceRangeQuery = groq`
  {
    "minPrice": math::min(*[_type == "product"].price),
    "maxPrice": math::max(*[_type == "product"].price)
  }
`

