import { T } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { site } from "@/lib/site"
import Reveal from "./Reveal"

// TODO confirm with owner: get permission before quoting these ClassPass reviews by first name.
const quotes = [
  { text: "Show her image of lash you like, she makes it happen, simple like that.", name: "Amber" },
  { text: "So gentle and so detail oriented! Love my customized lashes!", name: null },
  { text: "My lashes last for a month and all my friends noticed the transformation.", name: "Laina" },
]

/** ClassPass score set huge, with three quotes on hairlines. Nude section. */
export default function Reviews({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3"
  return (
    <section className="bg-m-nude py-20 md:py-28" aria-labelledby="reviews-title">
      <div className="container-site grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <H id="reviews-title" className="anno text-m-ink">
            <T t={copy.reviews.title} />
          </H>
          <p className="mt-6 flex items-start gap-4">
            <span className="latin font-serif text-[9rem] leading-[0.8] tracking-[-0.03em] md:text-[13rem]">{site.rating.score}</span>
            <span className="anno mt-3 text-m-ink">
              <T t={copy.reviews.outOf} />
            </span>
          </p>
          <p className="mt-6 max-w-xs text-m-ink">
            <T t={copy.reviews.count} />
          </p>
          <a href={site.classpass} target="_blank" rel="noreferrer" className="link-under mt-4 inline-flex min-h-[44px] items-center font-semibold">
            <T t={copy.reviews.readMore} />
            <span className="sr-only">
              {" "}
              <T t={copy.common.opensNew} />
            </span>
          </a>
        </div>

        <ul className="md:col-span-7 md:pt-10">
          {quotes.map((q, i) => (
            <Reveal as="li" index={i} key={q.text} className={`border-t border-m-ink/25 py-8 ${i === quotes.length - 1 ? "border-b" : ""}`}>
              <figure className={i === 1 ? "md:pl-[16%]" : i === 2 ? "md:pl-[8%]" : ""}>
                <blockquote lang="en" className="font-serif text-[1.65rem] leading-[1.2] md:text-[2.15rem]">
                  &ldquo;{q.text}&rdquo;
                </blockquote>
                <figcaption className="anno mt-4 text-m-ink">
                  {q.name ? (
                    <>
                      {q.name} · {site.rating.source}
                    </>
                  ) : (
                    <T t={copy.reviews.client} />
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
          <li className="anno pt-4 text-m-ink/80 list-none">
            <T t={copy.reviews.note} />
          </li>
        </ul>
      </div>
    </section>
  )
}
