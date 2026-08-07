import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <section className="relative flex flex-1 items-center overflow-hidden px-5 py-12 sm:px-8">
      <Image
        className="absolute inset-0 h-full w-full scale-105 object-cover object-center opacity-45 blur-[1px]"
        src="/img/hero.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#221912]/55" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-2xl border border-[#d8bd91]/75 bg-black/20 p-5 shadow-[0_24px_60px_rgba(0,0,0,.3)] backdrop-blur-[2px] sm:p-9">
        <h1 className="mb-2 text-center text-4xl font-semibold text-[#d5ae70]">Contact</h1>
        <p className="mb-7 text-center text-sm font-semibold uppercase tracking-[.14em] text-[#f3e3c7]">Trimite-ne un mesaj</p>
        <ContactForm />
      </div>
    </section>
  );
}
