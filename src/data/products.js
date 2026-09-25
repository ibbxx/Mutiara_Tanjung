/* Produk yang benar-benar tersedia.
 *
 * Sumber foto: folder ASSET/ di root project (foto asli, bukan stok/AI).
 * File di public/images/ hanya versi diperkecil dari foto asli tersebut —
 * tidak ada crop, stretch, atau distorsi:
 * foto asli 1024 x 1536 (rasio 2:3) dan semua turunannya memakai rasio itu.
 *
 * price: kosongkan (null) bila harga belum ditetapkan — kartu produk akan
 *        menampilkan nama + deskripsi tanpa baris harga.
 * description: sesuaikan dengan profil rasa Anda.
 */

export const products = [
  {
    id: "original",
    name: "Keripik Original",
    flavor: "Original",
    description: "Varian rasa original. Cocok untuk yang tidak suka pedas.",
    price: null, // contoh: 15000
    unit: "per bungkus", // dipakai hanya bila price diisi
    image: {
      base: "/images/produk-original",
      alt: "Keripik Mutiara Tanjung varian rasa Original",
      width: 960,
      height: 1440,
    },
  },
  {
    id: "balado",
    name: "Keripik Balado",
    flavor: "Balado",
    description: "Varian rasa balado yang pedas dan bikin nagih.",
    price: null,
    unit: "per bungkus",
    image: {
      base: "/images/produk-balado",
      alt: "Keripik Mutiara Tanjung varian rasa Balado",
      width: 960,
      height: 1440,
    },
  },
  {
    id: "jagung-bakar",
    name: "Keripik Jagung Bakar",
    flavor: "Jagung Bakar",
    description: "Varian rasa jagung bakar yang manis gurih.",
    price: null,
    unit: "per bungkus",
    image: {
      base: "/images/produk-jagung-bakar",
      alt: "Keripik Mutiara Tanjung varian rasa Jagung Bakar",
      width: 960,
      height: 1440,
    },
  },
];

/* Galeri memakai foto produk yang sama pada ukuran besar — komposisi
 * editorial asimetris di desktop, carousel horizontal di mobile. */
export const gallery = [
  {
    id: "galeri-original",
    base: "/images/produk-original",
    alt: "Keripik Mutiara Tanjung varian Original",
    caption: "Original",
  },
  {
    id: "galeri-balado",
    base: "/images/produk-balado",
    alt: "Keripik Mutiara Tanjung varian Balado",
    caption: "Balado",
  },
  {
    id: "galeri-jagung-bakar",
    base: "/images/produk-jagung-bakar",
    alt: "Keripik Mutiara Tanjung varian Jagung Bakar",
    caption: "Jagung Bakar",
  },
];
