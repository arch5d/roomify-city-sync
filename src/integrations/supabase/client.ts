
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oidnzqzhurrjpbiqodqt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pZG56cXpodXJyanBiaXFvZHF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNDQzODEsImV4cCI6MjA2NDcyMDM4MX0.0w_nTfGF7DSTy-Ed9wEYc3V8IIotodMqDrNHdLXEbH0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
