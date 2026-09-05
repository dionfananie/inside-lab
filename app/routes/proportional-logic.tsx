import type { Route } from "./+types/proportional-logic";

import { canonicalOf, socialMeta } from "~/lib/seo";
import LogicLab from "~/pages/logic-lab/logic-lab";
import "~/pages/logic-lab/logic.css";

export function loader({ request }: Route.LoaderArgs) {
	return { canonical: canonicalOf(request.url) };
}

const logicTitle = "Logika Proposisional — insideLab";
const logicDescription =
	"Pelajari 22 bentuk argumen, ubah kalimat dan simbol, lalu periksa hasilnya melalui tabel kebenaran interaktif.";

export const meta: Route.MetaFunction = ({ loaderData }) => [
	{ title: logicTitle },
	{ name: "description", content: logicDescription },
	...socialMeta({
		canonical: loaderData.canonical,
		title: logicTitle,
		description: logicDescription,
	}),
];

export default function ProportionalLogic() {
	return <LogicLab />;
}
