"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type LoginState = { error: string };

export async function loginAction(_state: LoginState, formData: FormData): Promise<LoginState> {
  if (!isSupabaseConfigured() || !process.env.ADMIN_USERNAME || !process.env.ADMIN_EMAIL) {
    return { error: "Supabase sau datele administratorului nu sunt configurate." };
  }

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (username !== process.env.ADMIN_USERNAME) {
    return { error: "Date de autentificare incorecte." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: process.env.ADMIN_EMAIL,
    password,
  });

  if (error) return { error: "Date de autentificare incorecte." };
  redirect("/admin");
}
