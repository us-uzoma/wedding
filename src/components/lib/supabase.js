import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xpvxidkjknrqihnvprnf.supabase.co"
const supabaseKey = "sb_publishable_2vZMYxW5KtUNJL0yjB6ccg_f5YfHazx"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
