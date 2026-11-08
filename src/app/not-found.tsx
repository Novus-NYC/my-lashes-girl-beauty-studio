import type { Metadata } from "next"
import Link from "next/link"
import { T } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { lashStyles, mapLabel } from "@/lib/menu"
import { ResponsiveMap } from "@/lib/components/LashMap"
import { navLinks } from "@/lib/nav"
import { photos, Loupe } from "@/lib/components/Photo"

export const metadata: Metadata = { title: "Page not found" }

export default function NotFound() {
  const natural = lashStyles[0]
  return (
    <section className="overflow-x-clip bg-m-paper pb-16 pt-10 md:pb-24 md:pt-14">
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
                <Link href={l.href} className="flex min-h-[56px] items-center justify-between font-serif text-[1.6rem] transition-colors hover:text-m-rose">
                  <T t={l.label} />
                  <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative md:col-span-6 md:pt-16">
          <div aria-hidden className="absolute -right-[30vw] top-0 aspect-square w-[110%] rounded-full bg-m-nude md:-right-24 md:w-[115%]" />
          <div className="relative pt-10 text-m-ink md:pt-20">
            <ResponsiveMap lengths={natural.lengths} density="natural" label={mapLabel(natural)} corners={{ inner: copy.common.inner, outer: copy.common.outer }} />
            <p className="anno mt-4 text-m-ink">
              <T t={copy.common.illustrativeShort} />
            </p>
            <div className="mt-8 w-[48vw] max-w-[192px] rounded-full border border-m-ink/30 p-2 md:ml-[8%] md:mt-10">
              <Loupe photo={photos.naturalTrio} alt="Close-up of an eye with a soft, natural lash set" cx={285} cy={88} d={176} sizes="(max-width: 768px) 46vw, 176px" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
