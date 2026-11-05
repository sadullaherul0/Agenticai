# AgenticAI

İşletmelere yapay zekâ ajanlarından oluşan hazır bir dijital ajans sunan platform.
Bu depo, işletme panelinin kodudur (app.agenticreklam.com).

## Şu an neler var (Aşama 1, 1. adım)

- **Karşılama sayfası** (`/`)
- **Marka Beyni kayıt formu** (`/kayit`): 6 grupta 26 soru
- **Kayıt servisi** (`/api/marka-beyni`): cevapları kontrol eder, logoyu yükler, veritabanına yazar
- **Veritabanı tablosu**: `veritabani/migrations/001_marka_beyni.sql`

## Klasörler

| Yer | Ne var |
| --- | --- |
| `src/lib/sorular.ts` | **Soru listesi.** Soru eklemek, çıkarmak veya değiştirmek için yalnızca burayı düzenle; form kendini günceller. |
| `src/lib/form.ts` | Form cevaplarını kontrol eden kod |
| `src/lib/supabase.ts` | Veritabanı bağlantısı |
| `src/pages/` | Sayfalar (dosya adı = adres) |
| `src/components/` | Sayfalarda tekrar kullanılan parçalar |
| `src/layouts/` | Ortak sayfa düzeni ve renkler |
| `veritabani/migrations/` | Veritabanı tabloları |

## Kurulum

### 1. Veritabanı (bir kez)

Supabase'de projeni aç → sol menüden **SQL Editor** → `veritabani/migrations/001_marka_beyni.sql`
dosyasının içeriğini yapıştır → **Run**.

### 2. Vercel'e bağlama

1. Vercel'de **Add New → Project** → bu GitHub deposunu seç
2. **Environment Variables** bölümüne `.env.example` dosyasındaki üç değeri gir:
   - `SUPABASE_URL` ve `SUPABASE_SERVICE_ROLE_KEY`: Supabase → Project Settings → API
   - `ANTHROPIC_API_KEY`: console.anthropic.com → API Keys
3. **Deploy**

### 3. Alan adı

Vercel'de projede **Settings → Domains** → `app.agenticreklam.com` ekle.
Vercel'in gösterdiği CNAME kaydını alan adını yönettiğin yerde (DNS) ekle.

## Güvenlik notları

- `SUPABASE_SERVICE_ROLE_KEY` tam yetkili bir anahtardır. Asla sohbete, koda veya ekran görüntüsüne koyma.
- Bu ilk sürümde giriş (şifre) yok: formu adresi bilen herkes doldurabilir. Pilot için sorun değil;
  üyelik sistemi sonraki adımlarda eklenecek.
