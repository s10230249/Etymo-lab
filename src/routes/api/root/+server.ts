import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export async function GET({ url }) {
  const root_form = url.searchParams.get('root_form');
  if (!root_form) return json({ error: '缺少查詢字根' }, { status: 400 });

  const { data, error } = await supabase
    .from('roots')
    .select('*')
    .eq('root_form', root_form);

  if (error) return json({ error: error.message }, { status: 500 });
  return json({ data });
} 