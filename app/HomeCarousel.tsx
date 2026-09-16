'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { siteName } from './site-config'

type Slide = {
  image: string | null
}

export default function HomeCarousel({ slides }: { slides: Slide[] }) {
  const [autoplay] = useState(() =>
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  )
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, watchDrag: false },
    [autoplay],
  )
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
      <div className="flex h-[70vh] min-h-[420px] items-center justify-center bg-background">
        <p className="font-serif text-lg text-muted">
          Studio에서 공연을 등록하면 여기에 표시됩니다.
        </p>
      </div>
    )
  }

  return (
    <div
      className="relative h-[85vh] min-h-[520px] overflow-hidden bg-background"
      ref={emblaRef}
    >
      <div className="flex h-full">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="relative h-full min-w-0 flex-[0_0_100%]"
          >
            {slide.image && (
              <Image
                src={slide.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* 어두운 스크림: 사진 밝기는 유지하면서 위 텍스트 가독성 확보 */}
      <div className="pointer-events-none absolute inset-0 bg-black/35" />

      {/* 고정 텍스트: 사진만 넘어가고 이 텍스트는 그대로 유지된다 */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center text-white">
        <h1 className="font-serif text-4xl italic tracking-wide sm:text-6xl">
          {siteName}
        </h1>
      </div>

      {/* 하단 중앙 장식 세로선 */}
      <div className="pointer-events-none absolute bottom-10 left-1/2 hidden h-16 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/50 to-transparent sm:block" />

      <button
        type="button"
        onClick={() => {
          emblaApi?.scrollPrev()
          autoplay.reset()
        }}
        className="group absolute left-4 top-1/2 z-10 flex -translate-y-1/2 items-center gap-3 sm:left-8"
      >
        <span className="h-px w-8 bg-white/50 transition-colors group-hover:bg-white sm:w-12" />
        <span className="text-xs tracking-[0.25em] text-white/80 transition-colors group-hover:text-white">
          PREV
        </span>
      </button>
      <button
        type="button"
        onClick={() => {
          emblaApi?.scrollNext()
          autoplay.reset()
        }}
        className="group absolute right-4 top-1/2 z-10 flex -translate-y-1/2 items-center gap-3 sm:right-8"
      >
        <span className="text-xs tracking-[0.25em] text-white/80 transition-colors group-hover:text-white">
          NEXT
        </span>
        <span className="h-px w-8 bg-white/50 transition-colors group-hover:bg-white sm:w-12" />
      </button>

      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}번째 슬라이드로 이동`}
              onClick={() => {
                emblaApi?.scrollTo(i)
                autoplay.reset()
              }}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                selected === i ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
