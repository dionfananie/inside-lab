import type { Route } from "./+types/computational-logic";

import { canonicalOf, socialMeta } from "~/lib/seo";
import ComputationalLogicPage from "~/pages/computational-logic";
import "~/pages/computational-logic/computational-logic.css";

export function loader({ request }: Route.LoaderArgs) {
	return { canonical: canonicalOf(request.url) };
}

const title = "Computational Logic — insideLab";
const description =
  "Pelajari logika formal, sintaks, semantik, validitas argumen, dan SAT melalui enam sesi belajar interaktif.";

export const meta: Route.MetaFunction = ({ loaderData }) => [
  { title },
  { name: "description", content: description },
  ...socialMeta({ canonical: loaderData.canonical, title, description }),
];

export default function ComputationalLogic() {
	return <ComputationalLogicPage />;
}
