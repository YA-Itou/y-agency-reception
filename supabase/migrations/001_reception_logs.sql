-- 受付ログ
create table if not exists public.reception_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  visit_type text not null check (visit_type in ('appointment', 'interview', 'delivery', 'sales')),
  company_name text,
  visitor_name text,
  staff_name text,
  carrier text,
  delivery_need text check (delivery_need in ('stamp_required', 'drop_off', 'must_receive')),
  chatwork_status text not null check (chatwork_status in ('sent', 'failed')),
  chatwork_message_id text,
  error_message text
);

create index if not exists reception_logs_created_at_idx
  on public.reception_logs (created_at desc);

alter table public.reception_logs enable row level security;
