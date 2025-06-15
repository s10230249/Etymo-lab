import { browser } from '$app/environment'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabase: SupabaseClient | null = null

if (browser) {
	const url = import.meta.env.VITE_SUPABASE_URL
	const key = import.meta.env.VITE_SUPABASE_ANON_KEY
	if (url && key) {
		supabase = createClient(url, key)
	} else {
		console.warn('⚠️ Supabase browser-side 環境變數未設定')
	}
} else {
	const url = process.env.SUPABASE_URL
	const key = process.env.SUPABASE_ANON_KEY
	if (url && key) {
		supabase = createClient(url, key)
	} else {
		console.warn('⚠️ Supabase server-side 環境變數未設定')
	}
}

export { supabase }
