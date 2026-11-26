-- Alma story library: base schema.
--
-- One Supabase project holds every university's library. Each row carries a
-- university_id, and row level security limits a signed-in person to the
-- universities they are a member of. Alma's own staff can read and write all
-- of it. Nothing is readable without signing in.
--
-- Search is hybrid: full-text search (tsvector) and semantic search (pgvector)
-- combined with reciprocal rank fusion. Embeddings are 384-dimensional and
-- normalized (the gte-small model that runs inside Supabase Edge Functions),
-- so the index and the query use the inner product.

create extension if not exists vector with schema extensions;
create extension if not exists pg_trgm with schema extensions;

-- ---------------------------------------------------------------------------
-- Tenants and people who may sign in
-- ---------------------------------------------------------------------------

create table public.universities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  created_at timestamptz not null default now()
);

create type public.member_role as enum ('reader', 'editor');

-- University staff who may use that university's library.
create table public.members (
  university_id uuid not null references public.universities (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role public.member_role not null default 'reader',
  created_at timestamptz not null default now(),
  primary key (university_id, user_id)
);

create index members_user_id_idx on public.members (user_id);

-- Alma's own team. Rows are added by hand in SQL, never through the API.
create table public.alma_staff (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Stories
-- ---------------------------------------------------------------------------

create type public.relationship as enum ('alumni', 'faculty', 'staff', 'friend');
create type public.story_status as enum ('draft', 'published');

create table public.stories (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references public.universities (id) on delete cascade,
  person_name text not null,
  relationship public.relationship not null,
  headline text not null,
  summary text,
  body text not null,
  class_year smallint check (class_year between 1850 and 2100),
  college text,
  field_of_study text,
  career text,
  location text,
  themes text[] not null default '{}',
  status public.story_status not null default 'draft',
  interviewed_on date,
  published_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  fts tsvector generated always as (
    setweight(to_tsvector('english', coalesce(person_name, '')), 'A')
    || setweight(to_tsvector('english', coalesce(headline, '')), 'A')
    || setweight(to_tsvector('english', coalesce(summary, '')), 'B')
    || setweight(
      to_tsvector(
        'english',
        coalesce(career, '') || ' ' || coalesce(field_of_study, '') || ' '
        || coalesce(college, '') || ' ' || coalesce(location, '')
      ),
      'B'
    )
    || setweight(to_tsvector('english', coalesce(body, '')), 'C')
  ) stored
);

create index stories_university_idx on public.stories (university_id, status);
create index stories_class_year_idx on public.stories (university_id, class_year);
create index stories_fts_idx on public.stories using gin (fts);
create index stories_themes_idx on public.stories using gin (themes);
create index stories_name_trgm_idx on public.stories using gin (person_name extensions.gin_trgm_ops);

-- A story is split into passages. Each passage is embedded and searched.
create table public.story_chunks (
  id bigint generated always as identity primary key,
  story_id uuid not null references public.stories (id) on delete cascade,
  university_id uuid not null references public.universities (id) on delete cascade,
  position int not null,
  content text not null,
  embedding extensions.vector(384),
  fts tsvector generated always as (to_tsvector('english', content)) stored,
  unique (story_id, position)
);

create index story_chunks_university_idx on public.story_chunks (university_id);
create index story_chunks_fts_idx on public.story_chunks using gin (fts);
create index story_chunks_embedding_idx on public.story_chunks
  using hnsw (embedding extensions.vector_ip_ops);

-- Where a story has run, so an editor can see what has been used and when.
create table public.story_uses (
  id bigint generated always as identity primary key,
  story_id uuid not null references public.stories (id) on delete cascade,
  university_id uuid not null references public.universities (id) on delete cascade,
  channel text not null,
  used_on date not null default current_date,
  note text,
  created_by uuid default auth.uid() references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index story_uses_story_idx on public.story_uses (story_id);
create index story_uses_university_idx on public.story_uses (university_id, used_on);
create index story_uses_created_by_idx on public.story_uses (created_by);

-- The university's editorial calendar: issues, appeals and campaigns.
create table public.calendar_items (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references public.universities (id) on delete cascade,
  title text not null,
  theme text,
  starts_on date,
  created_by uuid default auth.uid() references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index calendar_items_university_idx on public.calendar_items (university_id, starts_on);
create index calendar_items_created_by_idx on public.calendar_items (created_by);

-- ---------------------------------------------------------------------------
-- Helpers for the policies. They live in a schema the API does not expose.
-- ---------------------------------------------------------------------------

create schema if not exists private;

create function private.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.alma_staff s where s.user_id = (select auth.uid())
  );
$$;

create function private.is_member(target uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.members m
    where m.university_id = target and m.user_id = (select auth.uid())
  );
$$;

create function private.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

revoke all on function private.is_staff() from public, anon;
revoke all on function private.is_member(uuid) from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.is_staff() to authenticated;
grant execute on function private.is_member(uuid) to authenticated;

create trigger stories_touch_updated_at
  before update on public.stories
  for each row
  execute function private.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------

alter table public.universities enable row level security;
alter table public.members enable row level security;
alter table public.alma_staff enable row level security;
alter table public.stories enable row level security;
alter table public.story_chunks enable row level security;
alter table public.story_uses enable row level security;
alter table public.calendar_items enable row level security;

-- Nothing is available to visitors who have not signed in.
revoke all on all tables in schema public from anon;

create policy "Members and staff can see a university"
  on public.universities for select to authenticated
  using ((select private.is_member(id)) or (select private.is_staff()));

create policy "Staff add universities"
  on public.universities for insert to authenticated
  with check ((select private.is_staff()));

create policy "Staff change universities"
  on public.universities for update to authenticated
  using ((select private.is_staff()))
  with check ((select private.is_staff()));

create policy "Staff remove universities"
  on public.universities for delete to authenticated
  using ((select private.is_staff()));

create policy "People see their own memberships"
  on public.members for select to authenticated
  using (user_id = (select auth.uid()) or (select private.is_staff()));

create policy "Staff add memberships"
  on public.members for insert to authenticated
  with check ((select private.is_staff()));

create policy "Staff change memberships"
  on public.members for update to authenticated
  using ((select private.is_staff()))
  with check ((select private.is_staff()));

create policy "Staff remove memberships"
  on public.members for delete to authenticated
  using ((select private.is_staff()));

create policy "Staff can see the staff list"
  on public.alma_staff for select to authenticated
  using (user_id = (select auth.uid()) or (select private.is_staff()));

create policy "Members read published stories"
  on public.stories for select to authenticated
  using (
    (status = 'published' and (select private.is_member(university_id)))
    or (select private.is_staff())
  );

create policy "Staff add stories"
  on public.stories for insert to authenticated
  with check ((select private.is_staff()));

create policy "Staff change stories"
  on public.stories for update to authenticated
  using ((select private.is_staff()))
  with check ((select private.is_staff()));

create policy "Staff remove stories"
  on public.stories for delete to authenticated
  using ((select private.is_staff()));

create policy "Members read passages of published stories"
  on public.story_chunks for select to authenticated
  using (
    (
      (select private.is_member(university_id))
      and exists (
        select 1
        from public.stories s
        where s.id = story_id and s.status = 'published'
      )
    )
    or (select private.is_staff())
  );

create policy "Staff add passages"
  on public.story_chunks for insert to authenticated
  with check ((select private.is_staff()));

create policy "Staff change passages"
  on public.story_chunks for update to authenticated
  using ((select private.is_staff()))
  with check ((select private.is_staff()));

create policy "Staff remove passages"
  on public.story_chunks for delete to authenticated
  using ((select private.is_staff()));

create policy "Members keep the record of where stories ran"
  on public.story_uses for all to authenticated
  using ((select private.is_member(university_id)) or (select private.is_staff()))
  with check ((select private.is_member(university_id)) or (select private.is_staff()));

create policy "Members keep their editorial calendar"
  on public.calendar_items for all to authenticated
  using ((select private.is_member(university_id)) or (select private.is_staff()))
  with check ((select private.is_member(university_id)) or (select private.is_staff()));

-- ---------------------------------------------------------------------------
-- Hybrid search over one university's published stories
-- ---------------------------------------------------------------------------

-- Runs with the caller's own rights, so row level security still applies.
-- Pass query_embedding as null to search by keyword only.
create function public.search_stories(
  p_university uuid,
  query_text text,
  query_embedding extensions.vector(384) default null,
  match_count int default 8,
  filter_relationship public.relationship default null,
  filter_college text default null,
  filter_career text default null,
  filter_theme text default null,
  year_from int default null,
  year_to int default null,
  full_text_weight float default 1,
  semantic_weight float default 1,
  rrf_k int default 50
)
returns table (
  story_id uuid,
  chunk_id bigint,
  person_name text,
  relationship public.relationship,
  headline text,
  class_year smallint,
  college text,
  field_of_study text,
  career text,
  themes text[],
  content text,
  score float
)
language sql
stable
set search_path = public, extensions
as $$
  with eligible as (
    select s.id
    from stories s
    where s.university_id = p_university
      and s.status = 'published'
      and (filter_relationship is null or s.relationship = filter_relationship)
      and (filter_college is null or s.college = filter_college)
      and (filter_career is null or s.career ilike '%' || filter_career || '%')
      and (filter_theme is null or s.themes @> array[filter_theme])
      and (year_from is null or s.class_year >= year_from)
      and (year_to is null or s.class_year <= year_to)
  ),
  full_text as (
    select
      c.id,
      row_number() over (
        order by ts_rank_cd(c.fts, websearch_to_tsquery('english', query_text)) desc
      ) as rank_ix
    from story_chunks c
    where c.story_id in (select e.id from eligible e)
      and c.fts @@ websearch_to_tsquery('english', query_text)
    order by rank_ix
    limit least(match_count, 30) * 2
  ),
  semantic as (
    select
      c.id,
      row_number() over (order by c.embedding <#> query_embedding) as rank_ix
    from story_chunks c
    where query_embedding is not null
      and c.embedding is not null
      and c.story_id in (select e.id from eligible e)
    order by rank_ix
    limit least(match_count, 30) * 2
  )
  select
    s.id,
    c.id,
    s.person_name,
    s.relationship,
    s.headline,
    s.class_year,
    s.college,
    s.field_of_study,
    s.career,
    s.themes,
    c.content,
    (
      coalesce(1.0 / (rrf_k + ft.rank_ix), 0.0) * full_text_weight
      + coalesce(1.0 / (rrf_k + sem.rank_ix), 0.0) * semantic_weight
    )::float as score
  from full_text ft
  full outer join semantic sem on ft.id = sem.id
  join story_chunks c on c.id = coalesce(ft.id, sem.id)
  join stories s on s.id = c.story_id
  order by score desc
  limit least(match_count, 30);
$$;

revoke all on function public.search_stories(
  uuid, text, extensions.vector, int, public.relationship, text, text, text, int, int, float, float, int
) from public, anon;

grant execute on function public.search_stories(
  uuid, text, extensions.vector, int, public.relationship, text, text, text, int, int, float, float, int
) to authenticated;
