'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { instagramUrl, siteName } from './site-config'

const links = [
  { href: '/performances', label: 'PERFORMANCES' },
  { href: '/about', label: 'ABOUT', exact: true },
  { href: '/artists', label: 'ARTIST' },
  { href: '/contact', label: 'CONTACT' },
]

export default function NavBar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // /studio 안에서는 사이트 네비게이션을 숨긴다 (Sanity Studio 자체 UI 사용).
  if (pathname?.startsWith('/studio')) return null

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-2xl tracking-wide text-foreground"
        >
          {siteName}
        </Link>

        <ul className="hidden items-center gap-7 text-xs tracking-[0.15em] text-muted md:flex">
          {links.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname?.startsWith(link.href)

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    isActive
                      ? 'text-foreground'
                      : 'transition-colors hover:text-muted-foreground'
                  }
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
          <li>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-muted-foreground"
            >
              INSTAGRAM
            </a>
          </li>
        </ul>

        <button
          type="button"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-5 bg-foreground transition-transform ${
              open ? 'translate-y-[3.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-px w-5 bg-foreground transition-transform ${
              open ? '-translate-y-[3.5px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-border px-6 pb-6 pt-2 text-sm tracking-[0.15em] text-muted md:hidden">
          {links.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname?.startsWith(link.href)

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 ${
                    isActive ? 'text-foreground' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
          <li>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3"
            >
              INSTAGRAM
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}
