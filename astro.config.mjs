// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Panel sunucu tarafında çalışır (form kaydı, ajan çağrıları),
// bu yüzden çıktı "server" ve Vercel adaptörü kullanılıyor.
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: 'https://app.agenticreklam.com',
});
