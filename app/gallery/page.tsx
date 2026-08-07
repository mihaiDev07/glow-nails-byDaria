import GalleryGrid from "@/components/GalleryGrid";

export default function GalleryPage() {
  return <section className="flex-1 bg-[radial-gradient(circle_at_8%_8%,rgba(238,184,214,.28),transparent_27%),radial-gradient(circle_at_94%_88%,rgba(181,147,204,.22),transparent_30%),#f5f3f4] py-12"><div className="mx-auto w-full max-w-7xl px-6"><header className="mx-auto mb-10 max-w-2xl animate-[titleRise_.8s_.12s_ease-out_both] text-center"><h1 className="mb-3 text-4xl font-semibold after:mx-auto after:mt-3 after:block after:h-1 after:w-14 after:rounded-full after:bg-gradient-to-r after:from-[#e8a7c8] after:to-[#9a6ab2]">Galerie</h1><p className="text-lg text-[#765d6e]">O colecție de modele delicate și rafinate, create cu pasiune pentru frumusețe și perfecțiune.</p></header><GalleryGrid /></div></section>;
}
