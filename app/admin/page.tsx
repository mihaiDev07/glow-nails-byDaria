import Image from "next/image";
import { ImagePlus, LogOut, Plus, Save, Trash2 } from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import { addPrice, deleteGalleryImage, deletePrice, signOutAction, updatePrice, uploadGalleryImage } from "./actions";

export default async function AdminDashboardPage() {
  const supabase = await requireAdmin();
  const [{ data: gallery = [] }, { data: prices = [] }] = await Promise.all([
    supabase.from("gallery_items").select("*").order("sort_order"),
    supabase.from("price_items").select("*").order("sort_order"),
  ]);

  return (
    <section className="flex-1 bg-[#f6f1f4] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#a65e85]">Glow Nails Studio</p><h1 className="text-3xl font-semibold sm:text-4xl">Panou de administrare</h1></div>
          <form action={signOutAction}><button className="flex items-center gap-2 rounded-xl border border-[#dac5d2] bg-white px-4 py-2.5 font-semibold text-[#6b435d] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><LogOut size={18} />Deconectare</button></form>
        </header>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_.95fr]">
          <section className="rounded-3xl border border-white bg-white/85 p-5 shadow-xl sm:p-7">
            <div className="mb-6 flex items-center gap-3"><ImagePlus className="text-[#a65e85]" /><div><h2 className="text-2xl font-semibold">Galerie</h2><p className="text-sm text-[#765d6e]">Adaugă sau șterge fotografii.</p></div></div>
            <form action={uploadGalleryImage} className="mb-7 grid gap-3 rounded-2xl bg-[#f7edf3] p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
              <div><label className="mb-1 block text-sm font-semibold" htmlFor="image">Fotografie</label><input className="w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#704674] file:px-3 file:py-2 file:text-white" id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" required /></div>
              <div><label className="mb-1 block text-sm font-semibold" htmlFor="alt_text">Descriere</label><input className="w-full rounded-lg border border-[#ddcbd6] bg-white px-3 py-2 outline-none focus:border-[#a65e85]" id="alt_text" name="alt_text" placeholder="Model roz elegant" required /></div>
              <button className="flex items-center justify-center gap-2 rounded-lg bg-[#704674] px-4 py-2 font-semibold text-white transition hover:bg-[#855477]"><Plus size={17} />Adaugă</button>
            </form>
            <div className="grid gap-4 sm:grid-cols-2">
              {gallery?.map((item) => (
                <article className="overflow-hidden rounded-2xl border border-[#eadce5] bg-white shadow-sm" key={item.id}>
                  <div className="relative h-48"><Image className="object-cover" src={item.image_url} alt={item.alt_text} fill sizes="(max-width:640px) 100vw, 50vw" unoptimized={item.image_url.startsWith("http")} /></div>
                  <div className="flex items-center justify-between gap-3 p-3"><p className="truncate text-sm">{item.alt_text}</p><form action={deleteGalleryImage}><input type="hidden" name="id" value={item.id} /><button className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100" aria-label={`Șterge ${item.alt_text}`}><Trash2 size={17} /></button></form></div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white bg-white/85 p-5 shadow-xl sm:p-7">
            <div className="mb-6"><h2 className="text-2xl font-semibold">Lista de prețuri</h2><p className="text-sm text-[#765d6e]">Modificările apar automat pe pagina publică.</p></div>
            <form action={addPrice} className="mb-6 grid gap-3 rounded-2xl bg-[#f7edf3] p-4 sm:grid-cols-3">
              <input className="rounded-lg border border-[#ddcbd6] bg-white px-3 py-2" name="category" placeholder="Categorie" required />
              <input className="rounded-lg border border-[#ddcbd6] bg-white px-3 py-2" name="service" placeholder="Serviciu" required />
              <div className="flex gap-2"><input className="min-w-0 flex-1 rounded-lg border border-[#ddcbd6] bg-white px-3 py-2" name="price" placeholder="Preț" required /><button className="rounded-lg bg-[#704674] p-2.5 text-white" aria-label="Adaugă preț"><Plus size={18} /></button></div>
            </form>
            <div className="space-y-3">
              {prices?.map((item) => (
                <div className="rounded-2xl border border-[#eadce5] bg-white p-3 shadow-sm" key={item.id}>
                  <form action={updatePrice} className="grid gap-2 sm:grid-cols-[1fr_1.2fr_.7fr_auto]">
                    <input type="hidden" name="id" value={item.id} />
                    <input className="min-w-0 rounded-lg border border-[#eadce5] px-3 py-2 text-sm" name="category" defaultValue={item.category} required />
                    <input className="min-w-0 rounded-lg border border-[#eadce5] px-3 py-2 text-sm" name="service" defaultValue={item.service} required />
                    <input className="min-w-0 rounded-lg border border-[#eadce5] px-3 py-2 text-sm" name="price" defaultValue={item.price} required />
                    <button className="flex items-center justify-center rounded-lg bg-[#704674] p-2 text-white" aria-label="Salvează modificarea"><Save size={17} /></button>
                  </form>
                  <form action={deletePrice} className="mt-2 text-right"><input type="hidden" name="id" value={item.id} /><button className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"><Trash2 size={14} />Șterge</button></form>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
