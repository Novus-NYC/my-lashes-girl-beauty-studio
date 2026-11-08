import Link from "next/link"
import { T } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { site } from "@/lib/site"
import type { Bi } from "@/lib/menu"
import Reveal from "./Reveal"

/** Closing call to action for inner pages: big line, Book, one internal link. */
export default function EndCta({ title, link }: { title: Bi; link: { href: string; label: Bi } }) {
  return (
    <section className="border-t border-m-rule bg-m-paper py-20 md:py-28">
      <div className="container-site grid items-end gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <h2 className="display d-1">
            <T t={title} />
          </h2>
        </Reveal>
        <Reveal index={1} className="flex flex-col items-start gap-5 md:col-span-4 md:col-start-9">
          <a href={site.bookUrl} target="_blank" rel="noreferrer" className="btn-primary">
            <T t={copy.common.bookOnSquare} />
            <span className="sr-only">
              {" "}
              <T t={copy.common.opensNew} />
            </span>
          </a>
          <Link href={link.href} className="link-under inline-flex min-h-[44px] items-center font-semibold">
            <T t={link.label} />
          </Link>
          <p className="text-m-mute">
            <T t={copy.common.mobile} />
          </p>
        </Reveal>
      </div>
    </section>
  )
}
