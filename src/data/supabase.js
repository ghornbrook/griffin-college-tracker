import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://dowhbtutgrsnuqafpsdt.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvd2hidHV0Z3JzbnVxYWZwc2R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1ODgxNTksImV4cCI6MjA5MTE2NDE1OX0.yh9IW-cxCNbDJqByZK-SViFp9yuYelYovuFhLhL0S_s'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
