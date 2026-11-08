import { copy } from "./copy"

export const navLinks = [
  { href: "/styles", label: copy.nav.styles },
  { href: "/menu", label: copy.nav.menu },
  { href: "/about", label: copy.nav.about },
  { href: "/visit", label: copy.nav.visit },
] as const
