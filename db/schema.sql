-- Core schema for scheduler service

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role_type text check (role_type in ('freelancer','student','worker','other')) default 'other',
  created_at timestamptz default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  scope text check (scope in ('work','private')) not null,
  name text not null,
  color text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists schedules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  scope text check (scope in ('work','private')) not null,
  title text not null,
  note text,
  category_id uuid references categories(id) on delete set null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  is_completed boolean default false,
  reminder_enabled boolean default true,
  reminder_minutes_before int default 10,
  recurrence_rule text,
  created_at timestamptz default now()
);

create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);

create table if not exists schedule_tags (
  schedule_id uuid references schedules(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (schedule_id, tag_id)
);

create table if not exists usage_limits (
  user_id uuid primary key references profiles(id) on delete cascade,
  free_usage_count int default 0,
  is_subscribed boolean default false,
  subscription_provider text,
  subscription_expires_at timestamptz
);
