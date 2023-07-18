import { createClient } from '@supabase/supabase-js'

const URL = 'https://phrntdnuiitnkpxewjhq.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBocm50ZG51aWl0bmtweGV3amhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwNjY2OTQsImV4cCI6MTk5NjY0MjY5NH0.I7S80gdOISkwz5Zrsa5IYo_drP9xWXzCTrk_QFO-bYc';

export const supabase = createClient(URL, API_KEY);