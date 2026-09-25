/* ============================================================================
 * SEMUA DATA BISNIS ADA DI FILE INI.
 * Ganti nilainya dengan data Mutiara Tanjung yang sebenarnya lalu simpan.
 * Field yang masih kosong ("") sengaja tidak dikarang — UI otomatis
 * menyembunyikan atau menandainya sebagai belum tersedia.
 * ==========================================================================*/

export const site = {
  name: "Mutiara Tanjung",
  /* Deskripsi singkat brand — dipakai di footer + meta description. */
  tagline: "Keripik lezat, renyah, dan bikin nagih.",

  /* ---------------------------------------------------------------------
   * KONTAK
   * whatsapp: isi dengan format internasional tanpa tanda baca,
   *           contoh: "6281234567890" (tanpa +, spasi, atau tanda hubung).
   *           Selama kosong, semua tombol "Pesan Sekarang" mengarah ke
   *           bagian Kontak dan tidak membuka WhatsApp.
   * -------------------------------------------------------------------*/
  whatsapp: "",
  whatsappMessage:
    "Halo Mutiara Tanjung, saya ingin mengetahui produk keripik yang tersedia.",

  instagram: "", // contoh: "mutiaratanjung" (tanpa @)
  email: "", // contoh: "halo@mutiaratanjung.id"
  address: "", // contoh: "Jl. ... , Tanjung ..."
  marketplace: [
    /* contoh: { label: "Shopee", url: "https://shopee.co.id/..." } */
  ],

  /* Baris kecil di ujung kanan navigasi desktop. */
  navMeta: "Keripik UMKM",

  /* Navigasi utama — label & urutan sesuai permintaan. */
  nav: [
    { label: "Home", href: "#home" },
    { label: "Produk", href: "#produk" },
    { label: "Tentang Kami", href: "#tentang" },
    { label: "Keunggulan", href: "#keunggulan" },
    { label: "Kontak", href: "#kontak" },
  ],
};

export const hero = {
  label: "Keripik UMKM Mutiara Tanjung",
  title: "Keripik Lezat, Renyah, dan Bikin Nagih.",
  description:
    "Mutiara Tanjung menghadirkan keripik berkualitas dengan cita rasa yang cocok untuk menemani setiap momen.",
  primaryCta: { label: "Lihat Produk", href: "#produk" },
  secondaryCta: { label: "Pesan Sekarang" },
  mediaAlt: "Keripik Mutiara Tanjung varian Original",
  mediaCaption: "Keripik Mutiara Tanjung varian Original.",
};

export const productsSection = {
  title: "Produk Unggulan",
  description:
    "Tiga varian rasa yang tersedia saat ini. Semua foto di halaman ini adalah foto produk asli Mutiara Tanjung.",
  /* Pesan di kartu produk. Ubah bila Anda ingin teks lain. */
  cardAction: "Pesan",
};

export const about = {
  title: "Tentang Mutiara Tanjung",
  caption: "Mutiara Tanjung",
  /* Tulis cerita singkat brand Anda di sini (2–3 paragraf pendek). */
  paragraphs: [
    "Mutiara Tanjung adalah usaha rumahan yang menjual keripik. Kami mulai dari hal sederhana: membuat camilan yang bisa dinikmati bersama keluarga, lalu membagikannya lebih luas lewat pesanan dari mulut ke mulut.",
    "Sampai hari ini kami masih mengerjakan semuanya sendiri — dari memilih bahan, mengolah, sampai mengemas pesanan sebelum dikirim. Karena itu kami senang bila Anda bertanya langsung sebelum memesan.",
  ],
  /* Catatan: sesuaikan atau hapus kalimat di atas bila ceritanya berbeda. */
};

export const featuresSection = {
  title: "Kenapa Mutiara Tanjung?",
  description:
    "Empat hal yang paling sering membuat pelanggan kembali memesan.",
  items: [
    {
      name: "Rasa",
      body: "Tiga varian yang gampang disukai: Original, Balado, dan Jagung Bakar.",
    },
    {
      name: "Renyah",
      body: "Tekstur renyah yang bikin sulit berhenti setelah suapan pertama.",
    },
    {
      name: "Kualitas",
      body: "Rasa dan teksturnya kami jaga tetap sama di setiap pesanan.",
    },
    {
      name: "Lokal",
      body: "Produk UMKM Indonesia — dipesan langsung ke rumah produksinya.",
    },
  ],
};

export const gallerySection = {
  title: "Galeri",
  description: "Beberapa tampilan produk yang kami jual hari ini.",
  /* Foto diambil dari ASSET/ — tidak ada gambar stok atau AI. */
};

export const momentsSection = {
  title: "Cocok untuk Berbagai Momen",
  description:
    "Belum ada ulasan pelanggan yang kami cantumkan di halaman ini — kami tidak menampilkan testimoni yang tidak nyata. Yang bisa kami pastikan, keripik ini sering dipesan untuk momen berikut.",
  items: [
    {
      name: "Nonton & kumpul santai",
      body: "Camilan yang gampang disajikan saat ada tamu atau acara di rumah.",
    },
    {
      name: "Oleh-oleh",
      body: "Cocok dibawa saat berkunjung atau pulang ke kampung halaman.",
    },
    {
      name: "Acara keluarga",
      body: "Bisa dipesan dalam jumlah banyak untuk arisan, syukuran, atau pesta kecil.",
    },
    {
      name: "Hampers & bingkisan",
      body: "Bisa jadi isian bingkisan bila Anda ingin memberi camilan khas daerah.",
    },
  ],
};

export const ctaSection = {
  title: "Siap Menikmati Keripik Mutiara Tanjung?",
  description:
    "Pesan sekarang dan nikmati camilan renyah untuk menemani setiap momen.",
  cta: { label: "Pesan Sekarang" },
};

export const contactSection = {
  title: "Kontak",
  description:
    "Pesan langsung lewat WhatsApp supaya lebih cepat. Kami juga menerima pertanyaan soal varian, jumlah, dan pengiriman.",
};

export const footer = {
  description:
    "UMKM keripik Mutiara Tanjung. Varian Original, Balado, dan Jagung Bakar.",
  copyright: `© ${new Date().getFullYear()} Mutiara Tanjung. Seluruh hak cipta dilindungi.`,
};

export const stickyCta = {
  note: "Keripik Mutiara Tanjung",
  cta: { label: "Pesan Sekarang" },
};
