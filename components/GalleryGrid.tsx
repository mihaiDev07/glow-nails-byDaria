"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryItem } from "@/lib/content";

const PER_PAGE = 8;

export default function GalleryGrid({ images }: { images: GalleryItem[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(images.length / PER_PAGE);
  const visible = images.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const changePage = (nextPage: number) => { setPage(nextPage); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((image, index) => <div className="group relative h-80 overflow-hidden rounded-xl border border-white/80 bg-white shadow-[0_.3rem_1rem_rgba(45,30,40,.09)] transition duration-500 hover:-translate-y-2 hover:scale-[1.015] hover:shadow-[0_24px_50px_rgba(75,42,62,.2)] animate-[cardRise_.65s_ease-out_both]" style={{ animationDelay: `${index * 70}ms` }} key={image.id}><Image className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:saturate-110" src={image.image_url} alt={image.alt_text} width={700} height={700} unoptimized={image.image_url.startsWith("http")} /><span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" /></div>)}
      </div>
      <nav className="mt-9 flex justify-center gap-2" aria-label="Paginarea galeriei">
        <button className="rounded-lg border border-[#e6d9e1] bg-white px-4 py-2 text-[#855477] transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:translate-y-0 disabled:hover:shadow-none" onClick={() => changePage(page - 1)} disabled={page === 1}>Anterior</button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => <button key={number} className={`rounded-lg border px-4 py-2 transition hover:-translate-y-0.5 hover:shadow-md ${number === page ? "border-transparent bg-gradient-to-br from-[#d987b2] to-[#8e62a5] text-white" : "border-[#e6d9e1] bg-white text-[#855477]"}`} onClick={() => changePage(number)} aria-current={number === page ? "page" : undefined}>{number}</button>)}
        <button className="rounded-lg border border-[#e6d9e1] bg-white px-4 py-2 text-[#855477] transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:translate-y-0 disabled:hover:shadow-none" onClick={() => changePage(page + 1)} disabled={page === totalPages}>Următor</button>
      </nav>
    </>
  );
}
