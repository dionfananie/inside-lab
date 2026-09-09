import type { Route } from "./+types/play";

import { canonicalOf, socialMeta } from "~/lib/seo";
import RuntimeJsPage from "~/pages/runtime-js";
import "~/pages/runtime-js/runtime-js.css";

export function loader({ request }: Route.LoaderArgs) {
	return { canonical: canonicalOf(request.url) };
}

const playTitle = "Runtime JS Playground — insideLab";
const playDescription =
	"JavaScript playground dengan auto-run, output langsung, lima tema editor, dan dukungan async/await.";

export const meta: Route.MetaFunction = ({ loaderData }) => [
	{ title: playTitle },
	{ name: "description", content: playDescription },
	...socialMeta({
		canonical: loaderData.canonical,
		title: playTitle,
		description: playDescription,
	}),
];

export default function Play() {
	return <RuntimeJsPage />;
}
