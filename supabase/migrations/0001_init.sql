create type tipo_servicio as enum ('Corte', 'Color', 'Tratamiento');

create table public.services (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  nombre     text not null,
  fecha      date not null,
  tipo       tipo_servicio not null,
  valor      integer not null check (valor >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index services_user_fecha_idx on public.services (user_id, fecha desc);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger services_updated_at
  before update on public.services
  for each row execute function set_updated_at();

alter table public.services enable row level security;

create policy "Owner select" on public.services
  for select using (auth.uid() = user_id);

create policy "Owner insert" on public.services
  for insert with check (auth.uid() = user_id);

create policy "Owner update" on public.services
  for update using (auth.uid() = user_id);

create policy "Owner delete" on public.services
  for delete using (auth.uid() = user_id);
