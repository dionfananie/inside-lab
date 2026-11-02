import type { Route } from "./+types/sat-solver";

import { canonicalOf, socialMeta } from "~/lib/seo";
import SatSolverPage from "~/pages/sat-solver";
import "~/pages/sat-solver/sat-solver.css";

export function loader({ request }: Route.LoaderArgs) {
	return { canonical: canonicalOf(request.url) };
}

const satTitle = "SAT Solver — insideLab";
const satDescription =
	"Ubah kalimat sehari-hari menjadi klausa SAT, lalu periksa apakah semua pernyataan bisa dipenuhi bersama-sama.";

export const meta: Route.MetaFunction = ({ loaderData }) => [
	{ title: satTitle },
	{ name: "description", content: satDescription },
	...socialMeta({
		canonical: loaderData.canonical,
		title: satTitle,
		description: satDescription,
	}),
];

export default function SatSolverRoute() {
	return <SatSolverPage />;
}
