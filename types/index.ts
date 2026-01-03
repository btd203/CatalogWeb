// TypeScript interfaces for the Product Catalog

import type { PortableTextBlock } from '@portabletext/types'

// Sanity Image type
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

// Product Image with resolved URL
export interface ProductImage {
  url: string
  alt?: string
}

// Category interface
export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  image?: SanityImage
}

// Product Status
export type ProductStatus = 'IN_STOCK' | 'OUT_OF_STOCK' | 'CALL_FOR_PRICE'

// Product Specification
export interface ProductSpecification {
  key: string
  value: string
}

// Product interface (matching .cursorrules spec)
export interface Product {
  _id: string
  title: string
  slug: {
    current: string
  }
  images: ProductImage[]
  price: number // AUD
  compareAtPrice?: number
  status: ProductStatus
  shortDescription: string // Plain text
  description: PortableTextBlock[] // Portable Text (Rich text)
  specifications: ProductSpecification[]
  category: {
    _id: string
    title: string
    slug: {
      current: string
    }
  }
}

// Product Card type (subset for listing pages)
export interface ProductCard {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage: ProductImage
  price: number
  compareAtPrice?: number
  status: ProductStatus
  shortDescription: string
  category: {
    title: string
    slug: {
      current: string
    }
  }
}

// Contact Form Data
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
  productId?: string
}

