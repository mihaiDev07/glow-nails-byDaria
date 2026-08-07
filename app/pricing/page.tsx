import { getPrices } from "@/lib/data";

export default async function PricingPage() {
  const prices = await getPrices();
  const categories = Array.from(new Set(prices.map((item) => item.category)));

  return (
    <section className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
      <h1 className="mb-10 text-center text-4xl font-semibold after:mx-auto after:mt-3 after:block after:h-1 after:w-14 after:rounded-full after:bg-linear-to-r after:from-[#e8a7c8] after:to-[#9a6ab2]">Prețuri</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {categories.map((category, index) => (
          <article className="rounded-2xl border border-[#e6cddc]/70 bg-white/95 p-6 shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl animate-[cardRise_.7s_ease-out_both]" style={{ animationDelay: `${index * 100}ms` }} key={category}>
            <h2 className="mb-5 text-center text-xl font-semibold">{category}</h2>
            <ul className="space-y-3">
              {prices.filter((item) => item.category === category).map((item) => (
                <li className="flex items-center justify-between gap-4" key={item.id}>
                  <span>{item.service}</span>
                  <strong className="shrink-0 rounded-xl bg-[#34232f] px-3 py-1.5 text-sm font-medium text-white transition hover:scale-105 hover:bg-[#80506f]">{item.price}</strong>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
