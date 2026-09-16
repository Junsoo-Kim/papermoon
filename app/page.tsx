import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import type { SanityImage } from '@/sanity/types'
import HomeCarousel from './HomeCarousel'

export const revalidate = 60

const query = `*[_type == "performance"] | order(date desc)[0...5]{
  title, "slug": slug.current, summary, mainImage
}`

export default async function Home() {
  const performances: {
    title: string
    slug: string
    summary: string | null
    mainImage: SanityImage | null
  }[] = await client.fetch(query)

  const slides = performances.map((p) => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    image: p.mainImage ? urlFor(p.mainImage).width(1600).url() : null,
  }))

  return (
    <main>
      <HomeCarousel slides={slides} />
    </main>
  )
}
