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
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        {about?.title || 'ABOUT'}
      </h1>

      {about?.body && (
        <div className="prose prose-neutral mt-8 max-w-none">
          <PortableText value={about.body} />
        </div>
      )}

      {!about && (
        <p className="mt-8 text-neutral-500">
          아직 등록된 단체 소개가 없습니다. Studio에서 &apos;단체 소개&apos;
          문서를 작성해 주세요.
        </p>
      )}

      <Link
        href="/about/english"
        className="mt-12 inline-block text-sm tracking-widest text-neutral-500 underline underline-offset-4 hover:text-neutral-900"
      >
        ABOUT_ENGLISH →
      </Link>
    </main>
  )
}
