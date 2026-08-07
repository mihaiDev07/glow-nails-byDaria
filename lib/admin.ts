import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims as { email?: string } | undefined;

  if (error || !claims?.email || claims.email.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) {
    redirect("/admin/login");
  }

  return supabase;
}
