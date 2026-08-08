"use client";

import { Save, Trash2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { deletePrice, updatePriceWithState } from "@/app/admin/actions";

type PriceItem = { id: string; category: string; service: string; price: string };

export default function AdminPriceRow({ item }: { item: PriceItem }) {
  const [showMessage, setShowMessage] = useState(false);
  const [state, formAction, pending] = useActionState(updatePriceWithState, { status: "idle" as const, message: "", savedAt: 0 });

  useEffect(() => {
    if (!state.savedAt) return;
    setShowMessage(true);
    const timer = window.setTimeout(() => setShowMessage(false), 2800);
    return () => window.clearTimeout(timer);
  }, [state.savedAt]);

  return (
    <div className="rounded-2xl border border-[#eadce5] bg-white p-3 shadow-sm">
      <form action={formAction} className="grid gap-2 sm:grid-cols-[1fr_1.2fr_.7fr]">
        <input type="hidden" name="id" value={item.id} />
        <input className="min-w-0 rounded-lg border border-[#eadce5] px-3 py-2 text-sm" name="category" defaultValue={item.category} required />
        <input className="min-w-0 rounded-lg border border-[#eadce5] px-3 py-2 text-sm" name="service" defaultValue={item.service} required />
        <input className="min-w-0 rounded-lg border border-[#eadce5] px-3 py-2 text-sm" name="price" defaultValue={item.price} required />
        <button disabled={pending} className="flex items-center justify-center gap-2 rounded-lg bg-[#704674] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#855477] disabled:cursor-wait disabled:opacity-60 sm:col-span-3 sm:justify-self-end">
          <Save size={16} /> {pending ? "Se salvează..." : "Salvează modificările"}
        </button>
      </form>
      <div className="mt-2 flex items-center justify-end gap-4">
        {showMessage && <p className={`text-xs font-semibold ${state.status === "success" ? "text-emerald-600" : "text-red-600"}`}>{state.message}</p>}
        <form action={deletePrice}><input type="hidden" name="id" value={item.id} /><button className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"><Trash2 size={14} />Șterge</button></form>
      </div>
    </div>
  );
}
