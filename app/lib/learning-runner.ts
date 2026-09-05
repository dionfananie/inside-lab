import type { Exercise } from '~/content/chapter-one';
export type Result = {
  name: string;
  pass: boolean;
  input: string;
  expected: string;
  received: string;
};
export type RunResult = {
  logs?: string[];
  value?: string;
  error?: string;
  results?: Result[];
};
export function execute(
  code: string,
  exercise: Exercise,
  action: 'run' | 'check',
  signal: AbortSignal,
): Promise<RunResult> {
  return new Promise((resolve) => {
    if (signal.aborted) {
      resolve({ error: 'Dibatalkan.' });
      return;
    }
    let worker: Worker;
    try {
      worker = new Worker('/learning-runner.js');
    } catch {
      resolve({
        error:
          'Editor belum bisa menjalankan kode. Muat ulang halaman dan coba lagi.',
      });
      return;
    }
    const id = crypto.randomUUID();
    let finished = false;
    const finish = (result: RunResult) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      worker.terminate();
      signal.removeEventListener('abort', abort);
      resolve(result);
    };
    const abort = () => finish({ error: 'Dibatalkan.' });
    const timer = setTimeout(
      () =>
        finish({
          error:
            'Kode dihentikan setelah 1,5 detik agar halaman tetap bisa digunakan. Periksa apakah ada perintah yang berulang tanpa berhenti, lalu coba lagi.',
        }),
      1500,
    );
    signal.addEventListener('abort', abort, { once: true });
    worker.onmessage = (e) => {
      if (e.data?.id === id) finish(e.data);
    };
    worker.onerror = () =>
      finish({
        error:
          'Kode belum berhasil dijalankan. Coba lagi; jika tetap gagal, muat ulang halaman.',
      });
    worker.postMessage({
      id,
      code,
      mode: exercise.mode,
      probe: exercise.probe,
      tests: exercise.tests,
      action,
    });
  });
}
