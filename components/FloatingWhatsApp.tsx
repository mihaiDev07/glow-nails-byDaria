"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

const message = encodeURIComponent("Bună! Aș dori mai multe informații despre serviciile Glow Nails Studio.");

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <a
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,.42)] transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#1fbd5b] sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
      href={`https://wa.me/40787400558?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrie-ne pe WhatsApp"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-35 motion-safe:animate-ping" aria-hidden="true" />
      <MessageCircle className="h-7 w-7 fill-white stroke-[#25D366] sm:h-8 sm:w-8" strokeWidth={1.7} aria-hidden="true" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-[#34232f] px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100 sm:block">Scrie-ne pe WhatsApp</span>
    </a>
  );
}
