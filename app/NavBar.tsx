'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { instagramUrl } from './site-config'

const links = [
  { href: '/performances', label: 'PERFORMANCES' },
  { href: '/about', label: 'ABOUT', exact: true },
  { href: '/about/english', label: 'ABOUT_ENGLISH' },
  { href: '/artists', label: 'ARTIST' },
  { href: '/gallery', label: 'MEMORY' },
  { href: '/contact', label: 'CONTACT' },
]

export default function NavBar() {
  const pathname = usePathname()

  // /studio 안에서는 사이트 네비게이션을 숨긴다 (Sanity Studio 자체 UI 사용).
  if (pathname?.startsWith('/studio')) return null

  return (
    <header className="border-b border-neutral-200">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-sm font-semibold tracking-widest">
          THEATER
        </Link>
        <ul className="flex flex-wrap gap-6 text-xs tracking-widest text-neutral-600">
          {links.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname?.startsWith(link.href)

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    isActive ? 'text-neutral-900' : 'hover:text-neutral-900'
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
              className="hover:text-neutral-900"
            >
              INSTAGRAM
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
