import { createClient } from '@supabase/supabase-js';

// Διαβάζουμε τα κλειδιά από το .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Δημιουργούμε και εξάγουμε τη σύνδεση
export const supabase = createClient(supabaseUrl, supabaseAnonKey);