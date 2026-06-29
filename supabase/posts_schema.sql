-- Execute this in Supabase SQL Editor to restore the posts pipeline.

create extension if not exists pgcrypto;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  category text not null,
  date date not null,
  read_time text not null,
  image_url text not null,
  external_url text,
  featured boolean not null default false,
  hot boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_posts_published_date on public.posts (published, date desc);
create index if not exists idx_posts_slug on public.posts (slug);
create index if not exists idx_posts_category on public.posts (category);

create or replace function public.set_posts_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_posts_updated_at on public.posts;
create trigger trg_posts_updated_at
before update on public.posts
for each row
execute function public.set_posts_updated_at();

alter table public.posts enable row level security;

-- Public can read only published posts
drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
on public.posts
for select
to anon, authenticated
using (published = true);

-- Admin users (in admins table) can manage posts
drop policy if exists "Admins can manage posts" on public.posts;
create policy "Admins can manage posts"
on public.posts
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
