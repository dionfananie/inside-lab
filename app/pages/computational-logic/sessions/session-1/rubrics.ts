export type AnswerRubricConcept = {
  label: string;
  terms: string[];
};

export type AnswerRubric = {
  concepts: AnswerRubricConcept[];
  minWords: number;
};

export const answerRubrics: Record<number, AnswerRubric> = {
  1: {
    minWords: 12,
    concepts: [
      { label: "Pengertian logika", terms: ["ilmu", "prinsip", "aturan", "studi"] },
      { label: "Penalaran dan kesimpulan", terms: ["penalaran", "nalar", "reasoning", "menarik kesimpulan", "kesimpulan"] },
      { label: "Contoh penerapan", terms: ["contoh", "misalnya", "sehari-hari", "kehidupan", "hujan", "sekolah", "belajar"] },
    ],
  },
  2: {
    minWords: 14,
    concepts: [
      { label: "Logika sehari-hari", terms: ["sehari-hari", "bahasa alami", "bahasa sehari", "alami"] },
      { label: "Logika formal", terms: ["formal", "simbol", "formula"] },
      { label: "Ambiguitas", terms: ["ambigu", "banyak makna", "tidak jelas", "interpretasi"] },
      { label: "Alasan memakai simbol", terms: ["komputer", "evaluasi", "otomatis", "algoritma", "konsisten", "presisi"] },
    ],
  },
  3: {
    minWords: 12,
    concepts: [
      { label: "Tidak selalu benar secara faktual", terms: ["tidak selalu", "belum tentu", "bisa salah"] },
      { label: "Premis atau asumsi", terms: ["premis", "asumsi", "dasar"] },
      { label: "Validitas dan fakta", terms: ["valid", "logis", "faktual", "kenyataan", "fakta"] },
      { label: "Contoh", terms: ["contoh", "misalnya", "kucing", "terbang"] },
    ],
  },
  4: {
    minWords: 8,
    concepts: [
      { label: "P: belajar dengan rajin", terms: ["belajar", "rajin"] },
      { label: "Q: memahami materi", terms: ["memahami", "paham", "materi"] },
      { label: "Representasi implikasi", terms: ["p -> q", "p->q", "p implikasi q", "jika p maka q", "implikasi"] },
    ],
  },
  5: {
    minWords: 14,
    concepts: [
      { label: "Ambiguitas bahasa", terms: ["ambigu", "banyak makna", "tidak konsisten", "tidak jelas"] },
      { label: "Simbol dan representasi", terms: ["simbol", "representasi", "formal"] },
      { label: "Aturan", terms: ["aturan", "rule", "grammar", "struktur"] },
      { label: "Evaluasi dan algoritma", terms: ["evaluasi", "algoritma", "komputer", "proses", "otomatis"] },
    ],
  },
  6: {
    minWords: 10,
    concepts: [
      { label: "Kesimpulan possible_fever", terms: ["possible fever", "possible_fever", "demam", "fever"] },
      { label: "Suhu 39 lebih dari 38", terms: ["39", "suhu", "> 38", "lebih dari 38"] },
      { label: "Batuk bernilai true", terms: ["batuk", "true", "benar"] },
      { label: "Kedua kondisi dengan AND", terms: ["and", "dan", "kedua", "dua kondisi"] },
    ],
  },
  7: {
    minWords: 12,
    concepts: [
      { label: "Syntax memeriksa struktur", terms: ["syntax", "sintaks", "struktur", "susunan"] },
      { label: "Semantics memeriksa makna", terms: ["semantik", "semantics", "makna", "nilai"] },
      { label: "Tidak selalu TRUE", terms: ["tidak selalu", "belum tentu"] },
      { label: "Contoh P TRUE dan Q FALSE", terms: ["p = true", "q = false", "false", "salah"] },
    ],
  },
  8: {
    minWords: 8,
    concepts: [
      { label: "Hasil FALSE", terms: ["false", "salah"] },
      { label: "Implikasi", terms: ["implikasi", "->", "jika maka", "p -> q"] },
      { label: "P benar", terms: ["p benar", "p = true", "anteseden", "kondisi benar"] },
      { label: "Q salah", terms: ["q salah", "q = false", "konsekuen", "hasil salah"] },
    ],
  },
};
