"use client";

import Image from "next/image";
import { Pencil, Save, Trash2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { deleteGalleryImage, updateGalleryImageWithState } from "@/app/admin/actions";

type GalleryItem = { id: string; image_url: string; alt_text: string };

export default function AdminGalleryCard({ item }: { item: GalleryItem }) {
  const [editing, setEditing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [state, formAction, pending] = useActionState(updateGalleryImageWithState, { status: "idle" as const, message: "", savedAt: 0 });

  useEffect(() => {
    if (!state.savedAt) return;
    setShowMessage(true);
    if (state.status === "success") setEditing(false);
    const timer = window.setTimeout(() => setShowMessage(false), 2800);
    return () => window.clearTimeout(timer);
  }, [state.savedAt, state.status]);

  return (
    <article className="overflow-hidden rounded-2xl border border-[#eadce5] bg-white shadow-sm">
      <div className="relative h-48">
        <Image className="object-cover" src={item.image_url} alt={item.alt_text} fill sizes="(max-width:640px) 100vw, 50vw" unoptimized={item.image_url.startsWith("http")} />
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="min-w-0 flex-1 truncate text-sm">{item.alt_text}</p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setEditing((value) => !value)} className="flex items-center gap-1 rounded-lg bg-[#f4e9f0] px-3 py-2 text-sm font-semibold text-[#704674] transition hover:bg-[#ead9e4]" aria-expanded={editing}>
              <Pencil size={16} /> Editează
            </button>
            <form action={deleteGalleryImage}>
              <input type="hidden" name="id" value={item.id} />
              <button className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100" aria-label={`Șterge ${item.alt_text}`}><Trash2 size={17} /></button>
            </form>
          </div>
        </div>

        {editing && (
          <form action={formAction} className="mt-3 space-y-3 rounded-xl border border-[#eadce5] bg-[#fbf7f9] p-3">
            <input type="hidden" name="id" value={item.id} />
            <div>
              <label className="mb-1 block text-xs font-semibold" htmlFor={`alt-${item.id}`}>Descriere</label>
              <input className="w-full rounded-lg border border-[#ddcbd6] bg-white px-3 py-2 text-sm outline-none focus:border-[#a65e85]" id={`alt-${item.id}`} name="alt_text" defaultValue={item.alt_text} required />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold" htmlFor={`image-${item.id}`}>Înlocuiește fotografia (opțional)</label>
              <input className="w-full text-xs file:mr-2 file:rounded-md file:border-0 file:bg-[#704674] file:px-2 file:py-1.5 file:text-white" id={`image-${item.id}`} name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" />
            </div>
            <button disabled={pending} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#704674] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#855477] disabled:cursor-wait disabled:opacity-60">
              <Save size={16} /> {pending ? "Se salvează..." : "Salvează modificările"}
            </button>
          </form>
        )}

        {showMessage && <p className={`mt-2 text-right text-xs font-semibold ${state.status === "success" ? "text-emerald-600" : "text-red-600"}`}>{state.message}</p>}
      </div>
    </article>
  );
}
