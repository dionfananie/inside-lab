import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("lab", "routes/lab.tsx"),
	route("play", "routes/play.tsx"),
	route("js/:chapterId", "routes/js-chapter.tsx"),
	route("robots.txt", "routes/robots-txt.ts"),
	route("sitemap.xml", "routes/sitemap-xml.ts"),
	route("computational-logic", "routes/computational-logic.tsx"),
	route(
		"computational-logic/proportional-logic",
		"routes/proportional-logic.tsx",
	),
] satisfies RouteConfig;
