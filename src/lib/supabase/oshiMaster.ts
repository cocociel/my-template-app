import { createClient } from '@supabase/supabase-js';

// サーバー側でデータを取るための、シンプルなクライアント
export function createOshiMasterClient() {
  return createClient(
    process.env.NEXT_PUBLIC_OSHI_MASTER_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_OSHI_MASTER_SUPABASE_ANON_KEY!
  );
}
