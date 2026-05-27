import { supabase } from './supabase.js';

export const PROGRESS_KEYS = [
  'pal-stat-foundations-progress-v1',
  'pal-stats-progress-v1',
  'pal-metrics-progress-v2',
  'pal-rca-progress-v1',
  'pal-cases-progress-v1',
  'pal-growth-analytics-progress-v1',
  'pal-behavioral-progress-v1',
  'pal-estimation-progress-v1',
  'pal-design-progress-v1',
  'pal-bi-progress-v1',
  'pal-spot-the-flaw-progress-v1',
  'pal-take-home-progress-v1',
  'pal-instrumentation-progress-v1',
  'pal-challenges-progress-v1',
  'pal-bookmarks-v1',
  'pal-exp-foundations-progress-v1',
  'pal-metrics-foundations-progress-v1',
  'pal-rca-foundations-progress-v1',
];

export async function pushProgressToSupabase(user) {
  if (!supabase || !user) return;
  const rows = [];
  for (const key of PROGRESS_KEYS) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) continue;
      const value = JSON.parse(raw);
      rows.push({
        user_id: user.id,
        key,
        value,
        updated_at: new Date().toISOString(),
      });
    } catch (e) {
      // skip keys with non-JSON values
    }
  }
  if (rows.length === 0) return;
  await supabase
    .from('user_progress')
    .upsert(rows, { onConflict: 'user_id,key' });
}

export async function pullProgressFromSupabase(user) {
  if (!supabase || !user) return;
  const { data, error } = await supabase
    .from('user_progress')
    .select('key, value')
    .eq('user_id', user.id);
  if (error || !data) return;
  for (const row of data) {
    try {
      localStorage.setItem(row.key, JSON.stringify(row.value));
    } catch (e) {
      // ignore storage quota errors
    }
  }
}
