export type LogicSessionStatus = "ready" | "coming-soon" | "draft";

export type LogicSession = {
  session: number;
  topic: string;
  target: string;
  activity: string;
  status: LogicSessionStatus;
  href: string;
  tool?: { label: string; href: string };
};
