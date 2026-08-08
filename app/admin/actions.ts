"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";

type SaveState = {
  status: "idle" | "success" | "error";
  message: string;
  savedAt: number;
};

export async function signOutAction() {
  const supabase = await requireAdmin();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function uploadGalleryImage(formData: FormData) {
  const supabase = await requireAdmin();
  const file = formData.get("image");
  const altText = String(formData.get("alt_text") ?? "Model de unghii").trim();

  if (!(file instanceof File) || file.size === 0 || file.size > 6 * 1024 * 1024) return;
  if (!new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]).has(file.type)) return;

  const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const storagePath = `${crypto.randomUUID()}.${extension}`;
  const { error: uploadError } = await supabase.storage.from("gallery").upload(storagePath, file, { contentType: file.type });
  if (uploadError) throw new Error("Imaginea nu a putut fi încărcată.");

  const { data: publicUrl } = supabase.storage.from("gallery").getPublicUrl(storagePath);
  const { data: last } = await supabase.from("gallery_items").select("sort_order").order("sort_order", { ascending: false }).limit(1).maybeSingle();
  const { error } = await supabase.from("gallery_items").insert({
    image_url: publicUrl.publicUrl,
    storage_path: storagePath,
    alt_text: altText || "Model de unghii",
    sort_order: (last?.sort_order ?? 0) + 1,
  });

  if (error) {
    await supabase.storage.from("gallery").remove([storagePath]);
    throw new Error("Imaginea nu a putut fi adăugată în galerie.");
  }
  revalidatePath("/gallery"); revalidatePath("/admin");
}

export async function deleteGalleryImage(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const { data } = await supabase.from("gallery_items").select("storage_path").eq("id", id).single();
  if (data?.storage_path) await supabase.storage.from("gallery").remove([data.storage_path]);
  await supabase.from("gallery_items").delete().eq("id", id);
  revalidatePath("/gallery"); revalidatePath("/admin");
}

export async function updateGalleryImage(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const altText = String(formData.get("alt_text") ?? "Model de unghii").trim();
  const file = formData.get("image");

  if (!id || !altText) return;

  const { data: current, error: readError } = await supabase
    .from("gallery_items")
    .select("storage_path")
    .eq("id", id)
    .single();
  if (readError) throw new Error("Fotografia nu a putut fi găsită.");

  let newStoragePath: string | null = null;
  let newImageUrl: string | null = null;

  if (file instanceof File && file.size > 0) {
    if (file.size > 6 * 1024 * 1024) throw new Error("Imaginea este prea mare. Limita este 6 MB.");
    if (!new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]).has(file.type)) throw new Error("Formatul imaginii nu este acceptat.");

    const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    newStoragePath = `${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from("gallery").upload(newStoragePath, file, { contentType: file.type });
    if (uploadError) throw new Error("Noua imagine nu a putut fi încărcată.");
    newImageUrl = supabase.storage.from("gallery").getPublicUrl(newStoragePath).data.publicUrl;
  }

  const changes: { alt_text: string; image_url?: string; storage_path?: string } = { alt_text: altText };
  if (newStoragePath && newImageUrl) {
    changes.image_url = newImageUrl;
    changes.storage_path = newStoragePath;
  }

  const { error: updateError } = await supabase.from("gallery_items").update(changes).eq("id", id);
  if (updateError) {
    if (newStoragePath) await supabase.storage.from("gallery").remove([newStoragePath]);
    throw new Error("Modificările nu au putut fi salvate.");
  }

  if (newStoragePath && current?.storage_path) await supabase.storage.from("gallery").remove([current.storage_path]);
  revalidatePath("/gallery"); revalidatePath("/admin");
}

export async function updateGalleryImageWithState(_previousState: SaveState, formData: FormData): Promise<SaveState> {
  try {
    await updateGalleryImage(formData);
    return { status: "success", message: "Modificări salvate", savedAt: Date.now() };
  } catch {
    return { status: "error", message: "Modificările nu au putut fi salvate", savedAt: Date.now() };
  }
}

export async function updatePrice(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await supabase.from("price_items").update({
    category: String(formData.get("category") ?? "").trim(),
    service: String(formData.get("service") ?? "").trim(),
    price: String(formData.get("price") ?? "").trim(),
    updated_at: new Date().toISOString(),
  }).eq("id", id);
  revalidatePath("/pricing"); revalidatePath("/admin");
}

export async function updatePriceWithState(_previousState: SaveState, formData: FormData): Promise<SaveState> {
  try {
    await updatePrice(formData);
    return { status: "success", message: "Modificări salvate", savedAt: Date.now() };
  } catch {
    return { status: "error", message: "Modificările nu au putut fi salvate", savedAt: Date.now() };
  }
}

export async function addPrice(formData: FormData) {
  const supabase = await requireAdmin();
  const { data: last } = await supabase.from("price_items").select("sort_order").order("sort_order", { ascending: false }).limit(1).maybeSingle();
  await supabase.from("price_items").insert({
    category: String(formData.get("category") ?? "").trim(),
    service: String(formData.get("service") ?? "").trim(),
    price: String(formData.get("price") ?? "").trim(),
    sort_order: (last?.sort_order ?? 0) + 1,
  });
  revalidatePath("/pricing"); revalidatePath("/admin");
}

export async function deletePrice(formData: FormData) {
  const supabase = await requireAdmin();
  await supabase.from("price_items").delete().eq("id", String(formData.get("id") ?? ""));
  revalidatePath("/pricing"); revalidatePath("/admin");
}
