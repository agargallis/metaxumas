# Supabase Setup

## 1. Environment variables

Add these to your `.env`:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_ADMIN_MEDIA_BUCKET=admin-media
```

## 2. SQL schema for shared settings

Run this in the Supabase SQL editor:

```sql
create table if not exists public.site_settings (
  id text primary key,
  review_average numeric(3,2) not null default 4.9,
  review_total integer not null default 130,
  review_breakdown jsonb not null default '{"1":1,"2":0,"3":1,"4":6,"5":92}'::jsonb,
  live_promo jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id)
values ('main')
on conflict (id) do nothing;

alter table public.site_settings enable row level security;

drop policy if exists "site settings public read" on public.site_settings;
create policy "site settings public read"
on public.site_settings
for select
using (true);

drop policy if exists "site settings admin insert" on public.site_settings;
create policy "site settings admin insert"
on public.site_settings
for insert
to authenticated
with check ((auth.jwt()->>'email') in ('your-admin@email.com'));

drop policy if exists "site settings admin update" on public.site_settings;
create policy "site settings admin update"
on public.site_settings
for update
to authenticated
using ((auth.jwt()->>'email') in ('your-admin@email.com'))
with check ((auth.jwt()->>'email') in ('your-admin@email.com'));
```

Replace `'your-admin@email.com'` with your real admin email.

## 3. Storage bucket for admin uploads

Create a public bucket for promo images.

If you use another name, set the same name in `VITE_SUPABASE_ADMIN_MEDIA_BUCKET`.

Default bucket name expected by the app:

```sql
insert into storage.buckets (id, name, public)
values ('admin-media', 'admin-media', true)
on conflict (id) do nothing;
```

Then add Storage policies:

```sql
drop policy if exists "admin media public read" on storage.objects;
create policy "admin media public read"
on storage.objects
for select
using (bucket_id = 'admin-media');

drop policy if exists "admin media admin insert" on storage.objects;
create policy "admin media admin insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'admin-media'
  and (auth.jwt()->>'email') in ('your-admin@email.com')
);

drop policy if exists "admin media admin update" on storage.objects;
create policy "admin media admin update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'admin-media'
  and (auth.jwt()->>'email') in ('your-admin@email.com')
)
with check (
  bucket_id = 'admin-media'
  and (auth.jwt()->>'email') in ('your-admin@email.com')
);

drop policy if exists "admin media admin delete" on storage.objects;
create policy "admin media admin delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'admin-media'
  and (auth.jwt()->>'email') in ('your-admin@email.com')
);
```

## 4. Authentication

In Supabase Auth:

1. Create the admin user with your email and password.
2. Keep Email auth enabled.
3. Use the same email in the SQL policies above.

## 5. What this powers

- Shared live promo modal for all visitors
- Shared Google rating average / review totals on the frontend
- Protected admin page at `/admin/live-promo`
- File upload from phone or desktop directly to Supabase Storage
