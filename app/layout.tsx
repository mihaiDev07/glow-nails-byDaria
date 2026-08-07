import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Glow Nails Studio',
  description:
    'Modele delicate și rafinate, create cu pasiune pentru frumusețe și perfecțiune.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro">
      <body className="overflow-x-hidden bg-[radial-gradient(circle_at_top,#f8dce9_0%,#f6f1f4_55%,#eee7ec_100%)] bg-fixed font-[Slabo] text-[#34232f] antialiased">
        <div className="grid min-h-svh grid-rows-[auto_1fr_auto]">
          <Header />
          <main className="flex min-h-0 flex-col animate-[pageReveal_.7s_ease-out_both]">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
