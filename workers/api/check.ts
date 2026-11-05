import { getSessionUser } from '../lib/session';

type SubmitAnswer = {
  questionNumber: number;
  question: string;
  answer: string;
};

type SubmitPayload = {
  sessionId: number;
  answers: SubmitAnswer[];
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export async function checkApi(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/+$/, '') || '/';
  const db = env.inside_lab_db;

  if (pathname === '/api/check-submit' && request.method === 'POST') {
    const userId = await getSessionUser(db, request);
    if (!userId) return json({ error: 'Harap login untuk menyimpan jawaban.' }, 401);

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Body JSON tidak valid.' }, 400);
    }

    const payload = body as Partial<SubmitPayload> | null;
    if (
      !payload ||
      typeof payload.sessionId !== 'number' ||
      !Array.isArray(payload.answers)
    ) {
      return json({ error: 'Payload tidak lengkap.' }, 400);
    }

    const answers = payload.answers.slice(0, 50);
    if (answers.length === 0) {
      return json({ error: 'Tidak ada jawaban untuk disimpan.' }, 400);
    }

    for (const item of answers) {
      if (
        typeof item.questionNumber !== 'number' ||
        typeof item.question !== 'string' ||
        typeof item.answer !== 'string'
      ) {
        return json({ error: 'Format jawaban tidak valid.' }, 400);
      }
      if (item.question.length > 4000 || item.answer.length > 10000) {
        return json({ error: 'Jawaban terlalu panjang.' }, 400);
      }
    }

    const id = crypto.randomUUID();
    const now = Date.now();
    const statements = [
      db
        .prepare(
          'INSERT INTO check_submissions (id, user_id, session_id, submitted_at) VALUES (?, ?, ?, ?)',
        )
        .bind(id, userId, payload.sessionId, now),
      ...answers.map((answer) =>
        db
          .prepare(
            'INSERT INTO check_submission_answers (submission_id, question_number, question, answer) VALUES (?, ?, ?, ?)',
          )
          .bind(id, answer.questionNumber, answer.question, answer.answer),
      ),
    ];

    await db.batch(statements);
    return json({ ok: true, id, count: answers.length });
  }

  return json({ error: 'Check endpoint not found.' }, 404);
}
