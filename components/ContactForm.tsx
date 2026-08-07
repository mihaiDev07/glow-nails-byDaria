"use client";

import { FormEvent, useState } from "react";
import { MessageSquareText, Send, UserRound } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = encodeURIComponent(`Nume: ${name.trim()}\nMesaj: ${message.trim()}`);
    window.location.href = `https://wa.me/40787400558?text=${text}`;
  }

  return (
    <form className="space-y-5 animate-[cardRise_.75s_.15s_ease-out_both]" onSubmit={submit}>
      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor="name">Nume</label>
        <div className="flex items-center rounded-xl border border-[#dfcbd7] bg-white px-4 focus-within:border-[#a65e85] focus-within:ring-4 focus-within:ring-[#a65e85]/10">
          <UserRound size={18} className="shrink-0 text-[#8b607b]" aria-hidden="true" />
          <input className="w-full bg-transparent px-3 py-3 outline-none" id="name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor="message">Mesaj</label>
        <div className="flex items-start rounded-xl border border-[#dfcbd7] bg-white px-4 focus-within:border-[#a65e85] focus-within:ring-4 focus-within:ring-[#a65e85]/10">
          <MessageSquareText size={18} className="mt-3.5 shrink-0 text-[#8b607b]" aria-hidden="true" />
          <textarea className="min-h-32 w-full resize-y bg-transparent px-3 py-3 outline-none" id="message" value={message} onChange={(event) => setMessage(event.target.value)} required />
        </div>
      </div>
      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-semibold text-white shadow-[0_10px_24px_rgba(37,211,102,.3)] transition hover:-translate-y-0.5 hover:bg-[#1fbd5b] hover:shadow-[0_14px_30px_rgba(37,211,102,.4)]" type="submit">
        <Send size={17} aria-hidden="true" />Trimite pe WhatsApp
      </button>
    </form>
  );
}
