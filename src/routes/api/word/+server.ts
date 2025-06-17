import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export async function GET({ url }) {
  const word = url.searchParams.get('word');
  if (!word) return json({ error: '缺少查詢單字' }, { status: 400 });

  const { data, error } = await supabase
    .from('words')
    .select('*')
    .eq('word', word);

  if (error) return json({ error: error.message }, { status: 500 });
  return json({ data });
} 