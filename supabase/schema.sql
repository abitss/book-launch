-- eBookies.store minimal Supabase schema
-- The public catalog is maintained in data/catalog.ts.
-- Supabase is used only for optional order persistence and private ebook delivery.

create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  book_id text not null,
  amount numeric(10,2) not null,
  currency text not null default 'INR',
  status text not null default 'created',
  razorpay_order_id text not null unique,
  razorpay_payment_id text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

-- The app uses SUPABASE_SERVICE_ROLE_KEY only on the server.
-- No public database policy or browser-side Supabase key is required.

insert into storage.buckets (id, name, public)
values ('ebooks', 'ebooks', false)
on conflict (id) do update set public = false;
