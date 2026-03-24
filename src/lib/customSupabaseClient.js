import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fsehdigyubmvronoavct.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZWhkaWd5dWJtdnJvbm9hdmN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NzU5MTEsImV4cCI6MjA3ODU1MTkxMX0.8ky5-xN67J_AzKZ8Np6qKLTmUBdHXqeTu9OQuhbn86A';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
