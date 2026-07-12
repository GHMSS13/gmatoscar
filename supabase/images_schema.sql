-- Execute this in Supabase SQL Editor to create the images library for posts.

create extension if not exists pgcrypto;

create table if not exists public.post_images (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  mime_type text not null,
  base64_data text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_post_images_created_at on public.post_images (created_at desc);

alter table public.post_images enable row level security;

-- Public can read images that are referenced by post image URLs.
drop policy if exists "Public can read post images" on public.post_images;
create policy "Public can read post images"
on public.post_images
for select
to anon, authenticated
using (true);

-- Admin users (in admins table) can manage the image library.
drop policy if exists "Admins can manage post images" on public.post_images;
create policy "Admins can manage post images"
on public.post_images
for all
to authenticated
using (
  exists (
    select 1
    from public.admins a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  )
)
with check (
  exists (
    select 1
    from public.admins a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  )
);
