"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Acasă" },
  { href: "/pricing", label: "Prețuri" },
  { href: "/gallery", label: "Galerie" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 bg-gradient-to-r from-[#643f6d] via-[#b5658e] to-[#efd1c2] px-4 text-white shadow-[0_7px_24px_rgba(75,40,65,.2)] animate-[headerDrop_.65s_ease-out_both]">
      <nav className="mx-auto flex min-h-32 w-full max-w-7xl items-center justify-between py-2 md:min-h-40" aria-label="Navigație principală">
        <Link href="/" className="flex h-28 w-48 items-center justify-center rounded-3xl border border-white/30 bg-white/20 px-2 shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_12px_28px_rgba(69,38,63,.16)] backdrop-blur-md transition duration-500 hover:scale-[1.04] md:h-36 md:w-64" onClick={() => setOpen(false)}>
          <Image className="h-full w-full object-contain drop-shadow-[0_8px_12px_rgba(70,30,60,.18)]" src="/img/logo3.png" alt="Glow Nails Studio" width={260} height={174} priority />
        </Link>
        <button className="relative z-50 flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/50 bg-white/10 md:hidden" type="button" aria-label={open ? "Închide meniul" : "Deschide meniul"} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className={`h-0.5 w-6 bg-white transition duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
        <button className={`fixed inset-0 z-30 bg-black/50 transition duration-300 md:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`} aria-label="Închide meniul" onClick={() => setOpen(false)} />
        <ul className={`fixed right-0 top-0 z-40 flex h-dvh w-1/2 flex-col gap-1 bg-gradient-to-b from-[#704674] via-[#a65e85] to-[#dfa0b7] px-6 pb-8 pt-28 shadow-[-12px_0_35px_rgba(43,21,37,.3)] transition duration-500 ease-out md:static md:h-auto md:w-auto md:translate-x-0 md:flex-row md:items-center md:gap-6 md:bg-none md:p-0 md:shadow-none ${open ? "visible translate-x-0" : "invisible translate-x-full md:visible"}`}>
          <li className="mb-3 text-2xl font-semibold md:hidden">Meniu</li>
          {links.map((link) => (
            <li className="w-full md:w-auto" key={link.href}>
              <Link className={`relative block border-b border-white/20 py-3 text-white/80 transition hover:text-white md:border-0 md:py-2 after:absolute after:bottom-0.5 after:left-1/2 after:right-1/2 after:h-0.5 after:rounded-full after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:right-0 ${pathname === link.href ? "text-white after:left-0 after:right-0" : ""}`} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
