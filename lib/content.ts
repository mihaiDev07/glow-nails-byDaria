export type GalleryItem = {
  id: string;
  image_url: string;
  storage_path: string | null;
  alt_text: string;
  sort_order: number;
};

export type PriceItem = {
  id: string;
  category: string;
  service: string;
  price: string;
  sort_order: number;
};

export const fallbackGallery: GalleryItem[] = Array.from({ length: 9 }, (_, index) => ({
  id: `local-${index + 1}`,
  image_url: `/img/nails${index + 1}.jpeg`,
  storage_path: null,
  alt_text: `Model de unghii ${index + 1}`,
  sort_order: index + 1,
}));

export const fallbackPrices: PriceItem[] = [
  ["Gel natural", "Scurt", "100 lei"], ["Gel natural", "Mediu", "110 lei"], ["Gel natural", "Lung", "120 lei"],
  ["Construcție cu gel", "Scurt", "130 lei"], ["Construcție cu gel", "Mediu", "140 lei"], ["Construcție cu gel", "Lung", "150 lei"], ["Construcție cu gel", "Extra lung", "160 lei"],
  ["Modele", "Modele simple", "10 lei"], ["Modele", "Manichiură franțuzească / Babyboomer", "10 lei"], ["Modele", "Modele complexe", "20 lei"], ["Modele", "Pietricele / Accesorii", "5 - 10 lei"],
  ["Servicii", "Întreținere gel", "110 lei"], ["Servicii", "Îndepărtare gel", "30 lei"],
].map(([category, service, price], index) => ({ id: `local-${index + 1}`, category, service, price, sort_order: index + 1 }));
