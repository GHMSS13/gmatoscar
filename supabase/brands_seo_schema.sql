-- Execute this file in Supabase SQL Editor.
-- It creates an editable CMS structure for Marcas/Modelos with SEO-friendly data.

create extension if not exists pgcrypto;

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  country text not null,
  description text not null,
  founded int not null,
  top_model text not null,
  max_speed text not null,
  color text not null,
  logo_url text not null,
  hero_image_url text not null,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.brand_timeline (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.brands(id) on delete cascade,
  year int not null,
  title text not null,
  description text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.brand_models (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.brands(id) on delete cascade,
  slug text not null unique,
  name text not null,
  year text not null,
  highlight text not null,
  category text not null,
  image_url text not null,
  description text not null,
  power text not null,
  top_speed text not null,
  acceleration text not null,
  drivetrain text not null,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_brands_slug on public.brands(slug);
create index if not exists idx_brands_published on public.brands(published);
create index if not exists idx_brand_timeline_brand_id on public.brand_timeline(brand_id);
create index if not exists idx_brand_models_brand_id on public.brand_models(brand_id);
create index if not exists idx_brand_models_slug on public.brand_models(slug);
create index if not exists idx_brand_models_published on public.brand_models(published);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_brands_updated_at on public.brands;
create trigger trg_brands_updated_at
before update on public.brands
for each row
execute function public.set_updated_at();

drop trigger if exists trg_brand_models_updated_at on public.brand_models;
create trigger trg_brand_models_updated_at
before update on public.brand_models
for each row
execute function public.set_updated_at();

alter table public.brands enable row level security;
alter table public.brand_timeline enable row level security;
alter table public.brand_models enable row level security;

-- Public read policies (only published records)
drop policy if exists "Public can read published brands" on public.brands;
create policy "Public can read published brands"
on public.brands
for select
to anon, authenticated
using (published = true);

drop policy if exists "Public can read published brand timeline" on public.brand_timeline;
create policy "Public can read published brand timeline"
on public.brand_timeline
for select
to anon, authenticated
using (
  exists (
    select 1 from public.brands b
    where b.id = brand_timeline.brand_id
      and b.published = true
  )
);

drop policy if exists "Public can read published brand models" on public.brand_models;
create policy "Public can read published brand models"
on public.brand_models
for select
to anon, authenticated
using (
  published = true
  and exists (
    select 1 from public.brands b
    where b.id = brand_models.brand_id
      and b.published = true
  )
);

-- Admin write policies (based on admins table email)
drop policy if exists "Admins can manage brands" on public.brands;
create policy "Admins can manage brands"
on public.brands
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

drop policy if exists "Admins can manage brand timeline" on public.brand_timeline;
create policy "Admins can manage brand timeline"
on public.brand_timeline
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

drop policy if exists "Admins can manage brand models" on public.brand_models;
create policy "Admins can manage brand models"
on public.brand_models
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

-- Seed brands
insert into public.brands (slug, name, country, description, founded, top_model, max_speed, color, logo_url, hero_image_url, published)
values
  ('ferrari', 'Ferrari', 'Italia', 'Referencia em superesportivos italianos com foco em desempenho e design.', 1939, 'Ferrari F80', '350+ km/h', '#ff2800', 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1200', true),
  ('lamborghini', 'Lamborghini', 'Italia', 'Marca com visual agressivo e foco em supercarros V10 e V12.', 1963, 'Revuelto', '350 km/h', '#ffd700', 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200', true),
  ('bugatti', 'Bugatti', 'Franca', 'Hipercarros de luxo com foco em velocidade maxima e exclusividade.', 1909, 'Tourbillon', '445 km/h', '#003087', 'https://images.pexels.com/photos/6311656/pexels-photo-6311656.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/6311656/pexels-photo-6311656.jpeg?auto=compress&cs=tinysrgb&w=1200', true),
  ('mclaren', 'McLaren', 'Reino Unido', 'Marca britanica com heranca de Formula 1 e supercarros leves.', 1963, 'McLaren W1', '350 km/h', '#ff8000', 'https://images.pexels.com/photos/128794/pexels-photo-128794.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/128794/pexels-photo-128794.jpeg?auto=compress&cs=tinysrgb&w=1200', true),
  ('porsche', 'Porsche', 'Alemanha', 'Tradicao em esportivos com engenharia precisa e performance consistente.', 1931, '911 GT3 RS', '296 km/h', '#c8102e', 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200', true),
  ('koenigsegg', 'Koenigsegg', 'Suecia', 'Especialista em hypercars de producao limitada e recordes de velocidade.', 1994, 'Gemera', '400+ km/h', '#1a1a1a', 'https://images.pexels.com/photos/1753086/pexels-photo-1753086.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/1753086/pexels-photo-1753086.jpeg?auto=compress&cs=tinysrgb&w=1200', true),
  ('pagani', 'Pagani', 'Italia', 'Hypercars artesanais com design escultural e engenharia extrema.', 1992, 'Utopia', '340 km/h', '#c0c0c0', 'https://images.pexels.com/photos/2402142/pexels-photo-2402142.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/2402142/pexels-photo-2402142.jpeg?auto=compress&cs=tinysrgb&w=1200', true),
  ('rimac', 'Rimac', 'Croacia', 'Referencia em hypercars eletricos e tecnologias de baterias.', 2009, 'Nevera R', '415 km/h', '#0a84ff', 'https://images.pexels.com/photos/1918137/pexels-photo-1918137.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/1918137/pexels-photo-1918137.jpeg?auto=compress&cs=tinysrgb&w=1200', true)
on conflict (slug) do update
set
  name = excluded.name,
  country = excluded.country,
  description = excluded.description,
  founded = excluded.founded,
  top_model = excluded.top_model,
  max_speed = excluded.max_speed,
  color = excluded.color,
  logo_url = excluded.logo_url,
  hero_image_url = excluded.hero_image_url,
  published = excluded.published,
  updated_at = now();

-- Clean and seed timeline/model data
delete from public.brand_timeline;
delete from public.brand_models;

insert into public.brand_timeline (brand_id, year, title, description, sort_order)
select b.id, t.year, t.title, t.description, t.sort_order
from public.brands b
join (
  values
    ('ferrari', 1939, 'Fundacao', 'Enzo Ferrari inicia a operacao que daria origem a marca.', 1),
    ('ferrari', 1947, 'Primeiro Ferrari', '125 S marca o inicio oficial da fabricante.', 2),
    ('ferrari', 2024, 'Nova geracao', 'Fase de alto desempenho com novas tecnologias.', 3),
    ('lamborghini', 1963, 'Fundacao', 'Ferruccio Lamborghini cria a empresa.', 1),
    ('lamborghini', 1974, 'Countach', 'Design radical define a identidade da marca.', 2),
    ('lamborghini', 2023, 'Revuelto', 'Entrada forte na era hibrida.', 3),
    ('bugatti', 1909, 'Fundacao', 'Ettore Bugatti funda a marca.', 1),
    ('bugatti', 2005, 'Veyron', 'Novo padrao de velocidade e luxo.', 2),
    ('bugatti', 2024, 'Tourbillon', 'Nova fase da marca no topo do segmento.', 3)
) as t(slug, year, title, description, sort_order)
  on b.slug = t.slug;

insert into public.brand_models (
  brand_id,
  slug,
  name,
  year,
  highlight,
  category,
  image_url,
  description,
  power,
  top_speed,
  acceleration,
  drivetrain,
  published,
  sort_order
)
select
  b.id,
  m.slug,
  m.name,
  m.year,
  m.highlight,
  m.category,
  m.image_url,
  m.description,
  m.power,
  m.top_speed,
  m.acceleration,
  m.drivetrain,
  true,
  m.sort_order
from public.brands b
join (
  values
    ('ferrari', 'ferrari-f40', 'Ferrari F40', '1987', 'Icone da Ferrari e referencia entre os supercarros classicos.', 'Supercarro classico', 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Um dos carros mais emblematicos da historia da Ferrari.', '478 cv', '324 km/h', '3.8 s', 'RWD', 1),
    ('ferrari', 'ferrari-enzo', 'Ferrari Enzo', '2002', 'Tecnologia inspirada na Formula 1 em producao limitada.', 'Hypercars', 'https://images.pexels.com/photos/1627877/pexels-photo-1627877.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Modelo de transicao da Ferrari para uma nova era de performance.', '660 cv', '350 km/h', '3.6 s', 'RWD', 2),
    ('ferrari', 'ferrari-laferrari', 'Ferrari LaFerrari', '2013', 'Hibrido de altissima performance com motor V12.', 'Hypercars hibridos', 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200', 'A entrada da Ferrari no segmento de hypercars hibridos.', '963 cv', '350+ km/h', '2.8 s', 'RWD', 3),
    ('ferrari', 'ferrari-sf90-stradale', 'Ferrari SF90 Stradale', '2019', 'PHEV que combina uso real com desempenho extremo.', 'Supercarro hibrido plug-in', 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Evolucao da Ferrari com tracao integral e eletrificacao.', '1000 cv', '340 km/h', '2.5 s', 'AWD', 4),
    ('ferrari', 'ferrari-purosangue', 'Ferrari Purosangue', '2022', 'Primeiro crossover de alta performance da marca.', 'Crossover de alta performance', 'https://images.pexels.com/photos/6311656/pexels-photo-6311656.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Novo formato de carroceria sem abrir mao do DNA Ferrari.', '725 cv', '310 km/h', '3.3 s', 'AWD', 5),
    ('lamborghini', 'lamborghini-revuelto', 'Lamborghini Revuelto', '2023', 'Novo V12 hibrido da marca italiana.', 'Hypercars hibridos', 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Marco da Lamborghini na nova era eletrificada.', '1015 cv', '350 km/h', '2.5 s', 'AWD', 1),
    ('bugatti', 'bugatti-tourbillon', 'Bugatti Tourbillon', '2024', 'Novo hiper GT de luxo e altissima velocidade.', 'Hypercars', 'https://images.pexels.com/photos/6311656/pexels-photo-6311656.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Modelo que representa a nova fase da Bugatti.', '1800 cv', '445 km/h', '2.0 s', 'AWD', 1),
    ('mclaren', 'mclaren-w1', 'McLaren W1', '2024', 'Top model moderno da McLaren com foco em pista.', 'Hypercars', 'https://images.pexels.com/photos/128794/pexels-photo-128794.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Evolucao da linhagem de carros extremos da McLaren.', '1275 cv', '350 km/h', '2.7 s', 'RWD', 1),
    ('porsche', 'porsche-911-gt3-rs', 'Porsche 911 GT3 RS', '2023', 'Precisao de pista em um esportivo de rua.', 'Supercarro de pista', 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Modelo icone da Porsche com foco em aerodinamica.', '525 cv', '296 km/h', '3.2 s', 'RWD', 1),
    ('koenigsegg', 'koenigsegg-gemera', 'Koenigsegg Gemera', '2020', 'Hypercars de 4 lugares com proposta unica.', 'Hypercars', 'https://images.pexels.com/photos/1753086/pexels-photo-1753086.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Combina luxo, tecnologia e desempenho extremo.', '2300 cv', '400+ km/h', '1.9 s', 'AWD', 1),
    ('pagani', 'pagani-utopia', 'Pagani Utopia', '2022', 'Artesanal, exclusivo e focado na experiencia de conduzir.', 'Hypercars artesanais', 'https://images.pexels.com/photos/2402142/pexels-photo-2402142.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Representa a filosofia mais pura da Pagani moderna.', '864 cv', '340 km/h', '2.8 s', 'RWD', 1),
    ('rimac', 'rimac-nevera-r', 'Rimac Nevera R', '2024', 'Evolucao extrema do hypercar eletrico da marca.', 'Hypercars eletricos', 'https://images.pexels.com/photos/1918137/pexels-photo-1918137.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Uma das maiores referencias globais em EV de alta performance.', '2128 cv', '415 km/h', '1.74 s', 'AWD', 1)
) as m(brand_slug, slug, name, year, highlight, category, image_url, description, power, top_speed, acceleration, drivetrain, sort_order)
  on b.slug = m.brand_slug;
