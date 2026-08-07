import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <section className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-12">
      <Image
        className="absolute inset-0 h-full w-full scale-105 object-cover object-center opacity-40 blur-[2px]"
        src="/img/hero.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-linear-to-br from-white/80 via-transparent to-[#f4d8e5]/55"
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-md rounded-3xl  bg-transparent p-7 sm:p-10">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-[#704674] to-[#cf78aa] text-white shadow-lg">
          <MessageCircle size={25} aria-hidden="true" />
        </div>
        <h1 className="text-center text-3xl font-semibold">Contact</h1>
        <p className="mb-8 mt-2 text-center text-sm text-[#765d6e]">
          Trimite-ne un mesaj pe WhatsApp
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
