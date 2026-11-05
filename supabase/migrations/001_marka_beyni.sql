-- Marka Beyni tablosu
-- Supabase > SQL Editor'e yapıştırıp "Run" ile çalıştır.

create table if not exists public.markalar (
  id           uuid primary key default gen_random_uuid(),
  olusturuldu  timestamptz not null default now(),
  guncellendi  timestamptz not null default now(),
  isletme_adi  text not null,
  sektor       text not null,
  logo_yolu    text,                         -- Storage'daki logo dosyasının yolu
  cevaplar     jsonb not null default '{}'   -- tüm form cevapları (sorular.ts'deki id'lerle)
);

-- Tabloya yalnızca sunucu (service role) erişir; tarayıcıdan doğrudan erişim kapalı.
alter table public.markalar enable row level security;

-- Logolar için özel (herkese kapalı) depolama alanı
insert into storage.buckets (id, name, public)
values ('logolar', 'logolar', false)
on conflict (id) do nothing;
