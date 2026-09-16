import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import type { SanityImage } from '@/sanity/types'

export const revalidate = 60

type Performance = {
  title: string
  slug: { current: string }
  date: string | null
  venue: string | null
  summary: string | null
  mainImage: SanityImage | null
}

const query = `*[_type == "performance"] | order(date desc){
  title, slug, date, venue, summary, mainImage
}`

export default async function PerformancesPage() {
  const performances: Performance[] = await client.fetch(query)

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-10 text-3xl font-semibold tracking-tight">공연</h1>

      {performances.length === 0 ? (
        <p className="text-neutral-500">등록된 공연이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {performances.map((p) => (
            <Link
              key={p.slug.current}
              href={`/performances/${p.slug.current}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                {p.mainImage && (
                  <Image
                    src={urlFor(p.mainImage).width(800).height(1000).url()}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <h2 className="mt-4 text-lg font-medium">{p.title}</h2>
              {p.date && (
                <p className="text-sm text-neutral-500">
                  {new Date(p.date).toLocaleDateString('ko-KR')}
                  {p.venue ? ` · ${p.venue}` : ''}
                </p>
              )}
              {p.summary && (
                <p className="mt-1 text-sm text-neutral-600">{p.summary}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
