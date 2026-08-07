create schema if not exists private;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  storage_path text,
  alt_text text not null default 'Model de unghii',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.price_items (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  service text not null,
  price text not null,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create or replace function private.is_admin()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1 from public.admin_users where user_id = (select auth.uid())
  );
$$;

revoke all on function private.is_admin() from public;
grant usage on schema private to authenticated, anon;
grant execute on function private.is_admin() to authenticated;

alter table public.admin_users enable row level security;
alter table public.gallery_items enable row level security;
alter table public.price_items enable row level security;

create policy "Public gallery read" on public.gallery_items for select to anon, authenticated using (true);
create policy "Admin gallery insert" on public.gallery_items for insert to authenticated with check ((select private.is_admin()));
create policy "Admin gallery update" on public.gallery_items for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admin gallery delete" on public.gallery_items for delete to authenticated using ((select private.is_admin()));

create policy "Public prices read" on public.price_items for select to anon, authenticated using (true);
create policy "Admin prices insert" on public.price_items for insert to authenticated with check ((select private.is_admin()));
create policy "Admin prices update" on public.price_items for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admin prices delete" on public.price_items for delete to authenticated using ((select private.is_admin()));

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do update set public = true;

create policy "Admin storage select" on storage.objects for select to authenticated using (bucket_id = 'gallery' and (select private.is_admin()));
create policy "Admin storage upload" on storage.objects for insert to authenticated with check (bucket_id = 'gallery' and (select private.is_admin()));
create policy "Admin storage update" on storage.objects for update to authenticated using (bucket_id = 'gallery' and (select private.is_admin()));
create policy "Admin storage delete" on storage.objects for delete to authenticated using (bucket_id = 'gallery' and (select private.is_admin()));

insert into public.gallery_items (image_url, alt_text, sort_order)
select '/img/nails' || n || '.jpeg', 'Model de unghii ' || n, n
from generate_series(1, 9) as n
where not exists (select 1 from public.gallery_items);

insert into public.price_items (category, service, price, sort_order)
select * from (values
  ('Gel natural','Scurt','100 lei',1), ('Gel natural','Mediu','110 lei',2), ('Gel natural','Lung','120 lei',3),
  ('Construcție cu gel','Scurt','130 lei',4), ('Construcție cu gel','Mediu','140 lei',5), ('Construcție cu gel','Lung','150 lei',6), ('Construcție cu gel','Extra lung','160 lei',7),
  ('Modele','Modele simple','10 lei',8), ('Modele','Manichiură franțuzească / Babyboomer','10 lei',9), ('Modele','Modele complexe','20 lei',10), ('Modele','Pietricele / Accesorii','5 - 10 lei',11),
  ('Servicii','Întreținere gel','110 lei',12), ('Servicii','Îndepărtare gel','30 lei',13)
) as seed(category, service, price, sort_order)
where not exists (select 1 from public.price_items);

-- După crearea utilizatorului în Authentication, rulează separat:
-- insert into public.admin_users(user_id) values ('UUID-UL-UTILIZATORULUI');
