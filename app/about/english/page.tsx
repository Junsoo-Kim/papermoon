import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/client'
import type { PortableTextContent } from '@/sanity/types'

export const revalidate = 60

type AboutEnglish = {
  bodyEn: PortableTextContent | null
}

const query = `*[_type == "about"][0]{ bodyEn }`

export default async function AboutEnglishPage() {
  const about: AboutEnglish | null = await client.fetch(query)

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <h1 className="font-serif text-3xl italic tracking-wide sm:text-4xl">
        About English
      </h1>

      {about?.bodyEn && (
        <div className="prose prose-invert mt-10 max-w-none">
          <PortableText value={about.bodyEn} />
        </div>
      )}

      {!about?.bodyEn && (
        <p className="mt-8 text-muted">
          English introduction has not been added yet. Add it in the
          &apos;단체 소개&apos; document in Studio.
        </p>
      )}

      <Link
        href="/about"
        className="mt-14 inline-block text-xs tracking-[0.15em] text-muted underline underline-offset-4 transition-colors hover:text-foreground"
      >
        ← ABOUT
      </Link>
    </main>
  )
}
