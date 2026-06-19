-- Core schema for scheduler service
-- 스터디 코스모스 - 중3/고1 전용 학습 플랫폼

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role_type text check (role_type in ('freelancer','student','worker','other')) default 'student',
  grade text,  -- 중3, 고1 등
  created_at timestamptz default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  scope text check (scope in ('work','private','study')) not null default 'study',
  name text not null,
  color text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists schedules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  scope text check (scope in ('work','private','study')) not null default 'study',
  title text not null,
  note text,
  subject text,
  category_id uuid references categories(id) on delete set null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  is_completed boolean default false,
  reminder_enabled boolean default true,
  reminder_minutes_before int default 10,
  recurrence_rule text,
  is_exam_period boolean default false,
  created_at timestamptz default now()
);

create table if not exists exam_schedules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  subject text not null,
  exam_date date not null,
  exam_time time,
  exam_range text,
  difficulty int check (difficulty between 1 and 5),
  created_at timestamptz default now()
);

create table if not exists wrong_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  subject text not null,
  problem_text text not null,
  image_url text,
  memo text,
  tags text[],
  difficulty int check (difficulty between 1 and 3) default 2,
  solved boolean default false,
  created_at timestamptz default now()
);

create table if not exists career_bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  career_id text not null,
  career_title text not null,
  created_at timestamptz default now()
);

create table if not exists highschool_bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  school_id text not null,
  school_name text not null,
  created_at timestamptz default now()
);

create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);

create table if not exists usage_limits (
  user_id uuid primary key references profiles(id) on delete cascade,
  free_usage_count int default 0,
  is_subscribed boolean default false,
  subscription_provider text,
  subscription_expires_at timestamptz
);
