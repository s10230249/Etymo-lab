import { createClient } from '@supabase/supabase-js'

// 完整雙層 fallback：瀏覽器也不會報錯
const supabaseUrl =
	typeof process !== 'undefined' && process.env?.SUPABASE_URL
		? process.env.SUPABASE_URL
		: import.meta.env.VITE_SUPABASE_URL || '';

const supabaseAnonKey =
	typeof process !== 'undefined' && process.env?.SUPABASE_ANON_KEY
		? process.env.SUPABASE_ANON_KEY
		: import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// ❌ 不再 throw，保證 browser 不會崩潰
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
