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
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">ABOUT_ENGLISH</h1>

      {about?.bodyEn && (
        <div className="prose prose-neutral mt-8 max-w-none">
          <PortableText value={about.bodyEn} />
        </div>
      )}

      {!about?.bodyEn && (
        <p className="mt-8 text-neutral-500">
          English introduction has not been added yet. Add it in the
          &apos;단체 소개&apos; document in Studio.
        </p>
      )}

      <Link
        href="/about"
        className="mt-12 inline-block text-sm tracking-widest text-neutral-500 underline underline-offset-4 hover:text-neutral-900"
      >
        ← ABOUT
      </Link>
    </main>
  )
}
