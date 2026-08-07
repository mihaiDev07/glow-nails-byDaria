import { fallbackGallery, fallbackPrices, type GalleryItem, type PriceItem } from "@/lib/content";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function getGallery(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured()) return fallbackGallery;
  const supabase = await createClient();
  const { data, error } = await supabase.from("gallery_items").select("*").order("sort_order");
  return error ? fallbackGallery : (data ?? []);
}

export async function getPrices(): Promise<PriceItem[]> {
  if (!isSupabaseConfigured()) return fallbackPrices;
  const supabase = await createClient();
  const { data, error } = await supabase.from("price_items").select("*").order("sort_order");
  return error ? fallbackPrices : (data ?? []);
}
