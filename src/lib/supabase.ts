import { createClient } from '@supabase/supabase-js'

// 注意：這兩層 fallback 是必要的
const supabaseUrl =
	typeof process !== 'undefined' && process.env.SUPABASE_URL
		? process.env.SUPABASE_URL
		: import.meta.env.VITE_SUPABASE_URL;

const supabaseAnonKey =
	typeof process !== 'undefined' && process.env.SUPABASE_ANON_KEY
		? process.env.SUPABASE_ANON_KEY
		: import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('❌ Supabase 環境變數尚未設定');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
