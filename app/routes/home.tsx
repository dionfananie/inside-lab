import type { Route } from "./+types/home";

import { chapters } from "~/content/curriculum";
import HomePage, {
	type HomeChapter,
	type HomeExercise,
} from "~/pages/home/home-page";
import "~/pages/home/home.css";
import { rules } from "~/pages/logic-lab/rules";

export function loader() {
	const chapterSummaries: HomeChapter[] = chapters.map((chapter) => ({
		id: chapter.id,
		title: chapter.title,
		number: chapter.number,
		partCount: chapter.parts.length,
		exerciseCount: chapter.parts.reduce(
			(total, part) => total + part.exercises.length,
			0,
		),
	}));
	const firstExercises: HomeExercise[] = chapters[0].parts[0].exercises.map(
		({ id, stage, mode, title, instruction, starter, options }) => ({
			id,
			stage,
			mode,
			title,
			instruction,
			starter,
			options,
		}),
	);

	return {
		chapters: chapterSummaries,
		firstExercises,
		totalParts: chapterSummaries.reduce(
			(total, chapter) => total + chapter.partCount,
			0,
		),
		totalExercises: chapterSummaries.reduce(
			(total, chapter) => total + chapter.exerciseCount,
			0,
		),
		ruleCount: rules.length,
	};
}

export const meta: Route.MetaFunction = () => [
	{ title: "insideLab — Belajar JavaScript & Logika secara Interaktif" },
	{
		name: "description",
		content:
			"Belajar JavaScript dan logika dengan mencoba langsung. Jelajahi 4 bab, 105 latihan bertahap, tabel kebenaran, dan runtime JavaScript interaktif.",
	},
	{ property: "og:title", content: "insideLab — Belajar dengan mencoba" },
	{
		property: "og:description",
		content:
			"Materi, editor kode, kasus uji, dan laboratorium logika dalam satu pengalaman belajar interaktif.",
	},
	{ property: "og:type", content: "website" },
	{ property: "og:locale", content: "id_ID" },
	{ name: "twitter:card", content: "summary" },
	{ name: "robots", content: "index, follow" },
];

export default function Home({ loaderData }: Route.ComponentProps) {
	return <HomePage {...loaderData} />;
}
