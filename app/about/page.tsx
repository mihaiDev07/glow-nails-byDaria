import Image from 'next/image';

export const metadata = {
  title: 'Despre mine | Glow Nails by Daria',
  description:
    'Descoperă povestea Dariei și pasiunea sa pentru arta unghiilor.',
};

export default function AboutPage() {
  return (
    <section className="flex flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-9 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#9d528c]">
            Pasiune · Precizie · Eleganță
          </p>

          <h1 className="text-4xl font-bold text-[#34232f] sm:text-5xl">
            Despre mine
          </h1>

          <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-linear-to-r from-[#9d528c] to-[#efb6c1]" />
        </div>

        <div className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/40 p-2 shadow-[0_20px_55px_rgba(85,48,72,.2)]">
          <div className="relative aspect-[4/3] min-h-[280px] overflow-hidden rounded-[1.15rem] sm:aspect-[16/9] sm:min-h-[420px]">
            <Image
              src="/img/bg-footer.png"
              alt="Daria în salonul Glow Nails"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 960px"
              className="z-0 scale-105 object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.075]"
            />

            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  'linear-gradient(to right, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.55))',
              }}
              aria-hidden="true"
            />

            {/* <div className="absolute bottom-4 left-4 z-20 rounded-full border border-white/50 bg-black/45 px-4 py-2 text-base font-semibold text-white shadow-lg backdrop-blur-sm sm:bottom-6 sm:left-6">
              Aproximativ 4 ani de experiență
            </div> */}
          </div>
        </div>

        <article className="mx-auto mt-9 max-w-4xl rounded-3xl border border-[#eadbe4] bg-white/65 p-7 text-xl leading-9 text-[#4f3946] shadow-[0_16px_40px_rgba(85,48,72,.1)] backdrop-blur-sm sm:p-10 sm:text-4xl sm:leading-10">
          <p>
            Bună, eu sunt <strong className="text-[#34232f]">Daria</strong>, o
            mare pasionată de arta unghiilor și de frumusețea care prinde viață
            în cele mai mici detalii. De aproximativ patru ani îmi dezvolt
            această pasiune, descoperind mereu tehnici noi și transformând
            fiecare idee într-un rezultat delicat și expresiv.
          </p>

          <p className="mt-6">
            Îmi place să lucrez cu gel, să experimentez forme, culori și modele
            și să îmbin creativitatea cu precizia. Folosesc aparatură avansată
            și materiale atent alese, pentru că profesionalismul, atenția și
            dorința de a evolua sunt la fel de importante pentru mine ca
            inspirația.
          </p>

          <p className="mt-6">
            Pentru mine, fiecare set de unghii este o mică operă de artă. Este
            un spațiu în care pot să-mi exprim imaginația, să-mi perfecționez
            tehnica și să transform o pasiune sinceră într-un rezultat elegant,
            armonios și plin de personalitate.
          </p>
        </article>
      </div>
    </section>
  );
}
