import { T } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { site } from "@/lib/site"
import Reveal from "./Reveal"

// TODO confirm with owner: get permission before quoting these ClassPass reviews by first name.
// Reviews stay in their original English in both languages (lang="en" on each quote).
const lead = { text: "Show her image of lash you like, she makes it happen, simple like that.", name: "Amber" }
const more = [
  { text: "So gentle and so detail oriented! Love my customized lashes!", name: null },
  { text: "My lashes last for a month and all my friends noticed the transformation.", name: "Laina" },
]

const Cite = ({ name }: { name: string | null }) => (
  <figcaption className="anno mt-5">
    {name ? (
      <>
        {name} · {site.rating.source}
      </>
    ) : (
      <T t={copy.reviews.client} />
    )}
  </figcaption>
)

/** Home only. Rose band: the ClassPass score huge, one pull-quote at display scale, two smaller quotes offset. */
export default function Reviews() {
  return (
    <section className="on-rose overflow-x-clip bg-m-rose pb-16 pt-16 text-m-paper md:pb-36 md:pt-24" aria-labelledby="reviews-title">
      <div className="container-site">
        <div className="flex items-baseline justify-between gap-6 border-b border-m-paper/30 pb-3">
          <h2 id="reviews-title" className="anno">
            <T t={copy.reviews.title} />
          </h2>
          <span className="anno hidden sm:inline">
            <T t={copy.reviews.note} />
          </span>
        </div>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-10">
          {/* Score */}
          <div className="md:col-span-4">
            <p className="flex items-start gap-3">
              <span className="latin font-serif text-[10rem] leading-[0.78] tracking-[-0.04em] md:text-[15rem]">{site.rating.score}</span>
              <span className="anno mt-2">
                <T t={copy.reviews.outOf} />
              </span>
            </p>
            <p className="mt-6 max-w-[22ch]">
              <T t={copy.reviews.count} />
            </p>
            <a href={site.classpass} target="_blank" rel="noreferrer" className="link-under mt-2 inline-flex min-h-[44px] items-center font-semibold">
              <T t={copy.reviews.readMore} />
              <span className="sr-only">
                {" "}
                <T t={copy.common.opensNew} />
              </span>
            </a>
          </div>

          {/* Pull-quote */}
          <Reveal as="figure" className="relative md:col-span-8 md:pt-4">
            <span aria-hidden className="latin absolute -left-1 -top-10 font-serif text-[8rem] leading-none text-m-paper/25 md:-left-16 md:-top-14 md:text-[12rem]">
              &ldquo;
            </span>
            <blockquote lang="en" className="relative font-serif text-[2.4rem] leading-[1.02] tracking-[-0.01em] md:text-[clamp(3rem,5.2vw,5rem)]">
              {lead.text}
            </blockquote>
            <Cite name={lead.name} />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-10">
          <Reveal as="figure" className="border-t border-m-paper/30 pt-6 md:col-span-4 md:col-start-2">
            <blockquote lang="en" className="font-serif text-[1.7rem] italic leading-[1.15]">
              &ldquo;{more[0].text}&rdquo;
            </blockquote>
            <Cite name={more[0].name} />
          </Reveal>
          <Reveal as="figure" index={1} className="border-t border-m-paper/30 pt-6 md:col-span-6 md:col-start-7 md:mt-20">
            <blockquote lang="en" className="font-serif text-[2rem] leading-[1.1] md:text-[2.6rem]">
              &ldquo;{more[1].text}&rdquo;
            </blockquote>
            <Cite name={more[1].name} />
          </Reveal>
        </div>
        <p className="anno mt-10 sm:hidden">
          <T t={copy.reviews.note} />
        </p>
      </div>
    </section>
  )
}
