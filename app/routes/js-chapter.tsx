import type { Route } from "./+types/js-chapter";
import { useParams } from "react-router";

import { chapters } from "~/content/curriculum";
import LearningPage from "~/pages/js-learning/learning-page";

export const meta: Route.MetaFunction = ({ params }) => {
	const chapter = chapters.find((item) => item.id === params.chapterId);
	return [
		{
			title: chapter
				? `insideLab — JS Learning | ${chapter.title}`
				: "insideLab — JS Learning",
		},
	];
};

export default function JsChapter() {
	const { chapterId } = useParams();
	return <LearningPage chapterId={chapterId ?? chapters[0].id} />;
}
