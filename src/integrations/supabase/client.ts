import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
// Support both VITE_SUPABASE_ANON_KEY and VITE_SUPABASE_PUBLISHABLE_KEY (found in some .env files)
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error(
    "[CrazeCheck] Supabase is not configured. " +
    "Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file " +
    "(or in your Vercel / hosting dashboard). " +
    "Copy .env.example to .env and fill in the values from your Supabase project settings."
  );
}

// Ensure the client is only created if we have valid arguments to avoid top-level crashes
export const supabase: SupabaseClient<Database> = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: localStorage,
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  // Return a minimal proxy so call-sites receive a readable error instead of a
  // cryptic "Cannot read properties of null" crash.
  : (new Proxy({}, {
      get() {
        throw new Error(
          "Supabase is not initialised. " +
          "Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment. " +
          "See .env.example for details."
        );
      },
    }) as unknown as SupabaseClient<Database>);