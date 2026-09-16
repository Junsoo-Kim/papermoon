'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'

type Slide = {
  slug: string
  title: string
  summary: string | null
  image: string | null
}

export default function HomeCarousel({ slides }: { slides: Slide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selected, setSelected] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    emblaApi.on('init', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('init', onSelect)
    }
  }, [emblaApi, onSelect])

  if (slides.length === 0) {
    return (
      <div className="flex h-[70vh] items-center justify-center bg-neutral-100">
        <p className="text-neutral-500">
          Studio에서 공연을 등록하면 여기에 표시됩니다.
        </p>
      </div>
    )
  }

  return (
    <div className="relative h-[70vh] overflow-hidden bg-neutral-900" ref={emblaRef}>
      <div className="flex h-full">
        {slides.map((slide, i) => (
          <div key={slide.slug} className="relative h-full min-w-0 flex-[0_0_100%]">
            {slide.image && (
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={i === 0}
                className="object-cover opacity-70"
              />
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: selected === i ? 1 : 0,
                y: selected === i ? 0 : 20,
              }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
            >
              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                {slide.title}
              </h1>
              {slide.summary && (
                <p className="mt-4 max-w-xl text-sm text-neutral-200 sm:text-base">
                  {slide.summary}
                </p>
              )}
              <Link
                href={`/performances/${slide.slug}`}
                className="mt-8 border border-white px-6 py-2 text-xs tracking-widest hover:bg-white hover:text-neutral-900"
              >
                자세히 보기
              </Link>
            </motion.div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}번째 슬라이드로 이동`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 w-1.5 rounded-full ${
                selected === i ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
