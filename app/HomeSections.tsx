import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import type { SanityImage } from '@/sanity/types'

type TextBlockSection = {
  _type: 'homeTextBlock'
  _key: string
  text: string
}

type ImageGridSection = {
  _type: 'homeImageGrid'
  _key: string
  columns: 2 | 3 | 4 | null
  images: SanityImage[]
}

type Section = TextBlockSection | ImageGridSection

const gridColsClass: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 md:grid-cols-4',
}

export default function HomeSections({ sections }: { sections: Section[] }) {
  if (sections.length === 0) return null

  return (
    <div>
      {sections.map((section) => {
        if (section._type === 'homeTextBlock') {
          return (
            <div
              key={section._key}
              className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-24"
            >
              <p className="font-serif text-2xl font-bold tracking-[0.3em] text-foreground sm:text-4xl sm:tracking-[0.4em]">
                {section.text}
              </p>
            </div>
          )
        }

        const columns = section.columns || 3
        const images = section.images || []

        if (images.length === 0) return null

        return (
          <div
            key={section._key}
            className={`grid grid-cols-2 gap-1 ${gridColsClass[columns]}`}
          >
            {images.map((img, i) => (
              <div key={i} className="relative aspect-square">
                <Image
                  src={urlFor(img).width(800).height(800).url()}
                  alt=""
                  fill
                  sizes={`(min-width: 768px) ${Math.round(100 / columns)}vw, 50vw`}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
