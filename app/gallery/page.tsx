import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import type { SanityImage } from '@/sanity/types'
import GalleryGrid from './GalleryGrid'

export const revalidate = 60

type PerformanceImages = {
  title: string
  mainImage: SanityImage | null
  gallery: SanityImage[] | null
}

// MEMORY(갤러리) 역할: 모든 공연의 대표 사진 + 갤러리 사진을 모아서 보여준다.
const query = `*[_type == "performance"] | order(date desc){
  title, mainImage, gallery
}`

export default async function GalleryPage() {
  const performances: PerformanceImages[] = await client.fetch(query)

  const items = performances.flatMap((p) => {
    const images = [p.mainImage, ...(p.gallery || [])].filter(
      (img): img is SanityImage => Boolean(img),
    )
    return images.map((img) => ({
      src: urlFor(img).width(1200).url(),
      alt: p.title,
    }))
  })

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-10 text-3xl font-semibold tracking-tight">MEMORY</h1>

      {items.length === 0 ? (
        <p className="text-neutral-500">등록된 사진이 없습니다.</p>
      ) : (
        <GalleryGrid items={items} />
      )}
    </main>
  )
}
