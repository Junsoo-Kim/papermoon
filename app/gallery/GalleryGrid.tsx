'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

type GalleryItem = {
  src: string
  alt: string
}

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState(-1)

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className="relative aspect-square overflow-hidden bg-neutral-900"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={items.map((item) => ({ src: item.src, alt: item.alt }))}
      />
    </>
  )
}
