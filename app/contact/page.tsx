import { instagramUrl } from '../site-config'

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <h1 className="mb-12 font-serif text-3xl italic tracking-wide sm:text-4xl">
        Contact
      </h1>

      <dl className="space-y-8 text-foreground">
        <div>
          <dt className="text-xs tracking-[0.15em] text-muted">EMAIL</dt>
          <dd className="mt-2 text-lg">contact@example.com</dd>
        </div>
        <div>
          <dt className="text-xs tracking-[0.15em] text-muted">INSTAGRAM</dt>
          <dd className="mt-2 text-lg">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-accent"
            >
              @your_theater
            </a>
          </dd>
        </div>
      </dl>
    </main>
  )
}
