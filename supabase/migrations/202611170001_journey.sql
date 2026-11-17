-- Entitlements are provisioned only by a trusted administrator/billing integration.
create table public.premium_entitlements (
 user_id uuid primary key references auth.users(id) on delete cascade,
 active boolean not null default false,
 expires_at timestamptz not null
);
alter table public.premium_entitlements enable row level security;
revoke all on public.premium_entitlements from anon, authenticated;
create function public.has_active_premium() returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.premium_entitlements where user_id = auth.uid() and active and expires_at > now());
$$;
revoke all on function public.has_active_premium() from public;
grant execute on function public.has_active_premium() to authenticated;
create table public.journeys (
 user_id uuid primary key references auth.users(id) on delete cascade,
 active jsonb,
 history jsonb not null default '[]',
 revision integer not null default 0
);
alter table public.journeys enable row level security;
revoke all on public.journeys from anon, authenticated;
-- All mutations go through the locked, account-scoped RPC. No user ID or plan is accepted from clients.
create function public.journey_action(action text, goal text default null, expected_revision integer default null)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare j public.journeys; w integer; d integer;
begin
 if auth.uid() is null then raise exception 'authentication_required'; end if;
 if not public.has_active_premium() then raise exception 'premium_required'; end if;
 if action not in ('read','select','advance') then raise exception 'invalid_action'; end if;
 insert into public.journeys(user_id) values(auth.uid()) on conflict do nothing;
 select * into j from public.journeys where user_id = auth.uid() for update;
 if action <> 'read' and (expected_revision is null or expected_revision <> j.revision) then raise exception 'revision_conflict'; end if;
 if action = 'select' then
   if goal is null or goal not in ('Get in Shape','Get Lean','Overall Fitness','Build Muscles','Lose Weight') then raise exception 'invalid_goal'; end if;
   if j.active is null or j.active->>'goal' <> goal then
     if j.active is not null then j.history := j.history || jsonb_build_array(j.active || jsonb_build_object('endedAt',now())); end if;
     j.active := jsonb_build_object('id',gen_random_uuid(),'goal',goal,'week',1,'day',1,'completed',false,'startedAt',now());
     j.revision := j.revision + 1;
   end if;
 elsif action = 'advance' then
   if j.active is null then raise exception 'no_active_journey'; end if;
   if not (j.active->>'completed')::boolean then
     w := (j.active->>'week')::integer; d := (j.active->>'day')::integer;
     if w = 5 and d = 7 then j.active := j.active || '{"completed":true}'::jsonb;
     else j.active := j.active || jsonb_build_object('week',case when d=7 then w+1 else w end,'day',case when d=7 then 1 else d+1 end); end if;
     j.revision := j.revision + 1;
   end if;
 end if;
 update public.journeys set active=j.active, history=j.history, revision=j.revision where user_id=auth.uid();
 return jsonb_build_object('active',j.active,'history',j.history,'revision',j.revision);
end;
$$;
revoke all on function public.journey_action(text,text,integer) from public;
grant execute on function public.journey_action(text,text,integer) to authenticated;
