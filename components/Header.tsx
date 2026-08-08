'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Settings } from 'lucide-react';

const links = [
  { href: '/', label: 'Acasă' },
  { href: '/about', label: 'Despre mine' },
  { href: '/gallery', label: 'Galerie' },
  { href: '/pricing', label: 'Catalog' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 bg-gradient-to-r from-[#643f6d] via-[#b5658e] to-[#efd1c2] px-4 text-white shadow-[0_7px_24px_rgba(75,40,65,.2)] animate-[headerDrop_.65s_ease-out_both]">
      <nav
        className="mx-auto flex min-h-32 w-full max-w-7xl items-center justify-between py-2 md:min-h-40"
        aria-label="Navigație principală"
      >
        <Link
          href="/"
          className="flex h-28 w-48 items-center justify-center rounded-3xl border border-white/30 bg-white/20 px-2 shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_12px_28px_rgba(69,38,63,.16)] backdrop-blur-md transition duration-500 hover:scale-[1.04] md:h-36 md:w-64"
          onClick={() => setOpen(false)}
        >
          <Image
            className="h-full w-full object-contain drop-shadow-[0_8px_12px_rgba(70,30,60,.18)]"
            src="/img/logo3.png"
            alt="Glow Nails Studio"
            width={260}
            height={174}
            priority
          />
        </Link>
        <button
          className="relative z-50 flex h-13 w-13 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/80 bg-[#58335f]/90 shadow-[0_6px_18px_rgba(52,26,52,.38)] backdrop-blur-sm transition hover:bg-[#48284e] md:hidden"
          type="button"
          aria-label={open ? 'Închide meniul' : 'Deschide meniul'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span
            className={`h-[3px] w-7 rounded-full bg-white shadow-sm transition duration-300 ${open ? 'translate-y-[9px] rotate-45' : ''}`}
          />
          <span
            className={`h-[3px] w-7 rounded-full bg-white shadow-sm transition duration-300 ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`h-[3px] w-7 rounded-full bg-white shadow-sm transition duration-300 ${open ? '-translate-y-[9px] -rotate-45' : ''}`}
          />
        </button>
        <button
          className={`fixed inset-0 z-30 bg-black/50 transition duration-300 md:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
          aria-label="Închide meniul"
          onClick={() => setOpen(false)}
        />
        <ul
          className={`fixed right-0 top-0 z-40 flex h-dvh w-1/2 flex-col gap-1 bg-gradient-to-b from-[#704674] via-[#a65e85] to-[#dfa0b7] px-6 pb-8 pt-28 shadow-[-12px_0_35px_rgba(43,21,37,.3)] transition duration-500 ease-out md:static md:h-auto md:w-auto md:translate-x-0 md:flex-row md:items-center md:gap-6 md:bg-none md:p-0 md:shadow-none ${open ? 'visible translate-x-0' : 'invisible translate-x-full md:visible'}`}
        >
          <li className="mb-3 text-2xl font-semibold md:hidden">Meniu</li>
          {links.map((link) => (
            <li className="w-full md:w-auto" key={link.href}>
              <Link
                className={`relative block border-b border-white/20 py-3 text-white/80 transition hover:text-white md:border-0 md:py-2 after:absolute after:bottom-0.5 after:left-1/2 after:right-1/2 after:h-0.5 after:rounded-full after:bg-white after:transition-all after:duration-300 hover:after:left-0 hover:after:right-0 ${pathname === link.href ? 'text-white after:left-0 after:right-0' : ''}`}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-3 w-full border-t border-white/20 pt-3 md:mt-0 md:w-auto md:border-0 md:pt-0">
            <Link
              className="flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-2 text-white/85 transition hover:scale-105 hover:bg-white/20 hover:text-white"
              href="/admin/login"
              onClick={() => setOpen(false)}
              aria-label="Autentificare administrator"
              title="Administrare"
            >
              <Settings size={18} aria-hidden="true" />
              <span className="md:sr-only">Administrare</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
