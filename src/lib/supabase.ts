import { createClient } from '@supabase/supabase-js';

// Bu bağlantı yalnızca sunucuda kullanılır. Service role anahtarı
// tam yetkilidir; asla tarayıcıya gönderilmemeli.
export function sunucuSupabase() {
  const url = import.meta.env.SUPABASE_URL;
  const anahtar = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anahtar) {
    throw new Error('SUPABASE_URL veya SUPABASE_SERVICE_ROLE_KEY tanımlı değil (.env dosyasına bak).');
  }
  return createClient(url, anahtar, { auth: { persistSession: false } });
}
