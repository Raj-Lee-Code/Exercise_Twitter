import { createClient } from '@supabase/supabase-js'

const URL = import.meta.env.VITE_APP_SUPABASE_URL_KEY;
const API_KEY = import.meta.env.VITE_APP_SUPABASE_API_KEY;
export const supabase = createClient(URL, API_KEY);