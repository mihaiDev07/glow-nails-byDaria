import Image from 'next/image';

export default function Footer() {
  return (
    <footer
      className="relative mt-auto overflow-hidden px-6 py-6 text-white shadow-[0_-8px_28px_rgba(0,0,0,.18)]"
      style={{
        background:
          'linear-gradient(to right, #555255 0%, #000000 50%, #555255 100%)',
      }}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Image
          className="h-auto w-44 object-contain drop-shadow-[0_4px_10px_rgba(255,255,255,.2)]"
          src="/img/logo3.png"
          alt="Glow Nails Studio"
          width={240}
          height={160}
        />

        <p className="m-0 text-center text-sm text-white drop-shadow-sm sm:text-right">
          © 2026 by mihaiDev07. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
