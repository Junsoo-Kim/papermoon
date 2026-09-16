import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/client'
import type { PortableTextContent } from '@/sanity/types'

export const revalidate = 60

type About = {
  title: string | null
  body: PortableTextContent | null
}

const query = `*[_type == "about"][0]{ title, body }`

export default async function AboutPage() {
  const about: About | null = await client.fetch(query)

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <h1 className="font-serif text-3xl italic tracking-wide sm:text-4xl">
        {about?.title || 'About'}
      </h1>

      {about?.body && (
        <div className="prose prose-invert mt-10 max-w-none">
          <PortableText value={about.body} />
        </div>
      )}

      {!about && (
        <p className="mt-8 text-muted">
          아직 등록된 단체 소개가 없습니다. Studio에서 &apos;단체 소개&apos;
          문서를 작성해 주세요.
        </p>
      )}

      <Link
        href="/about/english"
        className="mt-14 inline-block text-xs tracking-[0.15em] text-muted underline underline-offset-4 transition-colors hover:text-foreground"
      >
        ABOUT_ENGLISH →
      </Link>
    </main>
  )
}
