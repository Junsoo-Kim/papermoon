'use client'

import { usePathname } from 'next/navigation'
import { siteName, foundedYear } from './site-config'

export default function Footer() {
  const pathname = usePathname()

  // /studio 안에서는 사이트 푸터를 숨긴다 (Sanity Studio 자체 UI 사용).
  if (pathname?.startsWith('/studio')) return null

  return (
    <footer className="bg-white py-6 text-center">
      <p className="font-serif text-xs font-bold tracking-[0.15em] text-[#28324e]">
        {siteName}
      </p>
      <p className="mt-1 font-serif text-xs font-bold tracking-[0.15em] text-[#28324e]">
        SINCE.{foundedYear}
      </p>
    </footer>
  )
}
