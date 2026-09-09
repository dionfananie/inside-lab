import type { Route } from "./+types/js-chapter";
import { redirect } from "react-router";

import { chapters } from "~/content/curriculum";
import { canonicalOf, socialMeta } from "~/lib/seo";
import LearningPage from "~/pages/js-learning";

export function loader({ request, params }: Route.LoaderArgs) {
	const chapter = chapters.find((item) => item.id === params.chapterId);
	if (!chapter) {
		throw redirect(`/js/${chapters[0].id}`);
	}

	const partTitles = chapter.parts.map((part) => part.title);
	const canonical = canonicalOf(request.url);
	const description = `Bab ${chapter.number} ${chapter.title}: ${partTitles.slice(0, 3).join(", ")}${partTitles.length > 3 ? ", dan materi lain" : ""}. Baca materi, tulis kode, jalankan, dan periksa langsung di browser.`;

	return { canonical, chapterId: chapter.id, title: chapter.title, description };
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
	const title = `insideLab — JS Learning | ${loaderData.title}`;
	return [
		{ title },
		{ name: "description", content: loaderData.description },
		...socialMeta({
			canonical: loaderData.canonical,
			title,
			description: loaderData.description,
		}),
	];
};

export default function JsChapter({ loaderData }: Route.ComponentProps) {
	return <LearningPage chapterId={loaderData.chapterId} />;
}
