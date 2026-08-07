const groups = [
  { title: "Gel natural", items: [["Scurt", "100 lei"], ["Mediu", "110 lei"], ["Lung", "120 lei"]] },
  { title: "Construcție cu gel", items: [["Scurt", "130 lei"], ["Mediu", "140 lei"], ["Lung", "150 lei"], ["Extra lung", "160 lei"]] },
  { title: "Modele", items: [["Modele simple", "10 lei"], ["Manichiură franțuzească / Babyboomer", "10 lei"], ["Modele complexe", "20 lei"], ["Pietricele / Accesorii", "5 - 10 lei"]] },
  { title: "Servicii", items: [["Întreținere gel", "110 lei"], ["Îndepărtare gel", "30 lei"]] },
];

export default function PricingPage() {
  return (
    <section className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
      <h1 className="mb-10 text-center text-4xl font-semibold after:mx-auto after:mt-3 after:block after:h-1 after:w-14 after:rounded-full after:bg-linear-to-r after:from-[#e8a7c8] after:to-[#9a6ab2]">Prețuri</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {groups.map((group, index) => (
          <article
            className="rounded-2xl border border-[#e6cddc]/70 bg-white/95 p-6 shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl animate-[cardRise_.7s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
            key={group.title}
          >
            <h2 className="mb-5 text-center text-xl font-semibold">{group.title}</h2>
            <ul className="space-y-3">
              {group.items.map(([name, price]) => (
                <li className="flex items-center justify-between gap-4" key={name}>
                  <span>{name}</span>
                  <strong className="shrink-0 rounded-xl bg-[#34232f] px-3 py-1.5 text-sm font-medium text-white transition hover:scale-105 hover:bg-[#80506f]">{price}</strong>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
