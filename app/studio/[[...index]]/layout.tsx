import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio | Product Catalog',
  description: 'Content management for Product Catalog',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

