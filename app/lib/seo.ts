import type { MetaDescriptor } from "react-router";

export const siteName = "insideLab";
export const siteLocale = "id_ID";
export const siteUrl = "https://insidelab.oppia.world/";

export function canonicalOf(raw: string | URL): string {
  const origin = new URL(siteUrl);
  const url = new URL(raw);
  url.protocol = origin.protocol;
  url.hostname = origin.hostname;
  url.port = origin.port;
  url.hash = "";
  url.search = "";
  return url.href;
}

export function originOf(_raw?: string | URL): string {
  return new URL(siteUrl).origin;
}

type SocialOptions = {
  canonical: string;
  title: string;
  description: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function socialMeta({
  canonical,
  title,
  description,
  type = "website",
  noIndex = false,
}: SocialOptions): MetaDescriptor[] {
  return [
    { property: "og:type", content: type },
    { property: "og:site_name", content: siteName },
    { property: "og:locale", content: siteLocale },
    { property: "og:url", content: canonical },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "twitter:card", content: "summary" },
    {
      name: "robots",
      content: noIndex ? "noindex, follow" : "index, follow",
    },
  ];
}
