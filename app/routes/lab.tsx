import type { Route } from "./+types/lab";

import { canonicalOf, socialMeta } from "~/lib/seo";
import LabPage from "~/pages/lab/lab-page";
import "~/pages/lab/lab.css";

export function loader({ request }: Route.LoaderArgs) {
  return { canonical: canonicalOf(request.url) };
}

const title = "insideLab — Dari Belajar Programming ke Software Engineer";
const description =
  "Pelajari programming, JavaScript, Python, Java, dan C++ melalui praktik terstruktur yang membangun cara berpikir dan keterampilan software engineering.";

export const meta: Route.MetaFunction = ({ loaderData }) => [
  { title },
  { name: "description", content: description },
  ...socialMeta({
    canonical: loaderData.canonical,
    title,
    description,
  }),
];

export default function LabRoute() {
  return <LabPage />;
}
