import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex flex-1 bg-gradient-to-b from-black to-(--gray-0) sm:items-center relative">
      <section className="section section-not-found text-center">

        <h1 className="text-9xl font-bold text-transparent bg-gradient-to-r from-red-500 to-orange-700 bg-clip-text mb-8">
          404!
        </h1>
        
        <h2 className="text-3xl font-semibold">
          Page not found.
        </h2>

      </section>
    </main>
  )
}