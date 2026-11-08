import type { Route } from "./+types/computational-logic-session";

import { canonicalOf, socialMeta } from "~/lib/seo";
import { findLogicSession } from "~/pages/computational-logic/data";
import ComputationalLogicSession from "~/pages/computational-logic/SessionView";
import "~/pages/computational-logic/computational-logic.css";

export function loader({ request, params }: Route.LoaderArgs) {
  const session = findLogicSession(params.sessionId);
  if (!session) throw new Response("Sesi tidak ditemukan", { status: 404 });
  return { canonical: canonicalOf(request.url), session };
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  const title = `Sesi ${loaderData.session.session}: ${loaderData.session.topic} — insideLab`;
  const description = loaderData.session.target;
  return [
    { title },
    { name: "description", content: description },
    ...socialMeta({ canonical: loaderData.canonical, title, description }),
  ];
};

export default function ComputationalLogicSessionRoute({ loaderData }: Route.ComponentProps) {
  return <ComputationalLogicSession sessionId={loaderData.session.session} />;
}
