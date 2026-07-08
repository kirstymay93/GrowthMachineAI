-- GrowthMachineAI Cloud Database

create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamp default now()
);


create table content_library (

  id uuid primary key default gen_random_uuid(),

  user_id uuid references users(id)
  on delete cascade,

  topic text not null,

  content text not null,

  created_at timestamp default now()

);


create table generations (

  id uuid primary key default gen_random_uuid(),

  user_id uuid references users(id)
  on delete cascade,

  topic text,

  created_at timestamp default now()

);


alter table users enable row level security;

alter table content_library enable row level security;

alter table generations enable row level security;


create policy "Users can view own content"
on content_library
for select
using (auth.uid() = user_id);


create policy "Users can insert own content"
on content_library
for insert
with check (auth.uid() = user_id);


create policy "Users can delete own content"
on content_library
for delete
using (auth.uid() = user_id);