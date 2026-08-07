import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden px-6 py-6 text-white shadow-[0_-8px_28px_rgba(0,0,0,.0.5)]">
      <Image
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/img/bg-footer.png"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/55 via-black/72 to-black/60"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Image
          className="h-auto w-44 object-contain drop-shadow-[0_4px_10px_rgba(255,255,255,.2)]"
          src="/img/logo3.png"
          alt="Glow Nails Studio"
          width={240}
          height={160}
        />
        <p className="m-0 text-center text-sm text-white sm:text-right">
          © 2026 GlowNails by Daria. Toate drepturile rezervate.
        </p>
      </div>
    </footer>
  );
}
