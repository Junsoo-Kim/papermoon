import { instagramUrl } from '../site-config'

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-10 text-3xl font-semibold tracking-tight">CONTACT</h1>

      <dl className="space-y-6 text-neutral-700">
        <div>
          <dt className="text-sm font-medium text-neutral-500">Email</dt>
          <dd className="mt-1">contact@example.com</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-neutral-500">Instagram</dt>
          <dd className="mt-1">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-neutral-900"
            >
              @your_theater
            </a>
          </dd>
        </div>
      </dl>
    </main>
  )
}
