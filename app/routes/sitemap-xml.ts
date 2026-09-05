import type { Route } from "./+types/sitemap-xml";

import { chapters } from "~/content/curriculum";
import { originOf } from "~/lib/seo";

export function loader({ request }: Route.LoaderArgs) {
	const origin = originOf(request.url);
	const today = new Date().toISOString().slice(0, 10);

	type Entry = { path: string; priority: string; changefreq: string };
	const entries: Entry[] = [
		{ path: "/", priority: "1.0", changefreq: "weekly" },
		{ path: "/play", priority: "0.6", changefreq: "monthly" },
		{
			path: "/computational-logic/proportional-logic",
			priority: "0.8",
			changefreq: "monthly",
		},
		...chapters.map((chapter) => ({
			path: `/js/${chapter.id}`,
			priority: "0.8",
			changefreq: "weekly",
		})),
	];

	const urls = entries
		.map(
			(entry) => `  <url>
    <loc>${origin}${entry.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
		)
		.join("\n");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
}
