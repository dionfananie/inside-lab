import type { Route } from "./+types/dashboard";

import { canonicalOf, socialMeta } from "~/lib/seo";
import { logicSessions } from "~/pages/computational-logic/data";
import DashboardPage from "~/pages/dashboard";
import "~/pages/dashboard/dashboard.css";

export function loader({ request }: Route.LoaderArgs) {
  return {
    canonical: canonicalOf(request.url),
    sessions: logicSessions.map((session) => ({
      session: session.session,
      topic: session.topic,
      href: session.href,
    })),
  };
}

const title = "Dashboard — insideLab";
const description =
  "Dashboard internal insideLab untuk data pengguna, kunjungan sesi, dan jawaban knowledge check.";

export const meta: Route.MetaFunction = ({ loaderData }) => [
  { title },
  { name: "description", content: description },
  ...socialMeta({ canonical: loaderData.canonical, title, description, noIndex: true }),
];

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return <DashboardPage sessions={loaderData.sessions} />;
}
