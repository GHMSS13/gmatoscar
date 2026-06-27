-- Supabase initialization script for GMATOSCAR
-- Run this in your Supabase SQL editor.

create extension if not exists "pgcrypto";

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  category text not null,
  date date not null,
  read_time text,
  image_url text,
  external_url text,
  featured boolean not null default false,
  hot boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  email text not null unique,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

alter table public.posts enable row level security;
alter table public.admins enable row level security;

create policy "Public can select published posts" on public.posts
  for select using (published = true);

create policy "Admins can insert posts" on public.posts
  for insert using (
    exists (
      select 1 from public.admins
      where (user_id = auth.uid() or email = auth.email())
    )
  );

create policy "Admins can update posts" on public.posts
  for update using (
    exists (
      select 1 from public.admins
      where (user_id = auth.uid() or email = auth.email())
    )
  ) with check (
    exists (
      select 1 from public.admins
      where (user_id = auth.uid() or email = auth.email())
    )
  );

create policy "Admins can delete posts" on public.posts
  for delete using (
    exists (
      select 1 from public.admins
      where (user_id = auth.uid() or email = auth.email())
    )
  );

create policy "Admins can view own record" on public.admins
  for select using (auth.email() = email);

-- Optional: create a default admin using your Google email.
-- Replace 'your.admin@email.com' with your real Google account.
-- insert into public.admins (email) values ('your.admin@email.com');

-- Import existing posts
insert into public.posts (title, slug, excerpt, content, category, date, read_time, image_url, external_url, featured, hot) values
('Bugatti Tourbillon: O Hipercarro que Redefine Limites com 1.800 CV', 'bugatti-tourbillon-1800cv', 'A Bugatti apresentou o Tourbillon, seu mais recente hipercarro com motor V16 híbrido capaz de atingir 445 km/h. Descubra todos os detalhes deste monstro sobre rodas.', 'A Bugatti apresentou o Tourbillon, um hipercarro de 1.800 CV que redefine limites de performance. Com um motor V16 híbrido e tecnologia aerodinâmica avançada, o modelo promete velocidade extrema e luxo sem precedentes.\n\nO Tourbillon traz um design escultural acompanhado de um interior focado em conforto e detalhes exclusivos. Esta é uma nova era para a Bugatti, que segue impressionando entusiastas e colecionadores.', 'Lançamentos', '2026-06-25', '4 min', 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800', null, true, true),
('Ferrari F80: O Sucessor do LaFerrari Chega com 1.200 CV', 'ferrari-f80-1200cv', 'A Ferrari revelou oficialmente o F80, hipercarro híbrido que sucede o lendário LaFerrari. Apenas 799 unidades serão produzidas e já estão todas vendidas.', 'A Ferrari revelou o F80, sucessor do LaFerrari e uma demonstração clara de engenharia híbrida de alta performance. Com 1.200 CV, o F80 combina um motor de última geração com um acabamento artesanal característico da marca.', 'Ferrari', '2026-06-22', '3 min', 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800', null, true, true),
('Lamborghini Temerario: O Urus das Pistas chega para destronar o Huracán', 'lamborghini-temerario', 'A Lamborghini apresentou o Temerario, novo supercarro que substitui o Huracán com motor V8 biturbo híbrido e 920 CV de potência total.', 'A Lamborghini trouxe o Temerario, um supercarro com DNA de pista que herda a ousadia e a tecnologia da marca. Equipado com um V8 biturbo híbrido, o modelo entrega 920 CV e promete aceleração agressiva sem abrir mão de presença visual.', 'Lamborghini', '2026-06-20', '3 min', 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800', null, false, true),
('Porsche 911 GT3 RS 2026: Mais Extremo e Mais Rápido que Nunca', 'porsche-911-gt3-rs-2026', 'A Porsche atualizou o 911 GT3 RS para 2026 com 525 CV e aerodinâmica refinada. O carro circundou Nürburgring em tempo recorde para um carro de série.', 'A Porsche apresenta o 911 GT3 RS 2026, com 525 CV e uma aerodinâmica refinada para máxima performance. O modelo mantém o equilíbrio entre dirigibilidade e velocidade, e demonstrou seu potencial em Nürburgring.', 'Porsche', '2026-06-18', '4 min', 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800', null, false, false),
('McLaren W1: O Mais Rápido da Marca Britânica é uma Obra de Arte', 'mclaren-w1', 'O W1 substitui o P1 com motor V8 híbrido de 1.275 CV e carroceria em carbono. McLaren promete 0-100 km/h em menos de 2,7 segundos.', 'A McLaren W1 chega como nova obra de arte britânica, substituindo o P1 com um V8 híbrido de 1.275 CV e carroceria totalmente em fibra de carbono. A marca promete desempenho extremo e comportamento refinado.', 'McLaren', '2026-06-15', '5 min', 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800', null, false, false),
('Rimac Nevera R: Elétrico mais Poderoso do Mundo com 2.128 CV', 'rimac-nevera-r', 'A Rimac apresentou o Nevera R, versão atualizada do hipercarro elétrico croata com 2.128 CV. Aceleração de 0-100 km/h em apenas 1,74 segundos.', 'A Rimac revela o Nevera R, a versão mais extrema do hipercarro elétrico croata, com 2.128 CV e aceleração de 0-100 km/h em apenas 1,74 segundos. É um marco em performance elétrica e engenharia automotiva.', 'Elétricos', '2026-06-12', '3 min', 'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=800', null, false, true),
('Koenigsegg Gemera: O Megacarro de Família com 2.300 CV', 'koenigsegg-gemera', 'Quatro lugares, bagageiro e 2.300 CV. O Koenigsegg Gemera é o hipercarro mais peculiar já criado. Saiba como a marca sueca fez isso possível.', 'O Koenigsegg Gemera é um megacarro familiar com 2.300 CV, quatro lugares e um porta-malas funcional. Ele demonstra que a Koenigsegg consegue unir desempenho absoluto com mais praticidade que qualquer outro hipercarro.', 'Koenigsegg', '2026-06-10', '4 min', 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800', null, false, false),
('Aston Martin Valiant: O V12 de 705 CV que Homenageia a Marca', 'aston-martin-valiant', 'O Aston Martin Valiant é um tributo puro ao V12 atmosférico, desenvolvido com a Red Bull Advanced Technologies para 5.000 unidades mundiais.', 'O Aston Martin Valiant celebra o V12 atmosférico com 705 CV, resultando em uma edição limitada de 5.000 unidades. Desenvolvido junto da Red Bull Advanced Technologies, o carro mistura tradição e tecnologia moderna.', 'Aston Martin', '2026-06-08', '3 min', 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800', null, false, false),
('Top 5: Os Supercarros Mais Bonitos de 2026 Segundo os Fãs', 'top-5-supercarros-mais-bonitos-2026', 'Realizamos uma pesquisa com mais de 50 mil seguidores e chegamos ao ranking definitivo dos carros mais bonitos do ano. O resultado vai te surpreender.', 'A pesquisa com mais de 50 mil seguidores revelou os supercarros mais bonitos de 2026. O ranking mostra modelos que combinam design, exclusividade e presença de pista.', 'Rankings', '2026-06-05', '6 min', 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800', null, false, false);
