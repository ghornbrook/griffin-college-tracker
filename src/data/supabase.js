import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://undawhzbyheyjfjoogqu.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_XgcwNgVL1-TYwqzJ8J990w_uhLmL6XE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
