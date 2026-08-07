# Configurare Supabase pentru administrare

## 1. Creează administratorul

În Supabase, mergi la **Authentication → Users → Add user** și creează un utilizator cu email și parolă. Parola rămâne numai în Supabase și nu se adaugă în cod.

## 2. Rulează migrarea

Deschide **SQL Editor**, copiază conținutul fișierului `supabase/migrations/001_admin_cms.sql` și rulează-l.

Din pagina utilizatorului creat, copiază UUID-ul. Apoi rulează:

```sql
insert into public.admin_users(user_id)
values ('UUID-UL-UTILIZATORULUI');
```

## 3. Configurează proiectul

Copiază `.env.example` ca `.env.local` și completează:

```env
NEXT_PUBLIC_SUPABASE_URL=https://project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxx
ADMIN_USERNAME=numele-tau-secret
ADMIN_EMAIL=emailul-folosit-in-supabase@example.com
```

`ADMIN_USERNAME` este numele introdus în formular. `ADMIN_EMAIL` face legătura cu utilizatorul Supabase, iar parola este cea setată în Authentication.

## 4. Pornește proiectul

```bash
npm install
npm run dev
```

Iconița de administrare din Header deschide `/admin/login`.

## Securitate

- Dashboard-ul validează sesiunea pe server.
- Tabelele și Storage sunt protejate prin Row Level Security.
- Doar utilizatorii înregistrați în `admin_users` pot modifica datele.
- Nu adăuga parola sau o cheie `service_role` în cod ori în variabile publice.
