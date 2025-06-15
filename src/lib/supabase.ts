import { createClient } from '@supabase/supabase-js'

// SSR-safe：先從 process.env 抓，如果不存在，再 fallback 到 import.meta.env
const supabaseUrl = process.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)
