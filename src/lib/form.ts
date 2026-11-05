import { TUM_SORULAR, type Soru } from './sorular';

export type Cevap = string | string[] | number | boolean | null;

export interface AyrisimSonucu {
  cevaplar: Record<string, Cevap>;
  logo: File | null;
  hatalar: Record<string, string>; // soru id -> hata mesajı
}

// Formdan gelen ham veriyi sorular.ts'deki türlere göre temiz cevaplara çevirir
// ve zorunlu alanları kontrol eder.
export function formuAyristir(veri: FormData): AyrisimSonucu {
  const cevaplar: Record<string, Cevap> = {};
  const hatalar: Record<string, string> = {};
  let logo: File | null = null;

  for (const soru of TUM_SORULAR) {
    const cevap = tekCevap(soru, veri);

    if (soru.tur === 'dosya') {
      const dosya = veri.get(soru.id);
      logo = dosya instanceof File && dosya.size > 0 ? dosya : null;
      if (soru.zorunlu && !logo) hatalar[soru.id] = 'Lütfen bir dosya yükleyin.';
      if (logo && logo.size > 5 * 1024 * 1024) hatalar[soru.id] = 'Dosya 5 MB’tan küçük olmalı.';
      continue;
    }

    if (soru.zorunlu && bos(cevap)) {
      hatalar[soru.id] = 'Bu soru zorunlu.';
    }
    if (soru.tur === 'sayi' && typeof cevap === 'number') {
      if ((soru.min !== undefined && cevap < soru.min) || (soru.max !== undefined && cevap > soru.max)) {
        hatalar[soru.id] = `${soru.min} ile ${soru.max} arasında bir sayı girin.`;
      }
    }
    if (soru.tur === 'secim' && typeof cevap === 'string' && soru.secenekler && !soru.secenekler.includes(cevap)) {
      hatalar[soru.id] = 'Listeden bir seçenek seçin.';
    }
    cevaplar[soru.id] = cevap;
  }

  return { cevaplar, logo, hatalar };
}

function tekCevap(soru: Soru, veri: FormData): Cevap {
  switch (soru.tur) {
    case 'coklu':
      return veri.getAll(soru.id).map(String).filter((d) => soru.secenekler?.includes(d));
    case 'liste': {
      const satirlar = String(veri.get(soru.id) ?? '')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      return soru.max ? satirlar.slice(0, soru.max) : satirlar;
    }
    case 'sayi': {
      const ham = String(veri.get(soru.id) ?? '').trim();
      return ham === '' ? null : Number(ham);
    }
    case 'evethayir': {
      const ham = veri.get(soru.id);
      return ham === 'evet' ? true : ham === 'hayir' ? false : null;
    }
    case 'renk': {
      const renkler: string[] = [];
      for (let i = 0; i < (soru.max ?? 4); i++) {
        const renk = String(veri.get(`${soru.id}_${i}`) ?? '');
        const kullan = i === 0 || veri.get(`${soru.id}_kullan_${i}`) === 'on';
        if (kullan && /^#[0-9a-f]{6}$/i.test(renk)) renkler.push(renk.toLowerCase());
      }
      return renkler;
    }
    case 'dosya':
      return null;
    default:
      return String(veri.get(soru.id) ?? '').trim();
  }
}

function bos(cevap: Cevap): boolean {
  if (cevap === null || cevap === '') return true;
  if (Array.isArray(cevap)) return cevap.length === 0;
  if (typeof cevap === 'number') return Number.isNaN(cevap);
  return false;
}
