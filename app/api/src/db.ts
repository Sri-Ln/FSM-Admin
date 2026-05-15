import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import { config } from './config/env.js';

export const db = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
  realtime: { transport: ws },
});
