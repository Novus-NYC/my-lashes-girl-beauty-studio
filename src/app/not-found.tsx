import type { Metadata } from "next"
import Link from "next/link"
import { T } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { lashStyles, mapLabel } from "@/lib/menu"
import { ResponsiveMap } from "@/lib/components/LashMap"
import { navLinks } from "@/lib/nav"

export const metadata: Metadata = { title: "Page not found" }

export default function NotFound() {
  const natural = lashStyles[0]
  return (
    <section className="overflow-x-clip bg-m-paper pb-24 pt-12 md:pb-32 md:pt-20">
      <div className="container-site grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6">
          <p className="anno text-m-mute">404</p>
          <h1 className="display d-1 mt-6 max-w-[11ch]">
            <T t={copy.notFound.title} />
          </h1>
          <p className="mt-8 max-w-[38ch] text-[1.15rem]">
            <T t={copy.notFound.body} />
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/" className="btn-primary">
              <T t={copy.notFound.home} />
            </Link>
          </div>
          <ul className="mt-10 border-t border-m-rule">
            {navLinks.map((l) => (
              <li key={l.href} className="border-b border-m-rule">
                <Link href={l.href} className="flex min-h-[56px] items-center justify-between font-serif text-[1.6rem] transition-colors hover:text-m-clay">
                  <T t={l.label} />
                  <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative md:col-span-6 md:pt-16">
          <div aria-hidden className="absolute -right-[30vw] top-0 aspect-square w-[110%] rounded-full bg-m-nude md:-right-24 md:w-[115%]" />
          <div className="relative pt-10 text-m-ink md:pt-24">
            <ResponsiveMap lengths={natural.lengths} density="natural" label={mapLabel(natural)} corners={{ inner: copy.common.inner, outer: copy.common.outer }} />
            <p className="anno mt-4 text-m-ink">
              <T t={copy.common.illustrativeShort} />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
