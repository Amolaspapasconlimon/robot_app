import { createClient } from "@supabase/supabase-js";


const apiURL = import.meta.env.VITE_SUPABASE_URL
const apiAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!apiURL || !apiAnonKey) {
    throw new Error('missing supabase enviorenment variables. Cheack your .env file')
}

const supabase = createClient(apiURL, apiAnonKey);
export default supabase