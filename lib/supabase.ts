import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log("¿URL cargada?:", !!supabaseUrl) // Debería decir true en la consola del navegador

export const supabase = createClient(supabaseUrl, supabaseAnonKey)