import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const builder = imageUrlBuilder(client)

/**
 * Build a Sanity image URL with optional transformations
 * @param source - Sanity image source
 * @returns ImageUrlBuilder for chaining transformations
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Get optimized image URL for product cards
 * @param source - Sanity image source
 * @param width - Desired width (default: 400)
 */
export function getProductCardImageUrl(source: SanityImageSource, width = 400) {
  return urlFor(source)
    .width(width)
    .height(Math.round(width * 1.25)) // 4:5 aspect ratio
    .fit('crop')
    .auto('format')
    .url()
}

/**
 * Get optimized image URL for product gallery
 * @param source - Sanity image source
 * @param width - Desired width (default: 800)
 */
export function getProductGalleryImageUrl(source: SanityImageSource, width = 800) {
  return urlFor(source)
    .width(width)
    .auto('format')
    .quality(90)
    .url()
}

/**
 * Get optimized image URL for hero sections
 * @param source - Sanity image source
 */
export function getHeroImageUrl(source: SanityImageSource) {
  return urlFor(source)
    .width(1920)
    .height(1080)
    .fit('crop')
    .auto('format')
    .quality(85)
    .url()
}

/**
 * Get blur placeholder data URL
 * @param source - Sanity image source
 */
export function getBlurDataUrl(source: SanityImageSource) {
  return urlFor(source)
    .width(20)
    .height(20)
    .blur(10)
    .auto('format')
    .url()
}

