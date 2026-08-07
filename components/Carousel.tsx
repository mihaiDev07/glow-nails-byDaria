import Image from "next/image";

export default function Carousel() {
  return (
    <section className="relative h-full min-h-[520px] flex-1 overflow-hidden" aria-label="Prezentare Glow Nails Studio">
      <Image
        className="object-cover object-center opacity-90 animate-[kenBurns_8s_ease-out_both]"
        src="/img/bg-girl.jpg"
        alt="Model cu manichiură elegantă"
        fill
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#26131f]/78 via-[#43283a]/35 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full min-h-[520px] w-full max-w-7xl items-center px-7 py-16 sm:px-10 lg:px-16">
        <div className="max-w-2xl animate-[titleRise_.9s_.15s_ease-out_both] text-white">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[.32em] text-[#f3b5d2] sm:text-base">Bine ai venit</p>
          <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] drop-shadow-lg sm:text-5xl lg:text-6xl">
            Eleganța începe până la vârful degetelor
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            Manichiuri delicate, create cu grijă pentru stilul și frumusețea ta.
          </p>
        </div>
      </div>
    </section>
  );
}
