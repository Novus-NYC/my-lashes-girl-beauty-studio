import Link from "next/link"
import { T } from "@/lib/i18n"
import { copy } from "@/lib/copy"
import { site } from "@/lib/site"
import EyeMark from "./EyeMark"

/*
 * Kept deliberately short (feedback: the old footer tried to hold everything).
 * Three rows: the logo lettering with Book, then where / how to reach the studio in one line,
 * then the sign-off. Pages live in the sticky navbar; hours live on /visit.
 */
export default function Footer() {
  const newTab = (
    <span className="sr-only">
      {" "}
      <T t={copy.common.opensNew} />
    </span>
  )
  return (
    <footer className="on-ink bg-m-ink text-m-paper">
      <div className="container-site flex flex-col gap-8 pb-12 pt-16 md:flex-row md:items-end md:justify-between md:pt-20">
        <Link href="/" aria-label={copy.nav.home.en} className="flex items-center gap-4 md:gap-6">
          <EyeMark className="h-12 w-12 shrink-0 md:h-20 md:w-20" />
          <span className="flex flex-col leading-none">
            <span className="font-sans text-[clamp(1.55rem,4.2vw,4rem)] font-light uppercase tracking-[0.16em]">My Lash Girl</span>
            <span className="mt-3 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.42em] text-m-nude md:text-[0.95rem]">Beauty Studio</span>
          </span>
        </Link>
        <a href={site.bookUrl} target="_blank" rel="noreferrer" className="btn-primary-light w-fit">
          <T t={copy.common.bookOnSquare} />
          {newTab}
        </a>
      </div>

      <div className="container-site">
        <div className="flex flex-col gap-x-10 gap-y-1 border-t border-m-paper/20 py-6 md:flex-row md:flex-wrap md:items-center">
          <Link href="/visit" className="link-under inline-flex min-h-[44px] w-fit items-center">
            {site.address.line1}, <T t={copy.common.floor} />
          </Link>
          <a href={site.phoneHref} className="tnum link-under inline-flex min-h-[44px] w-fit items-center">
            {site.phoneDisplay}
          </a>
          <a href={site.instagram} target="_blank" rel="noreferrer" className="link-under inline-flex min-h-[44px] w-fit items-center">
            <T t={copy.common.instagram} />
            {newTab}
          </a>
        </div>
        <div className="flex flex-col gap-1 border-t border-m-paper/20 py-5 text-m-nude sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <a href="https://novusnyc.org" target="_blank" rel="noreferrer" className="link-under inline-flex min-h-[44px] items-center text-m-paper">
            Made by Novus
          </a>
        </div>
      </div>
    </footer>
  )
}
