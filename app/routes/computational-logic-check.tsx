import type { Route } from "./+types/computational-logic-check";

import { canonicalOf, socialMeta } from "~/lib/seo";
import { findLogicSession } from "~/pages/computational-logic/data";
import { getCheck } from "~/pages/computational-logic/check/data";
import CheckPage from "~/pages/computational-logic/check/View";
import "~/pages/computational-logic/computational-logic.css";
import "~/pages/computational-logic/check/check.css";

export function loader({ request, params }: Route.LoaderArgs) {
  const session = findLogicSession(params.sessionId);
  if (!session) throw new Response("Sesi tidak ditemukan", { status: 404 });
  return {
    canonical: canonicalOf(request.url),
    session,
    check: getCheck(session.session),
  };
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  const title = `Knowledge Check Sesi ${loaderData.session.session} — insideLab`;
  const description = `Micro-quiz untuk menguji pemahaman materi sesi ${loaderData.session.session}: ${loaderData.session.topic}.`;
  return [
    { title },
    { name: "description", content: description },
    ...socialMeta({ canonical: loaderData.canonical, title, description }),
  ];
};

export default function ComputationalLogicCheckRoute({ loaderData }: Route.ComponentProps) {
  return <CheckPage session={loaderData.session} check={loaderData.check} />;
}
