import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ecawccuugwvntwhafzci.supabase.co"  // your project URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjYXdjY3V1Z3d2bnR3aGFmemNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzOTg2MTksImV4cCI6MjA3Mzk3NDYxOX0.0WRSRz2eDne3hKiM9C2izhsAlJl0rsl49bUf7JamfDY"

export const supabase = createClient(supabaseUrl, supabaseKey)


// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
