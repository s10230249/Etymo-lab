import { createClient } from '@supabase/supabase-js'

// SSR: Vercel 使用 process.env
// 本地 dev: Vite 使用 import.meta.env
const supabaseUrl =
	process.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey =
	process.env.SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('❌ Supabase 環境變數尚未設定');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
