import { Settings } from 'lucide-react';
import LoginForm from './LoginForm';

export default function AdminLoginPage() {
  return (
    <section className="flex flex-1 items-center justify-center bg-[radial-gradient(circle_at_top,#f8dce9,#f6f1f4_55%,#eee7ec)] px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/80 bg-white/80 p-7 shadow-[0_28px_70px_rgba(85,46,72,.2)] backdrop-blur-xl sm:p-10">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#704674] to-[#cf78aa] text-white shadow-lg">
          <Settings size={25} aria-hidden="true" />
        </div>
        <h1 className="text-center text-3xl font-semibold">Admin</h1>
        <p className="mb-8 mt-2 text-center text-sm text-[#765d6e]">
          Acces privat Glow Nails Studio
        </p>
        <LoginForm />
      </div>
    </section>
  );
}
