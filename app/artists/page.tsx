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
    <main className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <h1 className="mb-12 font-serif text-3xl italic tracking-wide sm:text-4xl">
        Artist
      </h1>

      {artists.length === 0 ? (
        <p className="text-muted">등록된 단원이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3">
          {artists.map((artist) => (
            <div key={artist._id}>
              <div className="relative aspect-square overflow-hidden rounded-full bg-neutral-900">
                {artist.photo && (
                  <Image
                    src={urlFor(artist.photo).width(400).height(400).url()}
                    alt={artist.name}
                    fill
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                )}
              </div>
              <h2 className="mt-5 text-center font-serif text-lg italic">
                {artist.name}
              </h2>
              {artist.role && (
                <p className="text-center text-xs tracking-wide text-muted">
                  {artist.role}
                </p>
              )}
              {artist.bio && (
                <p className="mt-2 text-center text-sm text-muted-foreground">
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
