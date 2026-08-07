"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = encodeURIComponent(`Nume: ${name.trim()}\nMesaj: ${message.trim()}`);
    window.location.href = `https://wa.me/40787400558?text=${text}`;
  }

  return (
    <form className="flex w-full animate-[cardRise_.75s_.15s_ease-out_both] flex-col gap-3" onSubmit={submit}>
      <label className="sr-only" htmlFor="name">Nume</label>
      <input
        className="border border-[#d7c19e]/50 bg-[#eee0c8]/95 px-4 py-3.5 text-[#342820] outline-none transition placeholder:text-[#6d5a48] focus:border-[#d5ae70] focus:ring-2 focus:ring-[#d5ae70]/35"
        id="name"
        placeholder="Numele tău"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <label className="sr-only" htmlFor="message">Mesaj</label>
      <textarea
        className="resize-y border border-[#d7c19e]/50 bg-[#eee0c8]/95 px-4 py-3.5 text-[#342820] outline-none transition placeholder:text-[#6d5a48] focus:border-[#d5ae70] focus:ring-2 focus:ring-[#d5ae70]/35"
        id="message"
        rows={5}
        placeholder="Mesajul tău"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
      />
      <button className="mt-1 w-fit bg-[#20c968] px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#18b65a] hover:shadow-xl active:translate-y-0" type="submit">
        Trimite prin WhatsApp
      </button>
    </form>
  );
}
