import type { Route } from "./+types/play";

import RuntimeJsPage from "~/pages/runtime-js/runtime-js-page";
import "~/pages/runtime-js/runtime-js.css";

export const meta: Route.MetaFunction = () => [
  { title: "Runtime JS — insideLab" },
  {
    name: "description",
    content:
      "JavaScript playground dengan auto-run, output langsung, dan tema Sugar High.",
  },
];

export default function Play() {
  return <RuntimeJsPage />;
}
