import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import type { SanityImage } from '@/sanity/types'
import HomeCarousel from './HomeCarousel'
import HomeSections from './HomeSections'

export const revalidate = 60

const query = `{
  "performances": *[_type == "performance"] | order(date desc)[0...5]{
    mainImage
  },
  "home": *[_type == "home"][0]{
    "sections": sections[_type in ["homeTextBlock", "homeImageGrid"]]{
      _type, _key, text, columns, images
    }
  }
}`

type HomeSection =
  | { _type: 'homeTextBlock'; _key: string; text: string }
  | {
      _type: 'homeImageGrid'
      _key: string
      columns: 2 | 3 | 4 | null
      images: SanityImage[]
    }

type HomeData = {
  performances: {
    mainImage: SanityImage | null
  }[]
  home: {
    sections: HomeSection[]
  } | null
}

export default async function Home() {
  const { performances, home }: HomeData = await client.fetch(query)

  const slides = performances.map((p) => ({
    image: p.mainImage ? urlFor(p.mainImage).width(1600).url() : null,
  }))

  return (
    <main>
      <HomeCarousel slides={slides} />
      <HomeSections sections={home?.sections || []} />
    </main>
  )
}
