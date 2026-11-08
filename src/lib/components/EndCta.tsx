import Link from "next/link"
import { T } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { site } from "@/lib/site"
import type { Bi } from "@/lib/menu"
import Reveal from "./Reveal"

type Tone = "nude" | "clay"

/** Closing call to action for inner pages: a big line, Book, Call and one internal link. Full-bleed colour. */
export default function EndCta({ title, link, tone = "clay" }: { title: Bi; link: { href: string; label: Bi }; tone?: Tone }) {
  const clay = tone === "clay"
  return (
    <section className={`${clay ? "on-clay bg-m-clay text-m-paper" : "bg-m-nude text-m-ink"} py-20 md:py-28`}>
      <div className="container-site grid items-end gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <h2 className="display d-1 max-w-[12ch]">
            <T t={title} />
          </h2>
          <p className="mt-6 max-w-[38ch]">
            <T t={copy.common.mobile} />
          </p>
        </Reveal>
        <Reveal index={1} className="flex flex-col items-start gap-4 md:col-span-4 md:col-start-9">
          <a href={site.bookUrl} target="_blank" rel="noreferrer" className={clay ? "btn-primary-light" : "btn-primary"}>
            <T t={copy.common.bookOnSquare} />
            <span className="sr-only">
              {" "}
              <T t={copy.common.opensNew} />
            </span>
          </a>
          <a href={site.phoneHref} className="tnum link-under inline-flex min-h-[44px] items-center text-[1.1rem]">
            <T t={copy.common.call} />
            &nbsp;{site.phoneDisplay}
          </a>
          <Link href={link.href} className="link-under inline-flex min-h-[44px] items-center font-semibold">
            <T t={link.label} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
