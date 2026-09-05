import { redirect } from "react-router";

export function loader() {
	throw redirect("/computational-logic/proportional-logic");
}

export default function ComputationalLogic() {
	return null;
}
