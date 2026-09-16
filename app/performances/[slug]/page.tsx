import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import type { PortableTextContent, SanityImage } from '@/sanity/types'

export const revalidate = 60

type PerformanceDetail = {
  title: string
  date: string | null
  venue: string | null
  summary: string | null
  body: PortableTextContent | null
  mainImage: SanityImage | null
  gallery: SanityImage[] | null
}

const query = `*[_type == "performance" && slug.current == $slug][0]{
  title, date, venue, summary, body, mainImage, gallery
}`

export default async function PerformanceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const performance: PerformanceDetail | null = await client.fetch(query, {
    slug,
  })

  if (!performance) notFound()

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      {performance.mainImage && (
        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden bg-neutral-100">
          <Image
            src={urlFor(performance.mainImage).width(1600).url()}
            alt={performance.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl font-semibold tracking-tight">
        {performance.title}
      </h1>
      {(performance.date || performance.venue) && (
        <p className="mt-2 text-sm text-neutral-500">
          {performance.date &&
            new Date(performance.date).toLocaleString('ko-KR')}
          {performance.venue ? ` · ${performance.venue}` : ''}
        </p>
      )}
      {performance.summary && (
        <p className="mt-4 text-lg text-neutral-700">{performance.summary}</p>
      )}

      {performance.body && (
        <div className="prose prose-neutral mt-10 max-w-none">
          <PortableText value={performance.body} />
        </div>
      )}

      {performance.gallery && performance.gallery.length > 0 && (
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {performance.gallery.map((img, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden bg-neutral-100"
            >
              <Image
                src={urlFor(img).width(600).height(600).url()}
                alt={`${performance.title} 갤러리 ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
