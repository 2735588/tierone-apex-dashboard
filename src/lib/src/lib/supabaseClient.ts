import { createClient } from "@supabase/supabase-js";

// These come from your Vite env (define in .env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase env vars missing. Using mock API instead.");
}

// Export both: (a) real supabase client if env is present, (b) a flag
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const hasSupabase = !!supabase;
