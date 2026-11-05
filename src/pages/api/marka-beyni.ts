import type { APIRoute } from 'astro';
import { formuAyristir } from '@/lib/form';
import { sunucuSupabase } from '@/lib/supabase';

// Kayıt formu buraya gönderilir: cevaplar kontrol edilir,
// logo Storage'a yüklenir, Marka Beyni veritabanına yazılır.
export const POST: APIRoute = async ({ request, redirect }) => {
  const veri = await request.formData();
  const { cevaplar, logo, hatalar } = formuAyristir(veri);

  if (Object.keys(hatalar).length > 0) {
    return new Response(JSON.stringify({ hatalar }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabase = sunucuSupabase();

  let logoYolu: string | null = null;
  if (logo) {
    const uzanti = logo.name.split('.').pop()?.toLowerCase() || 'png';
    logoYolu = `${crypto.randomUUID()}.${uzanti}`;
    const { error } = await supabase.storage
      .from('logolar')
      .upload(logoYolu, logo, { contentType: logo.type || undefined });
    if (error) {
      console.error('Logo yüklenemedi:', error);
      return hataYaniti('Logo yüklenirken bir sorun oluştu, lütfen tekrar deneyin.');
    }
  }

  const { data, error } = await supabase
    .from('markalar')
    .insert({
      isletme_adi: cevaplar.isletme_adi as string,
      sektor: cevaplar.sektor as string,
      logo_yolu: logoYolu,
      cevaplar,
    })
    .select('id')
    .single();

  if (error || !data) {
    console.error('Marka kaydedilemedi:', error);
    return hataYaniti('Kayıt sırasında bir sorun oluştu, lütfen tekrar deneyin.');
  }

  return redirect(`/tesekkurler?marka=${data.id}`, 303);
};

function hataYaniti(mesaj: string) {
  return new Response(JSON.stringify({ hatalar: { genel: mesaj } }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  });
}
