import type { Part } from './chapter-one';

export const chapter = {
  id: 'project-delivery-robot',
  title: 'Proyek: Robot Pengantar',
  number: '07',
};

export const parts: Part[] = [
  {
    id: 'modeling-the-world',
    title: 'Memodelkan dunia sebagai data',
    description: 'Sebelum menulis algoritma, tentukan bentuk data yang mewakili dunia dan aturan perubahannya.',
    highlights: ['model', 'state', 'array', 'object', 'invariant'],
    core: 'Program simulasi memisahkan keadaan dunia dari aturan yang mengubahnya. Pada robot pengantar, keadaan dapat berupa posisi robot dan daftar paket; peta menyimpan lokasi jalan dan tujuan. Fungsi yang mengubah keadaan sebaiknya menghasilkan keadaan baru yang tetap memenuhi aturan model.',
    model: ['peta + posisi + paket', 'aksi robot', 'keadaan berikutnya'],
    why: 'Model yang eksplisit membuat aturan mudah diuji dan mencegah logika gerak bercampur dengan detail cara data ditampilkan.',
    example: `const state = {
  place: "Rumah",
    parcels: [{ place: "Rumah", address: "Kantor" }]
  };

function move(state, destination) {
  return { ...state, place: destination };
}`,
mistake: 'Jangan mengubah beberapa bagian state tanpa memahami invariant-nya. Misalnya, paket yang berada di lokasi robot harus ikut bergerak bersama robot.',
  exercises: [
    {
      id: 'robot-model-predict', stage: 'Prediksi', mode: 'console', title: 'Paket ikut robot',
      instruction: 'Pilih lokasi paket setelah robot dan paket bergerak dari Rumah ke Taman.',
      starter: 'const parcel = { place: "Rumah", address: "Taman" };\nconst moved = { ...parcel, place: "Taman" };\nconsole.log(moved.place);',
      options: ['Rumah', 'Taman', 'undefined', 'address'], answer: 'Taman',
      explanation: 'Spread menyalin properti parcel, lalu place ditimpa dengan lokasi baru.',
      tests: [{ name: 'Lokasi baru', inputs: {}, expected: 'Taman' }],
      hints: ['Perhatikan properti place yang ditulis setelah spread.', 'Properti terakhir dengan nama sama yang digunakan.'],
      solution: 'const parcel = { place: "Rumah", address: "Taman" };\nconst moved = { ...parcel, place: "Taman" };\nconsole.log(moved.place);',
    },
    {
      id: 'robot-model-complete', stage: 'Lengkapi', mode: 'function', title: 'Pindahkan paket di lokasi robot',
      instruction: 'Lengkapi moveParcels(parcels, from, to): kembalikan array baru dan pindahkan hanya paket yang place-nya sama dengan from.',
      starter: 'function moveParcels(parcels, from, to) {\n  return parcels;\n}', probe: 'moveParcels',
      tests: [
        { name: 'Sebagian berpindah', inputs: {}, args: [[{ place: 'A', address: 'B' }, { place: 'C', address: 'D' }], 'A', 'C'], expected: [{ place: 'C', address: 'B' }, { place: 'C', address: 'D' }] },
        { name: 'Array asal tidak berubah', inputs: {}, args: [[{ place: 'A', address: 'B' }], 'A', 'B'], expected: [{ place: 'B', address: 'B' }] },
      ],
      hints: ['Gunakan map agar menghasilkan array baru.', 'Untuk paket yang cocok, salin dengan spread dan ganti place.'],
      solution: 'function moveParcels(parcels, from, to) {\n  return parcels.map(parcel => parcel.place === from ? { ...parcel, place: to } : parcel);\n}',
    },
    {
      id: 'robot-model-build', stage: 'Bangun', mode: 'function', title: 'Hitung paket yang belum sampai',
      instruction: 'Buat countUndelivered(parcels). Paket dianggap terkirim jika place sama dengan address.',
      starter: '// Buat fungsi countUndelivered\n', probe: 'countUndelivered',
      tests: [
        { name: 'Satu paket tersisa', inputs: {}, args: [[{ place: 'A', address: 'B' }, { place: 'C', address: 'C' }]], expected: 1 },
        { name: 'Semua terkirim', inputs: {}, args: [[{ place: 'X', address: 'X' }]], expected: 0 },
      ],
      hints: ['Paket tertunda memiliki place berbeda dari address.', 'Gunakan filter lalu baca length.'],
      solution: 'function countUndelivered(parcels) {\n  return parcels.filter(parcel => parcel.place !== parcel.address).length;\n}',
    },
  ],
  },
{
  id: 'finding-a-route',
    title: 'Menemukan rute dengan pencarian',
      description: 'Jelajahi pilihan jalan secara sistematis untuk menemukan jalur dari lokasi awal ke tujuan.',
        highlights: ['graph', 'breadth-first search', 'queue', 'visited', 'path'],
          core: 'Peta jalan dapat direpresentasikan sebagai graph: setiap lokasi memiliki daftar tetangga. Breadth-first search (BFS) memeriksa semua lokasi pada jarak satu langkah sebelum jarak dua langkah, sehingga rute pertama yang ditemukan memiliki jumlah langkah minimum pada graph tanpa bobot. Set visited mencegah siklus mengulang pencarian.',
            model: ['queue berisi rute', 'ambil rute terdepan', 'tambahkan tetangga baru'],
              why: 'Pencarian teratur lebih dapat diandalkan daripada memilih jalan secara acak. Menyimpan seluruh rute juga membuat hasil akhirnya langsung dapat digunakan robot.',
                example: 'const roads = {\n  Rumah: ["Taman", "Pasar"],\n  Taman: ["Kantor"],\n  Pasar: ["Kantor"],\n  Kantor: []\n};\n// BFS mengeksplorasi rute berdasarkan jumlah langkah.',
                  mistake: 'Tandai lokasi sebagai visited saat memasukkannya ke queue, bukan setelah dikeluarkan. Jika tidak, banyak rute dapat menambahkan lokasi yang sama berulang kali.',
                    exercises: [
                      {
                        id: 'robot-route-predict', stage: 'Prediksi', mode: 'console', title: 'Urutan BFS',
                        instruction: 'Pilih urutan lokasi yang keluar dari queue BFS berikut.',
                        starter: 'const queue = ["Rumah"];\nconst visited = [];\nwhile (queue.length) {\n  const place = queue.shift();\n  visited.push(place);\n  if (place === "Rumah") queue.push("Taman", "Pasar");\n}\nconsole.log(visited.join(","));',
                        options: ['Rumah,Taman,Pasar', 'Rumah,Pasar,Taman', 'Taman,Pasar,Rumah', 'Rumah,Taman'], answer: 'Rumah,Taman,Pasar',
                        explanation: 'Queue memproses elemen dari depan dan menambahkan tetangga di belakang.',
                        tests: [{ name: 'Urutan queue', inputs: {}, expected: 'Rumah,Taman,Pasar' }],
                        hints: ['shift mengambil elemen paling depan.', 'push menambahkan elemen di belakang.'],
                        solution: 'const queue = ["Rumah"];\nconst visited = [];\nwhile (queue.length) {\n  const place = queue.shift();\n  visited.push(place);\n  if (place === "Rumah") queue.push("Taman", "Pasar");\n}\nconsole.log(visited.join(","));',
                      },
                      {
                        id: 'robot-route-complete', stage: 'Lengkapi', mode: 'function', title: 'Tetangga yang belum dikunjungi',
                        instruction: 'Lengkapi nextPlaces(roads, place, visited) untuk mengembalikan tetangga yang belum dikunjungi.',
                        starter: 'function nextPlaces(roads, place, visited) {\n  return [];\n}', probe: 'nextPlaces',
                        tests: [
                          { name: 'Saring visited', inputs: {}, args: [{ A: ['B', 'C', 'D'] }, 'A', ['B', 'D']], expected: ['C'] },
                          { name: 'Tidak punya jalan', inputs: {}, args: [{ A: [] }, 'A', []], expected: [] },
                        ],
                        hints: ['Ambil daftar roads[place].', 'Filter lokasi yang tidak ada di visited dengan includes.'],
                        solution: 'function nextPlaces(roads, place, visited) {\n  return roads[place].filter(next => !visited.includes(next));\n}',
                      },
                      {
                        id: 'robot-route-build', stage: 'Bangun', mode: 'function', title: 'Cari rute terpendek',
                        instruction: 'Buat findRoute(roads, start, goal) dengan BFS. Kembalikan array lokasi termasuk start dan goal, atau null jika tidak ada rute.',
                        starter: '// Buat fungsi findRoute\n', probe: 'findRoute',
                        tests: [
                          { name: 'Rute terpendek', inputs: {}, args: [{ A: ['B', 'C'], B: ['D'], C: ['D'], D: [] }, 'A', 'D'], expected: ['A', 'B', 'D'] },
                          { name: 'Tidak terjangkau', inputs: {}, args: [{ A: ['B'], B: [], C: [] }, 'A', 'C'], expected: null },
                          { name: 'Awal adalah tujuan', inputs: {}, args: [{ A: [] }, 'A', 'A'], expected: ['A'] },
                        ],
                        hints: ['Mulai queue dengan [[start]] dan tandai start visited.', 'Ambil path dari depan; untuk tiap tetangga baru, buat path [...path, next].'],
                        solution: 'function findRoute(roads, start, goal) {\n  const queue = [[start]];\n  const visited = new Set([start]);\n  while (queue.length) {\n    const path = queue.shift();\n    const place = path[path.length - 1];\n    if (place === goal) return path;\n    for (const next of roads[place] ?? []) {\n      if (!visited.has(next)) {\n        visited.add(next);\n        queue.push([...path, next]);\n      }\n    }\n  }\n  return null;\n}',
                      },
                    ],
  },
{
  id: 'choosing-a-strategy',
    title: 'Memilih strategi robot',
      description: 'Gunakan fungsi strategi yang dapat ditukar untuk membandingkan perilaku robot pada peta yang sama.',
        highlights: ['strategy', 'higher-order function', 'modularity', 'simulation'],
          core: 'Strategi robot dapat ditulis sebagai fungsi yang menerima state dan mengembalikan aksi berikutnya. Runner simulasi tidak perlu mengetahui cara strategi memilih aksi; ia hanya menjalankannya dan memperbarui state. Pemisahan ini memungkinkan strategi sederhana dibandingkan dengan pencarian rute tanpa mengubah mesin simulasi.',
            model: ['runner(state, strategy)', 'strategy memilih aksi', 'state diperbarui'],
              why: 'Memisahkan mekanisme dari strategi membuat eksperimen lebih mudah: ganti satu fungsi, lalu ukur apakah semua paket selesai dengan lebih sedikit langkah.',
                example: 'function runRobot(state, strategy) {\n  while (state.parcels.length > 0) {\n    const action = strategy(state);\n    state = applyAction(state, action);\n  }\n  return state;\n}',
                  mistake: 'Strategi harus selalu menghasilkan aksi yang valid selama pekerjaan masih ada. Pastikan juga setiap langkah mengubah state agar simulasi tidak berjalan tanpa akhir.',
                    exercises: [
                      {
                        id: 'robot-strategy-predict', stage: 'Prediksi', mode: 'console', title: 'Strategi sebagai argumen',
                        instruction: 'Pilih nilai yang dikembalikan runner saat strategi selalu memilih aksi "jalan".',
                        starter: 'function run(strategy) { return strategy({ place: "A" }); }\nconsole.log(run(state => state.place + "-jalan"));',
                        options: ['A-jalan', 'state', 'undefined', 'jalan-A'], answer: 'A-jalan',
                        explanation: 'Runner meneruskan state ke fungsi strategi dan mengembalikan nilai hasil pemanggilannya.',
                        tests: [{ name: 'Hasil strategi', inputs: {}, expected: 'A-jalan' }],
                        hints: ['state => ... adalah fungsi.', 'Fungsi menggabungkan place dengan teks -jalan.'],
                        solution: 'function run(strategy) { return strategy({ place: "A" }); }\nconsole.log(run(state => state.place + "-jalan"));',
                      },
                      {
                        id: 'robot-strategy-complete', stage: 'Lengkapi', mode: 'function', title: 'Jalankan strategi beberapa langkah',
                        instruction: 'Lengkapi runSteps(state, strategy, count) agar memanggil strategy pada state berulang kali dan mengembalikan state terakhir.',
                        starter: 'function runSteps(state, strategy, count) {\n  return state;\n}', probe: 'runSteps',
                        tests: [
                          { name: 'Tiga langkah', inputs: {}, args: [0, value => value + 2, 3], expected: 6 },
                          { name: 'Nol langkah', inputs: {}, args: [5, value => value + 1, 0], expected: 5 },
                        ],
                        hints: ['Ulangi sebanyak count kali.', 'Setiap hasil strategi menjadi state untuk langkah berikutnya.'],
                        solution: 'function runSteps(state, strategy, count) {\n  for (let step = 0; step < count; step++) state = strategy(state);\n  return state;\n}',
                      },
                      {
                        id: 'robot-strategy-build', stage: 'Bangun', mode: 'function', title: 'Bandingkan strategi dengan simulasi',
                        instruction: 'Buat simulate(initial, strategy, maxSteps). strategy menerima state dan mengembalikan state baru. Kembalikan { state, steps, finished }; selesai jika state.done true. Hentikan juga setelah maxSteps.',
                        starter: '// Buat fungsi simulate\n', probe: 'simulate',
                        tests: [
                          { name: 'Selesai dalam dua langkah', inputs: {}, args: [{ done: false, value: 0 }, state => ({ done: state.value >= 1, value: state.value + 1 }), 5], expected: { state: { done: true, value: 2 }, steps: 2, finished: true } },
                          { name: 'Batas langkah', inputs: {}, args: [{ done: false }, state => state, 3], expected: { state: { done: false }, steps: 3, finished: false } },
                        ],
                        hints: ['Periksa done sebelum setiap langkah dan setelah loop.', 'Hitung langkah yang benar-benar menjalankan strategy.'],
                        solution: 'function simulate(initial, strategy, maxSteps) {\n  let state = initial;\n  let steps = 0;\n  while (!state.done && steps < maxSteps) {\n    state = strategy(state);\n    steps++;\n  }\n  return { state, steps, finished: Boolean(state.done) };\n}',
                      },
                    ],
  },
];
