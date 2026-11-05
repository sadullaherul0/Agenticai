// Marka Beyni soru listesi.
// Kayıt formu bu dosyadan otomatik üretilir: soru eklemek, çıkarmak
// veya değiştirmek için sadece bu listeyi düzenlemen yeterli.

export type CevapTuru =
  | 'kisa'      // tek satır metin
  | 'uzun'      // çok satırlı metin
  | 'baglanti'  // web adresi
  | 'secim'     // listeden tek seçim
  | 'coklu'     // listeden çoklu seçim
  | 'liste'     // her satıra bir madde
  | 'sayi'
  | 'renk'      // en fazla 4 renk
  | 'dosya'
  | 'evethayir';

export interface Soru {
  id: string;            // veritabanında cevabın kaydedildiği anahtar
  soru: string;
  tur: CevapTuru;
  zorunlu: boolean;
  ipucu?: string;
  secenekler?: string[];
  min?: number;
  max?: number;
  kullananlar: string[]; // bu cevabı okuyacak ajanlar
}

export interface SoruGrubu {
  baslik: string;
  sorular: Soru[];
}

export const SEKTORLER = [
  'Davetiye ve matbaa',
  'Restoran ve kafe',
  'Mağaza ve perakende',
  'E-ticaret',
  'Güzellik ve bakım',
  'Sağlık ve klinik',
  'Eğitim',
  'Emlak',
  'Otomotiv',
  'Otel ve konaklama',
  'Diğer',
];

export const SORU_GRUPLARI: SoruGrubu[] = [
  {
    baslik: 'İşletme kimliği',
    sorular: [
      { id: 'isletme_adi', soru: 'İşletmenizin adı nedir?', tur: 'kisa', zorunlu: true, kullananlar: ['Tüm ajanlar'] },
      { id: 'sektor', soru: 'Hangi sektördesiniz?', tur: 'secim', secenekler: SEKTORLER, zorunlu: true, kullananlar: ['Tüm ajanlar'] },
      { id: 'bolge', soru: 'Hangi şehirde / bölgede hizmet veriyorsunuz?', tur: 'kisa', zorunlu: true, kullananlar: ['İçerik', 'Reklam', 'SEO'] },
      { id: 'hikaye', soru: 'İşletmenizin hikâyesini 2-3 cümleyle anlatın', tur: 'uzun', zorunlu: false, kullananlar: ['İçerik', 'Influencer'] },
      { id: 'web_sitesi', soru: 'Web siteniz', tur: 'baglanti', zorunlu: false, ipucu: 'https://...', kullananlar: ['Pazar Analizi'] },
      { id: 'instagram', soru: 'Instagram hesabınız', tur: 'kisa', zorunlu: true, ipucu: '@kullaniciadi', kullananlar: ['Pazar Analizi', 'Yayın'] },
    ],
  },
  {
    baslik: 'Ürün ve hizmetler',
    sorular: [
      {
        id: 'urunler', soru: 'Ana ürün ve hizmetleriniz', tur: 'liste', zorunlu: true,
        ipucu: 'Her satıra bir ürün: Ad | kısa açıklama | fiyat aralığı',
        kullananlar: ['İçerik', 'Tasarım', 'DM'],
      },
      { id: 'cok_satanlar', soru: 'En çok satan 3 ürününüz hangisi?', tur: 'liste', zorunlu: true, ipucu: 'Her satıra bir ürün adı', max: 3, kullananlar: ['İçerik Planlama'] },
      { id: 'farklar', soru: 'Sizi rakiplerinizden ayıran 3 şey nedir?', tur: 'liste', zorunlu: true, ipucu: 'Her satıra bir madde', max: 3, kullananlar: ['İçerik', 'Reklam'] },
      { id: 'sezonlar', soru: 'Yoğun sezonlarınız ve önemli özel günleriniz', tur: 'liste', zorunlu: false, ipucu: 'Örn: Haziran-Eylül düğün sezonu', kullananlar: ['İçerik Planlama'] },
      {
        id: 'siparis_kanallari', soru: 'Müşteriler sipariş veya randevuyu nasıl veriyor?', tur: 'coklu', zorunlu: true,
        secenekler: ['Instagram DM', 'WhatsApp', 'Telefon', 'Web sitesi', 'Mağazada'],
        kullananlar: ['İçerik', 'DM'],
      },
    ],
  },
  {
    baslik: 'Hedef kitle',
    sorular: [
      { id: 'ideal_musteri', soru: 'İdeal müşterinizi tarif edin', tur: 'uzun', zorunlu: true, ipucu: 'Yaş, ilgi alanı, ne arıyor', kullananlar: ['Tüm ajanlar'] },
      {
        id: 'sss', soru: 'Müşterilerin en sık sorduğu 5 soru ve cevapları', tur: 'liste', zorunlu: true,
        ipucu: 'Her satıra: Soru | Cevap', max: 5, kullananlar: ['DM'],
      },
      { id: 'tereddutler', soru: 'Müşterileri satın almadan önce en çok ne düşündürüyor?', tur: 'uzun', zorunlu: false, kullananlar: ['İçerik', 'Reklam'] },
    ],
  },
  {
    baslik: 'Marka dili ve görsel kimlik',
    sorular: [
      { id: 'ses_tonu', soru: 'Markanız nasıl konuşur?', tur: 'secim', secenekler: ['Samimi', 'Kurumsal', 'Eğlenceli', 'Lüks', 'Sıcak'], zorunlu: true, kullananlar: ['Tüm ajanlar'] },
      { id: 'hitap', soru: 'Müşteriye nasıl hitap ediyorsunuz?', tur: 'secim', secenekler: ['Sen', 'Siz'], zorunlu: true, kullananlar: ['İçerik', 'DM'] },
      { id: 'emoji', soru: 'Emoji kullanımı', tur: 'secim', secenekler: ['Hiç', 'Az', 'Bol'], zorunlu: true, kullananlar: ['İçerik', 'DM'] },
      { id: 'yasak_kelimeler', soru: 'Asla kullanılmaması gereken kelime veya konular', tur: 'liste', zorunlu: false, kullananlar: ['Kalite Kontrol'] },
      { id: 'logo', soru: 'Logonuz', tur: 'dosya', zorunlu: true, ipucu: 'PNG, JPG veya SVG', kullananlar: ['Tasarım'] },
      { id: 'renkler', soru: 'Marka renkleriniz', tur: 'renk', zorunlu: true, max: 4, kullananlar: ['Tasarım'] },
      { id: 'ilham_hesaplar', soru: 'Beğendiğiniz 3 Instagram hesabı veya paylaşım', tur: 'liste', zorunlu: false, max: 3, kullananlar: ['Tasarım', 'İçerik'] },
    ],
  },
  {
    baslik: 'Rakipler ve hedefler',
    sorular: [
      { id: 'rakipler', soru: 'En büyük 3 rakibinizin Instagram hesapları', tur: 'liste', zorunlu: false, max: 3, kullananlar: ['Rakip Takip', 'Pazar Analizi'] },
      { id: 'ana_hedef', soru: 'Bu dönemdeki ana hedefiniz', tur: 'secim', secenekler: ['Satış', 'Takipçi', 'Bilinirlik', 'Mağaza ziyareti'], zorunlu: true, kullananlar: ['İçerik Planlama', 'Raporlama'] },
      { id: 'haftalik_paylasim', soru: 'Haftada kaç paylaşım istiyorsunuz?', tur: 'sayi', min: 3, max: 14, zorunlu: true, kullananlar: ['İçerik Planlama'] },
    ],
  },
  {
    baslik: 'Yetkiler',
    sorular: [
      { id: 'dm_fiyat', soru: "DM'de fiyat bilgisi verilebilir mi?", tur: 'evethayir', zorunlu: true, kullananlar: ['DM'] },
      { id: 'kampanya_onerisi', soru: 'Ajanlar kampanya veya indirim önerebilir mi?', tur: 'evethayir', zorunlu: true, kullananlar: ['İçerik Planlama'] },
    ],
  },
];

export const TUM_SORULAR: Soru[] = SORU_GRUPLARI.flatMap((g) => g.sorular);
