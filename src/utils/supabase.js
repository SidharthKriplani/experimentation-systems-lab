// Supabase client singleton — returns null if env vars are not set.
// All callers must check for null before using.
//
// SQL schema — run in Supabase SQL editor:
// create table user_progress (
//   id uuid primary key default gen_random_uuid(),
//   user_id uuid references auth.users(id) on delete cascade not null,
//   key text not null,
//   value jsonb not null,
//   updated_at timestamptz default now(),
//   unique(user_id, key)
// );
// alter table user_progress enable row level security;
// create policy "Users can manage own progress" on user_progress
//   for all using (auth.uid() = user_id);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
