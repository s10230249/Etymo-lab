import { createClient } from '@supabase/supabase-js'

// SSR 與開發環境雙支援
const supabaseUrl =
	process.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey =
	process.env.SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('❌ Supabase 環境變數未設定')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
