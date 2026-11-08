import type { Metadata } from "next"
import { T, Other } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { styleById, mapLabel } from "@/lib/menu"
import Image from "next/image"
import { photos, Half } from "@/lib/components/Photo"
import LashMap from "@/lib/components/LashMap"
import Reveal from "@/lib/components/Reveal"
import Reviews from "@/lib/components/Reviews"
import EndCta from "@/lib/components/EndCta"

export const metadata: Metadata = {
  title: "About the studio",
  description:
    "A woman-owned, Asian-owned lash studio on the 12th floor of 274 Madison Avenue. 8 years of lash artistry, custom sets for each eye shape, mobile service available.",
  alternates: { canonical: "/about" },
}

// The artist is intentionally not named. ClassPass reviews mention "Chrissy": confirm her name
// and whether she wants to be featured before adding it.

export default function AboutPage() {
  const natural = styleById("natural")
  return (
    <>
      {/* Hero (paper): type left; the chair photo breaking out of a nude block that bleeds right */}
      <section className="overflow-x-clip bg-m-paper pb-20 pt-10 md:pb-28 md:pt-16">
        <div className="container-site grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="relative z-10 md:col-span-7">
            <p className="anno text-m-mute">
              <T t={copy.nav.about} /> · <Other t={copy.nav.about} />
            </p>
            <h1 className="display d-hero mt-6 max-w-[9ch]">
              <T t={copy.about.title} />
            </h1>
            <p className="mt-10 max-w-[36ch] text-[1.3rem] leading-[1.5]">
              <T t={copy.about.lead} />
            </p>
            <p className="mt-6 max-w-[48ch] text-m-mute">
              <T t={copy.about.body} />
            </p>
          </div>

          <div className="relative md:col-span-5 md:pt-10">
            <div aria-hidden className="absolute -right-[50vw] bottom-16 left-[22%] top-0 bg-m-nude md:top-0" />
            <figure className="relative w-[78%] max-w-[340px]">
              <div className="relative">
                <div className="zoom-hover overflow-hidden border border-m-rule">
                  <Image
                    src={photos.clientChair.src}
                    alt="A client resting on the lash bed after her set, with full, soft lash extensions"
                    width={photos.clientChair.width}
                    height={photos.clientChair.height}
                    priority
                    sizes="(max-width: 768px) 78vw, 340px"
                    className="photo block h-auto w-full"
                  />
                </div>
                <p className="anno absolute -bottom-6 -right-[22%] z-10 max-w-[18ch] bg-m-ink px-4 py-3 text-m-paper md:-right-[30%]">
                  <T t={copy.about.tag} />
                </p>
              </div>
              <figcaption className="anno mt-12 text-m-ink">
                <T t={copy.about.chairCaption} />
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* The studio's own words (clay) */}
      <section className="on-clay bg-m-clay py-20 text-m-paper md:py-32" aria-labelledby="quote-title">
        <div className="container-site grid gap-10 md:grid-cols-12">
          <h2 id="quote-title" className="sr-only">
            <T t={copy.about.quoteSource} />
          </h2>
          <Reveal as="figure" className="md:col-span-10">
            <blockquote>
              <p className="display d-1">
                &ldquo;<T t={copy.about.quote} />&rdquo;
              </p>
            </blockquote>
            <figcaption className="anno mt-8">
              <T t={copy.about.quoteSource} />
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* Spec sheet (paper) */}
      <section className="bg-m-paper py-20 md:py-28" aria-labelledby="spec-title">
        <div className="container-site grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-4">
            <h2 id="spec-title" className="display d-2 max-w-[10ch]">
              <T t={copy.about.specTitle} />
            </h2>
            <div className="mt-10 max-w-[300px] text-m-ink">
              <LashMap lengths={natural.lengths} density="natural" size="sm" label={mapLabel(natural)} />
              <p className="anno mt-3 text-m-mute">
                <T t={copy.common.illustrativeShort} />
              </p>
            </div>
          </Reveal>
          <dl className="border-t border-m-ink md:col-span-7 md:col-start-6">
            {copy.about.facts.map((f, i) => (
              <Reveal index={i} key={f.k.en} className="grid gap-1 border-b border-m-rule py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="anno pt-2 text-m-mute">
                  <T t={f.k} />
                </dt>
                <dd className="font-serif text-[1.6rem] leading-snug md:text-[2rem]">
                  <T t={f.v} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Work (ink): two angles of one set, offset */}
      <section className="on-ink bg-m-ink py-20 text-m-paper md:py-28">
        <div className="container-site grid items-center gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <p className="display d-2 max-w-[14ch]">
              <T t={copy.home.processLead} />
            </p>
            <p className="mt-6 max-w-[36ch] text-m-nude">
              <T t={copy.common.mobile} />
            </p>
          </Reveal>
          <Reveal index={1} as="figure" className="md:col-span-7">
            <div className="grid grid-cols-12 gap-3">
              <div className="zoom-hover col-span-8">
                <Half photo={photos.beforeAfter2} alt="A close-up of one eye with wispy, defined lash extensions" y0={0} y1={318} sizes="(max-width: 768px) 66vw, 482px" />
              </div>
              <div className="zoom-hover col-span-7 col-start-6 -mt-10 outline outline-[10px] outline-m-ink md:-mt-20">
                <Half photo={photos.beforeAfter2} alt="The same set from a slightly different angle" y0={322} y1={640} sizes="(max-width: 768px) 58vw, 420px" />
              </div>
            </div>
            <figcaption className="anno mt-4 text-m-nude">
              <T t={copy.about.baCaption} />
            </figcaption>
          </Reveal>
        </div>
      </section>

      <Reviews />

      <EndCta tone="clay" title={copy.about.endTitle} link={{ href: "/styles", label: copy.home.seeStyles }} />
    </>
  )
}
