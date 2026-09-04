-- eBookies.store Supabase schema
-- Run this in the Supabase SQL editor, then set the environment variables from README.md.

create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  icon text,
  created_at timestamptz not null default now()
);

create table if not exists public.subcategories (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text,
  author text not null,
  description text not null default '',
  price numeric(10,2) not null check (price >= 0),
  original_price numeric(10,2),
  cover_url text not null,
  file_path text,
  category_slug text not null,
  subcategory_slug text,
  badge text,
  language text default 'English',
  pages integer,
  format text default 'PDF',
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  book_id uuid references public.books(id) on delete set null,
  amount numeric(10,2) not null,
  currency text not null default 'INR',
  status text not null default 'created',
  razorpay_order_id text not null unique,
  razorpay_payment_id text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;
alter table public.subcategories enable row level security;
alter table public.books enable row level security;
alter table public.orders enable row level security;

-- The app uses SUPABASE_SERVICE_ROLE_KEY only on the server. No browser-side database key is required.
-- Public storefront reads are performed through the server, so public RLS policies are intentionally omitted.

insert into storage.buckets (id, name, public)
values ('covers', 'covers', true)
on conflict (id) do update set public = true;

insert into storage.buckets (id, name, public)
values ('ebooks', 'ebooks', false)
on conflict (id) do update set public = false;

insert into public.categories (name, slug, description) values
  ('Exam Prep', 'exam-prep', 'Competitive exams, government exams and entrance preparation.'),
  ('Business & Money', 'business', 'Business, finance, startups and career growth.'),
  ('Fiction', 'fiction', 'Stories, novels and immersive reads.'),
  ('Self Growth', 'self-growth', 'Habits, psychology, productivity and personal development.')
on conflict (slug) do nothing;

insert into public.subcategories (category_id, name, slug)
select id, 'UPSC', 'upsc' from public.categories where slug = 'exam-prep'
on conflict (slug) do nothing;

insert into public.subcategories (category_id, name, slug)
select id, 'SSC', 'ssc' from public.categories where slug = 'exam-prep'
on conflict (slug) do nothing;
