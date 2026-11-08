import type { Metadata } from "next"
import { T, Other } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { site } from "@/lib/site"
import { styleById, mapLabel } from "@/lib/menu"
import { photos, Half, Loupe } from "@/lib/components/Photo"
import LashMap from "@/lib/components/LashMap"
import EyeMark from "@/lib/components/EyeMark"
import Reveal from "@/lib/components/Reveal"

export const metadata: Metadata = {
  title: "About the studio",
  description:
    "A woman-owned, Asian-owned lash studio on the 12th floor of 274 Madison Avenue. 8 years of lash artistry, custom sets for each eye shape, mobile service available.",
  alternates: { canonical: "/about" },
}

// The artist is intentionally not named. ClassPass reviews mention "Chrissy": confirm her name
// and whether she wants to be featured before adding it.

const NewTab = () => (
  <span className="sr-only">
    {" "}
    <T t={copy.common.opensNew} />
  </span>
)

export default function AboutPage() {
  const natural = styleById("natural")
  return (
    <>
      {/* Hero (paper): type left; the chair photo as a loupe (face only) on the logo's nude disc */}
      <section className="overflow-x-clip bg-m-paper pb-16 pt-10 md:pb-20 md:pt-14">
        <div className="container-site grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="relative z-10 md:col-span-7">
            <p className="anno text-m-mute">
              <T t={copy.nav.about} /> · <Other t={copy.nav.about} />
            </p>
            <h1 className="display d-hero mt-6 max-w-[9ch]">
              <T t={copy.about.title} />
            </h1>
            <p className="mt-9 max-w-[36ch] text-[1.25rem] leading-[1.5] md:text-[1.35rem]">
              <T t={copy.about.lead} />
            </p>
            <p className="mt-5 max-w-[46ch] text-m-mute">
              <T t={copy.about.body} />
            </p>
            <a href={site.bookUrl} target="_blank" rel="noreferrer" className="btn-primary mt-8">
              <T t={copy.common.bookOnSquare} />
              <NewTab />
            </a>
          </div>

          <div className="relative min-h-[96vw] md:col-span-5 md:min-h-[560px]">
            <div aria-hidden className="absolute left-[10vw] top-0 aspect-square w-[96vw] rounded-full bg-m-nude md:left-6 md:w-[600px]" />
            <figure className="relative pt-[12vw] md:pl-10 md:pt-20">
              <div className="relative w-[72vw] max-w-[316px] md:w-[316px]">
                <div className="zoom-hover rounded-full border border-m-ink/30 p-2">
                  <Loupe
                    photo={photos.clientChair}
                    alt="A client resting on the lash bed after her set, with full, soft lash extensions"
                    cx={150}
                    cy={322}
                    d={300}
                    priority
                    sizes="(max-width: 768px) 70vw, 300px"
                  />
                </div>
                {/* Sits below the circle's lower right, clear of the face */}
                <p className="anno z-10 mt-5 w-fit bg-m-ink px-4 py-3 text-m-paper md:absolute md:left-[58%] md:top-[calc(100%-0.25rem)] md:mt-0 md:whitespace-nowrap">
                  <T t={copy.about.tag} />
                </p>
              </div>
              <figcaption className="anno mt-4 text-m-ink md:mt-14">
                <T t={copy.about.chairCaption} />
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* The studio's philosophy, in its own ClassPass words (rose: this page's one bold band) */}
      <section className="on-rose bg-m-rose py-16 text-m-paper md:py-24" aria-labelledby="philosophy-title">
        <div className="container-site">
          <h2 id="philosophy-title" className="sr-only">
            <T t={copy.about.philosophySource} />
          </h2>
          <Reveal as="figure" className="grid gap-10 md:grid-cols-12 md:gap-10">
            <blockquote className="md:col-span-8">
              <p className="display d-1 [word-break:keep-all]">
                &ldquo;<T t={copy.about.philosophy} />&rdquo;
              </p>
            </blockquote>
            <figcaption className="md:col-span-4 md:self-end md:pb-3">
              <p className="text-[1.15rem] leading-[1.55]">
                <T t={copy.about.philosophyLead} />
              </p>
              <p className="anno mt-5">
                <T t={copy.about.philosophySource} />
              </p>
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* Spec sheet (paper) */}
      <section className="bg-m-paper py-16 md:py-24" aria-labelledby="spec-title">
        <div className="container-site grid gap-10 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-4">
            <h2 id="spec-title" className="display d-2 max-w-[10ch]">
              <T t={copy.about.specTitle} />
            </h2>
            <div className="mt-8 max-w-[300px] text-m-ink">
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

      {/* Work (nude): the Instagram line beside two angles of one set */}
      <section className="bg-m-nude py-16 md:py-24" aria-labelledby="work-title">
        <div className="container-site grid items-center gap-12 md:grid-cols-12 md:gap-10">
          <Reveal as="figure" index={1} className="md:order-2 md:col-span-7 md:col-start-6">
            <div className="grid grid-cols-12 gap-3">
              <div className="zoom-hover col-span-8">
                <Half photo={photos.beforeAfter2} alt="A close-up of one eye with wispy, defined lash extensions" y0={0} y1={318} sizes="(max-width: 768px) 66vw, 482px" />
              </div>
              <div className="zoom-hover col-span-7 col-start-6 -mt-10 outline outline-[10px] outline-m-nude md:-mt-20">
                <Half photo={photos.beforeAfter2} alt="The same set from a slightly different angle" y0={322} y1={640} sizes="(max-width: 768px) 58vw, 420px" />
              </div>
            </div>
            <figcaption className="anno mt-4 text-m-ink">
              <T t={copy.about.baCaption} />
            </figcaption>
          </Reveal>
          <Reveal className="md:order-1 md:col-span-5">
            <h2 id="work-title" className="display d-2 max-w-[14ch] [word-break:keep-all]">
              &ldquo;<T t={copy.about.quote} />&rdquo;
            </h2>
            <p className="anno mt-5 text-m-ink">
              <T t={copy.about.quoteSource} />
            </p>
            <p className="mt-8 max-w-[36ch]">
              <T t={copy.common.mobile} />
            </p>
            <a href={site.instagram} target="_blank" rel="noreferrer" className="link-under mt-3 inline-flex min-h-[44px] items-center font-semibold">
              <T t={copy.home.baLink} />
              <NewTab />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Close (blush): centred on the logo's mark, unlike any other page ending */}
      <section className="bg-m-blush py-16 text-center md:py-24" aria-labelledby="about-end">
        <Reveal className="container-site flex flex-col items-center">
          <EyeMark className="h-20 w-20 md:h-24 md:w-24" />
          <h2 id="about-end" className="display d-1 mt-8 max-w-[14ch] [word-break:keep-all]">
            <T t={copy.about.endTitle} />
          </h2>
          <p className="mt-6 max-w-[40ch] text-[1.15rem]">
            <T t={copy.about.endLine} />
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <a href={site.bookUrl} target="_blank" rel="noreferrer" className="btn-primary">
              <T t={copy.common.bookOnSquare} />
              <NewTab />
            </a>
            <a href={site.phoneHref} className="tnum link-under inline-flex min-h-[44px] items-center text-[1.1rem]">
              <T t={copy.common.call} />
              &nbsp;{site.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  )
}
