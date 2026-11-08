import type { Metadata } from "next"
import { T } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import Photo, { photos } from "@/lib/components/Photo"
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
  return (
    <>
      <section className="bg-m-paper pb-20 pt-10 md:pb-28 md:pt-16">
        <div className="container-site grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <p className="anno text-m-mute">
              <T t={copy.nav.about} />
            </p>
            <h1 className="display d-1 mt-6 max-w-[11ch]">
              <T t={copy.about.title} />
            </h1>
            <p className="mt-10 max-w-[38ch] text-[1.25rem] leading-[1.5]">
              <T t={copy.about.lead} />
            </p>
            <p className="mt-6 max-w-[52ch] text-m-mute">
              <T t={copy.about.body} />
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:pt-24">
            <Photo
              photo={photos.clientChair}
              alt="A client resting on the lash bed after her set, with full, soft lash extensions"
              caption={copy.about.chairCaption}
              maxWidth={340}
              sizes="(max-width: 768px) 70vw, 340px"
              className="md:ml-auto"
            />
          </div>
        </div>
      </section>

      {/* Spec sheet (ink) */}
      <section className="on-ink bg-m-ink py-20 text-m-paper md:py-28" aria-labelledby="spec-title">
        <div className="container-site grid gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-4">
            <h2 id="spec-title" className="anno text-m-nude">
              <T t={copy.about.specTitle} />
            </h2>
            <blockquote className="mt-8">
              <p className="display d-2">
                &ldquo;<T t={copy.about.quote} />&rdquo;
              </p>
              <footer className="anno mt-6 text-m-nude">
                <T t={copy.about.quoteSource} />
              </footer>
            </blockquote>
          </Reveal>
          <dl className="md:col-span-7 md:col-start-6">
            {copy.about.facts.map((f, i) => (
              <Reveal
                index={i}
                key={f.k.en}
                className="grid gap-1 border-t border-m-paper/25 py-5 last:border-b sm:grid-cols-[12rem_1fr] sm:gap-6"
              >
                <dt className="anno pt-2 text-m-nude">
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

      {/* Work (paper) */}
      <section className="bg-m-paper py-20 md:py-28">
        <div className="container-site grid items-end gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <Photo
              photo={photos.beforeAfter2}
              alt="Two close-ups of one eye with wispy, defined lash extensions, from slightly different angles"
              caption={copy.about.baCaption}
              maxWidth={420}
              sizes="(max-width: 768px) 85vw, 420px"
            />
          </Reveal>
          <Reveal index={1} className="md:col-span-6 md:col-start-7 md:pb-16">
            <p className="display d-2 max-w-[16ch]">
              <T t={copy.home.processLead} />
            </p>
            <p className="mt-6 max-w-[40ch] text-m-mute">
              <T t={copy.common.mobile} />
            </p>
          </Reveal>
        </div>
      </section>

      <Reviews />

      <EndCta title={copy.about.endTitle} link={{ href: "/styles", label: copy.home.seeStyles }} />
    </>
  )
}
