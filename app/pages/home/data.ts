const siteName = "insideLab";

export const chapterDescriptions: Record<string, string> = {
  "values-types-operators":
    "Kenali nilai, tipe data, operator, perbandingan, dan cara mengubah data.",
  "program-structure":
    "Susun ekspresi, percabangan, dan perulangan menjadi alur program yang jelas.",
  functions:
    "Pelajari parameter, return, scope, closure, rekursi, dan desain fungsi.",
  "objects-arrays":
    "Olah kumpulan data melalui array, objek, destructuring, spread, dan JSON.",
  "higher-order-functions":
    "Gunakan fungsi sebagai nilai dan olah data dengan filter, map, reduce, serta komposisi.",
  "object-oriented-programming":
    "Pahami method, prototype, class, enkapsulasi, iterator, dan pewarisan di JavaScript.",
  "bugs-errors":
    "Temukan bug lebih cepat dengan validasi, testing, debugging, exception, dan assertion.",
  "regular-expressions":
    "Kenali, ekstrak, validasi, dan ubah pola teks menggunakan regular expression.",
  modules:
    "Susun program menjadi modul dengan interface, dependensi, package, dan desain API yang jelas.",
  "asynchronous-programming":
    "Kelola pekerjaan yang menunggu dengan callback, Promise, async/await, dan event loop.",
};

export const stageDescriptions = {
  Prediksi: "Baca kode dan bentuk model mental sebelum menjalankannya.",
  Lengkapi: "Isi bagian penting sambil mempertahankan struktur yang tersedia.",
  Bangun: "Rangkai solusi sendiri, lalu uji dengan beberapa kasus.",
} as const;

export function createWebsiteSchema(origin?: string) {
  return origin
    ? {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        inLanguage: "id-ID",
        url: origin,
      }
    : null;
}
