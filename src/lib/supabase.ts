import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

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
