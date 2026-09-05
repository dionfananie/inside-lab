import type { Route } from "./+types/home";

import { chapters } from "~/content/curriculum";
import LearningPage from "~/pages/js-learning/learning-page";

export const meta: Route.MetaFunction = () => [
	{ title: "insideLab — JS Learning" },
	{
		name: "description",
		content:
			"Belajar JavaScript dari nol: kenali tipe data dan operator, coba menulis kode, lalu periksa jawaban dengan penjelasan yang mudah diikuti.",
	},
];

export default function Home() {
	return <LearningPage chapterId={chapters[0].id} />;
}
