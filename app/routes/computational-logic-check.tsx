import { redirect } from "react-router";

import type { Route } from "./+types/computational-logic-check";
import { findLogicSession } from "~/pages/computational-logic/data";

export function loader({ params }: Route.LoaderArgs) {
  const session = findLogicSession(params.sessionId);
  if (!session) throw new Response("Sesi tidak ditemukan", { status: 404 });
  return redirect(`/computational-logic/session/${session.session}#knowledge-check`);
}
