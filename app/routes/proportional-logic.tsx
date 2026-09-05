import type { Route } from "./+types/proportional-logic";

import LogicLab from "~/pages/logic-lab/logic-lab";
import "~/pages/logic-lab/logic.css";

export const meta: Route.MetaFunction = () => [
	{ title: "insideLab — Computational Logic | Logika Proposisional" },
	{
		name: "description",
		content:
			"Pelajari 22 bentuk argumen, ubah kalimat dan simbol, lalu periksa hasilnya melalui tabel kebenaran interaktif.",
	},
];

export default function ProportionalLogic() {
	return <LogicLab />;
}
