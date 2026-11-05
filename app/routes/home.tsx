import type { Route } from "./+types/home";

import { chapters } from "~/content/curriculum";
import { canonicalOf, originOf, socialMeta } from "~/lib/seo";
import HomePage, {
	type HomeChapter,
	type HomeExercise,
} from "~/pages/home";
import "~/pages/home/home.css";
import { logicSessions } from "~/pages/computational-logic/data";

export function loader({ request }: Route.LoaderArgs) {
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
		logicSessionCount: logicSessions.length,
		canonical: canonicalOf(request.url),
		origin: originOf(request.url),
	};
}

const homeTitle = "insideLab — Belajar JavaScript & Logika secara Interaktif";

export const meta: Route.MetaFunction = ({ loaderData }) => {
	const description = `Pilih dua jalur belajar insideLab: Learning JS dengan runtime JavaScript interaktif atau Computational Logic dengan Logic Lab, SAT Solver, dan enam sesi logika formal.`;
	return [
		{ title: homeTitle },
		{ name: "description", content: description },
		...socialMeta({
			canonical: loaderData.canonical,
			title: homeTitle,
			description,
		}),
	];
};

export default function Home({ loaderData }: Route.ComponentProps) {
	return <HomePage {...loaderData} />;
}
