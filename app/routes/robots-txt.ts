import type { Route } from "./+types/robots-txt";

import { originOf } from "~/lib/seo";

export function loader({ request }: Route.LoaderArgs) {
	const origin = originOf(request.url);
	const robots = [
		"User-agent: *",
		"Allow: /",
		"Disallow: /computational-logic/",
		"",
		`Sitemap: ${origin}/sitemap.xml`,
		"",
	].join("\n");

	return new Response(robots, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}
