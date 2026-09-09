import {
  Binary,
  Braces,
  Bug,
  GitBranch,
  GraduationCap,
  MessageSquareCode,
  Network,
  TestTube2,
  Wrench,
} from "lucide-react";

import type { EngineeringSkill, Language, RoadmapStep } from "./types";

export const languages = [
  {
    id: "javascript",
    short: "JS",
    name: "JavaScript",
    role: "Bangun sesuatu yang langsung terlihat.",
    description:
      "Mulai dari logika dasar, lalu hidupkan antarmuka web dan pahami bagaimana aplikasi bekerja di browser.",
    accent: "#d9f56a",
    uses: ["Fondasi programming", "Web interaktif", "Frontend & backend"],
    code: [
      ["const", " goals = [\"learn\", \"build\", \"ship\"];"] ,
      ["", ""],
      ["goals.map", "(step => step.toUpperCase());"],
    ],
  },
  {
    id: "python",
    short: "PY",
    name: "Python",
    role: "Ubah ide menjadi solusi dengan cepat.",
    description:
      "Pelajari sintaks yang ringkas untuk otomasi, pengolahan data, backend, dan eksplorasi machine learning.",
    accent: "#7fd7ff",
    uses: ["Problem solving", "Automation & data", "Backend & AI"],
    code: [
      ["goals", " = [\"learn\", \"build\", \"ship\"]"],
      ["", ""],
      ["result", " = [step.upper() for step in goals]"],
    ],
  },
  {
    id: "java",
    short: "JV",
    name: "Java",
    role: "Rancang program besar dengan struktur kuat.",
    description:
      "Latih object-oriented programming, tipe data yang tegas, dan pola yang banyak dipakai pada sistem enterprise.",
    accent: "#ff9e78",
    uses: ["OOP yang terstruktur", "Backend services", "Enterprise systems"],
    code: [
      ["var", " goals = List.of(\"learn\", \"build\", \"ship\");"],
      ["", ""],
      ["goals.stream", "().map(String::toUpperCase).toList();"],
    ],
  },
  {
    id: "cpp",
    short: "C++",
    name: "C++",
    role: "Pahami performa sampai ke lapisan bawah.",
    description:
      "Bangun pemahaman tentang memori, algoritma, dan efisiensi untuk software yang dekat dengan sistem.",
    accent: "#c5a7ff",
    uses: ["Memory & performance", "Algorithms", "Systems & games"],
    code: [
      ["vector<string>", " goals = {\"learn\", \"build\", \"ship\"};"],
      ["", ""],
      ["transform", "(goals.begin(), goals.end(), /* ... */);"],
    ],
  },
] as const satisfies readonly Language[];

export const roadmap = [
  {
    number: "01",
    kicker: "FOUNDATION",
    title: "Belajar cara program berpikir",
    copy: "Nilai, kondisi, loop, fungsi, dan struktur data—bukan untuk dihafal, tetapi untuk dipakai memecahkan masalah.",
    tag: "JavaScript",
    icon: Binary,
  },
  {
    number: "02",
    kicker: "FLUENCY",
    title: "Lihat pola yang sama di bahasa berbeda",
    copy: "Pindahkan konsep ke Python, Java, dan C++. Kamu belajar memilih alat, bukan bergantung pada satu sintaks.",
    tag: "Multi-language",
    icon: Braces,
  },
  {
    number: "03",
    kicker: "ENGINEERING",
    title: "Bangun seperti software engineer",
    copy: "Pecah fitur, baca error, tulis test, gunakan Git, dan perbaiki kode sampai siap dipakai orang lain.",
    tag: "Real workflow",
    icon: Wrench,
  },
  {
    number: "04",
    kicker: "PORTFOLIO",
    title: "Kirim proyek yang bisa kamu jelaskan",
    copy: "Selesaikan proyek utuh, dokumentasikan keputusan, lalu tunjukkan bukan hanya hasil—tetapi cara berpikirmu.",
    tag: "Proof of skill",
    icon: GraduationCap,
  },
] as const satisfies readonly RoadmapStep[];

export const engineeringSkills = [
  {
    icon: Bug,
    label: "DEBUGGING",
    title: "Jangan takut error.",
    copy: "Baca gejala, buat hipotesis, uji satu hal, dan temukan penyebab sebenarnya.",
    className: "lab-skill-debug",
  },
  {
    icon: GitBranch,
    label: "GIT & COLLABORATION",
    title: "Kerja rapi bersama tim.",
    copy: "Catat perubahan, gunakan branch, review kode, dan komunikasikan konteks dengan jelas.",
    className: "lab-skill-git",
  },
  {
    icon: TestTube2,
    label: "TESTING",
    title: "Buktikan kode tetap benar.",
    copy: "Ubah requirement menjadi kasus uji dan cegah bug lama muncul kembali.",
    className: "lab-skill-test",
  },
  {
    icon: Network,
    label: "SYSTEM THINKING",
    title: "Lihat hubungan antarlapisan.",
    copy: "Pahami aliran data dari antarmuka, API, server, hingga database.",
    className: "lab-skill-system",
  },
  {
    icon: MessageSquareCode,
    label: "COMMUNICATION",
    title: "Jelaskan keputusan teknis.",
    copy: "Tuliskan trade-off dan bantu orang lain memahami solusi tanpa jargon berlebihan.",
    className: "lab-skill-communication",
  },
] as const satisfies readonly EngineeringSkill[];

export const practiceLoop = [
  ["01", "PREDICT", "Bentuk dugaan sebelum menekan run."],
  ["02", "CODE", "Tulis solusi dengan tanganmu sendiri."],
  ["03", "RUN", "Lihat perilaku kode secara langsung."],
  ["04", "REFLECT", "Pahami mengapa hasilnya benar atau salah."],
] as const;

export const outcomes = [
  "Memecah masalah menjadi langkah yang dapat diprogram",
  "Membaca dokumentasi dan codebase yang belum dikenal",
  "Menguji, men-debug, dan memperbaiki solusi secara sistematis",
  "Membangun proyek yang layak masuk portfolio",
  "Menjelaskan keputusan teknis saat review atau interview",
] as const;
