import Image from 'next/image'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import type { SanityImage } from '@/sanity/types'

export const revalidate = 60

type Artist = {
  _id: string
  name: string
  role: string | null
  photo: SanityImage | null
  bio: string | null
}

const query = `*[_type == "artist"] | order(name asc){
  _id, name, role, photo, bio
}`

export default async function ArtistsPage() {
  const artists: Artist[] = await client.fetch(query)

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-10 text-3xl font-semibold tracking-tight">ARTIST</h1>

      {artists.length === 0 ? (
        <p className="text-neutral-500">등록된 단원이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {artists.map((artist) => (
            <div key={artist._id}>
              <div className="relative aspect-square overflow-hidden rounded-full bg-neutral-100">
                {artist.photo && (
                  <Image
                    src={urlFor(artist.photo).width(400).height(400).url()}
                    alt={artist.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <h2 className="mt-4 text-center text-base font-medium">
                {artist.name}
              </h2>
              {artist.role && (
                <p className="text-center text-sm text-neutral-500">
                  {artist.role}
                </p>
              )}
              {artist.bio && (
                <p className="mt-2 text-center text-sm text-neutral-600">
                  {artist.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
