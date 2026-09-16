-- 「その他」受付を受付ログの種別として許可する
alter table public.reception_logs
  drop constraint if exists reception_logs_visit_type_check;

alter table public.reception_logs
  add constraint reception_logs_visit_type_check
  check (visit_type in ('appointment', 'interview', 'delivery', 'sales', 'other'));
