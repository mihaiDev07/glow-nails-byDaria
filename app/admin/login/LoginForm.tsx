"use client";

import { useActionState } from "react";
import { LockKeyhole, UserRound } from "lucide-react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = { error: "" };

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor="username">Utilizator</label>
        <div className="flex items-center rounded-xl border border-[#dfcbd7] bg-white px-4 focus-within:border-[#a65e85] focus-within:ring-4 focus-within:ring-[#a65e85]/10">
          <UserRound size={18} className="text-[#8b607b]" aria-hidden="true" />
          <input className="w-full bg-transparent px-3 py-3 outline-none" id="username" name="username" autoComplete="username" required />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold" htmlFor="password">Parolă</label>
        <div className="flex items-center rounded-xl border border-[#dfcbd7] bg-white px-4 focus-within:border-[#a65e85] focus-within:ring-4 focus-within:ring-[#a65e85]/10">
          <LockKeyhole size={18} className="text-[#8b607b]" aria-hidden="true" />
          <input className="w-full bg-transparent px-3 py-3 outline-none" id="password" name="password" type="password" autoComplete="current-password" required />
        </div>
      </div>
      {state.error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{state.error}</p>}
      <button className="w-full rounded-xl bg-gradient-to-r from-[#704674] to-[#cf78aa] px-5 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60" disabled={pending}>
        {pending ? "Se verifică…" : "Autentificare"}
      </button>
    </form>
  );
}
