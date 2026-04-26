-- Create profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  is_pro boolean default false,
  credits integer default 5,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create validations table for evaluated ideas
create table if not exists public.validations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  idea_text text not null,
  score integer not null,
  result_json jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.validations enable row level security;

-- Policies for profiles
create policy "Users can view own profile" 
on profiles for select 
using (auth.uid() = id);

create policy "Users can update own profile" 
on profiles for update 
using (auth.uid() = id);

-- Policies for validations
create policy "Users can view own validations" 
on validations for select 
using (auth.uid() = user_id);

create policy "Users can insert own validations" 
on validations for insert 
with check (auth.uid() = user_id);

-- Trigger to automatically create a profile for new users
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, credits, is_pro)
  values (new.id, 3, false);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
