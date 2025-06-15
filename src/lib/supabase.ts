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

export async function testSupabaseConnection() {
	if (!supabase) {
		console.error('❌ Supabase client 未初始化。請檢查環境變數。')
		return false
	}
	try {
		const { data, error } = await supabase.from('words').select('id').limit(1)

		if (error) {
			console.error('❌ Supabase 連線測試失敗：', error.message)
			return false
		} else {
			console.log('✅ Supabase 連線測試成功！')
			return true
		}
	} catch (err) {
		console.error('❌ Supabase 連線時發生意外錯誤：', err)
		return false
	}
}
