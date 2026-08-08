import { ImagePlus, LogOut, Plus } from "lucide-react";
import AdminGalleryCard from "@/components/AdminGalleryCard";
import AdminPriceRow from "@/components/AdminPriceRow";
import { requireAdmin } from "@/lib/admin";
import { addPrice, signOutAction, uploadGalleryImage } from "./actions";

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
            <div className="mb-6 flex items-center gap-3"><ImagePlus className="text-[#a65e85]" /><div><h2 className="text-2xl font-semibold">Galerie</h2><p className="text-sm text-[#765d6e]">Adaugă, editează sau șterge fotografii.</p></div></div>
            <form action={uploadGalleryImage} className="mb-7 grid gap-3 rounded-2xl bg-[#f7edf3] p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
              <div><label className="mb-1 block text-sm font-semibold" htmlFor="image">Fotografie</label><input className="w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#704674] file:px-3 file:py-2 file:text-white" id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" required /></div>
              <div><label className="mb-1 block text-sm font-semibold" htmlFor="alt_text">Descriere</label><input className="w-full rounded-lg border border-[#ddcbd6] bg-white px-3 py-2 outline-none focus:border-[#a65e85]" id="alt_text" name="alt_text" placeholder="Model roz elegant" required /></div>
              <button className="flex items-center justify-center gap-2 rounded-lg bg-[#704674] px-4 py-2 font-semibold text-white transition hover:bg-[#855477]"><Plus size={17} />Adaugă</button>
            </form>
            <div className="grid gap-4 sm:grid-cols-2">
              {gallery?.map((item) => <AdminGalleryCard item={item} key={item.id} />)}
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
              {prices?.map((item) => <AdminPriceRow item={item} key={item.id} />)}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
