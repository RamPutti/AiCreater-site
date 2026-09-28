-- ==============================================================================
-- CREATORAI STUDIO - PRODUCTION SUPABASE POSTGRESQL DATABASE SCHEMA
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (Linked to auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  channel_name text,
  avatar_url text,
  niche text default 'Technology',
  subscriber_count text default '10K-50K',
  plan text default 'creator' check (plan in ('free', 'creator', 'pro', 'enterprise')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PROJECTS TABLE
create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  video_title text not null,
  topic text,
  description text,
  target_audience text default 'Modern creators and tech enthusiasts',
  platform text default 'YouTube' check (platform in ('YouTube', 'TikTok', 'Instagram', 'X/Twitter', 'LinkedIn', 'Podcast')),
  status text default 'Draft' check (status in ('Idea', 'Script', 'Recording', 'Editing', 'Ready', 'Scheduled', 'Published')),
  publishing_date date,
  thumbnail_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. SCRIPTS TABLE
create table if not exists public.scripts (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  hook text,
  introduction text,
  sections jsonb default '[]'::jsonb,
  transitions jsonb default '[]'::jsonb,
  cta text,
  outro text,
  tone text default 'Energetic',
  language text default 'English',
  target_duration text default '8-10 mins',
  word_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. TRANSCRIPTS TABLE
create table if not exists public.transcripts (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  raw_text text,
  summary text,
  key_points jsonb default '[]'::jsonb,
  important_moments jsonb default '[]'::jsonb,
  chapters jsonb default '[]'::jsonb,
  keywords jsonb default '[]'::jsonb,
  video_description text,
  action_items jsonb default '[]'::jsonb,
  summary_type text default 'standard',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. PROMPTS TABLE (Image / Visual Prompts)
create table if not exists public.prompts (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  topic text,
  subject text,
  environment text,
  visual_style text,
  mood text,
  camera_angle text,
  lighting text,
  aspect_ratio text default '16:9',
  detailed_prompt text not null,
  negative_prompt text,
  technical_specs jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. THUMBNAILS TABLE
create table if not exists public.thumbnails (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  title text not null,
  layout_preset text default 'face-bold-text',
  active_concept_id text,
  concepts jsonb default '[]'::jsonb,
  custom_elements jsonb default '[]'::jsonb,
  analysis jsonb default '{}'::jsonb,
  accent_color text default '#8B5CF6',
  aspect_ratio text default '16:9',
  exported_image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. METADATA TABLE (SEO & YouTube Metadata)
create table if not exists public.metadata (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  title_variations jsonb default '[]'::jsonb,
  selected_title text,
  description text,
  tags jsonb default '[]'::jsonb,
  keywords jsonb default '[]'::jsonb,
  hashtags jsonb default '[]'::jsonb,
  chapters jsonb default '[]'::jsonb,
  pinned_comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. CONTENT CALENDAR TABLE
create table if not exists public.content_calendar (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  platform text not null,
  publishing_date date not null,
  publishing_time time default '18:00',
  status text default 'Scheduled',
  description text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. SUBSCRIPTIONS TABLE
create table if not exists public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  plan_tier text not null check (plan_tier in ('free', 'creator', 'pro')),
  status text default 'active' check (status in ('active', 'past_due', 'canceled', 'trialing')),
  current_period_start timestamp with time zone not null,
  current_period_end timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. SAVED TOOLS & PRESETS
create table if not exists public.saved_tools (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  tool_type text not null check (tool_type in ('transcript', 'script', 'prompt', 'thumbnail', 'metadata')),
  name text not null,
  configuration jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.scripts enable row level security;
alter table public.transcripts enable row level security;
alter table public.prompts enable row level security;
alter table public.thumbnails enable row level security;
alter table public.metadata enable row level security;
alter table public.content_calendar enable row level security;
alter table public.subscriptions enable row level security;
alter table public.saved_tools enable row level security;

-- Profiles: Users can view & update only their own profile
create policy "Users can view their own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

-- Projects: Users can manage only their own projects
create policy "Users can CRUD their own projects" on public.projects
  for all using (auth.uid() = user_id);

-- Child tables: Tied to project_id where projects.user_id = auth.uid()
create policy "Users can access their own scripts" on public.scripts
  for all using (
    exists (select 1 from public.projects where projects.id = scripts.project_id and projects.user_id = auth.uid())
  );

create policy "Users can access their own transcripts" on public.transcripts
  for all using (
    exists (select 1 from public.projects where projects.id = transcripts.project_id and projects.user_id = auth.uid())
  );

create policy "Users can access their own prompts" on public.prompts
  for all using (
    exists (select 1 from public.projects where projects.id = prompts.project_id and projects.user_id = auth.uid())
  );

create policy "Users can access their own thumbnails" on public.thumbnails
  for all using (
    exists (select 1 from public.projects where projects.id = thumbnails.project_id and projects.user_id = auth.uid())
  );

create policy "Users can access their own metadata" on public.metadata
  for all using (
    exists (select 1 from public.projects where projects.id = metadata.project_id and projects.user_id = auth.uid())
  );

create policy "Users can CRUD their own calendar" on public.content_calendar
  for all using (auth.uid() = user_id);

-- Performance Indexes
create index if not exists idx_projects_user_id on public.projects(user_id);
create index if not exists idx_calendar_user_date on public.content_calendar(user_id, publishing_date);
create index if not exists idx_scripts_project_id on public.scripts(project_id);
create index if not exists idx_thumbnails_project_id on public.thumbnails(project_id);
