import type { MetadataRoute } from "next";
import { BUILD_LOG, ENGINEERING, RESEARCH } from "@/lib/content";
import { allDocKeys } from "@/lib/docs";

export const dynamic = "force-static";

const BASE_URL = "https://blocktrellis.com";

const STATIC_ROUTES = [
  "/",
  "/about/",
  "/api/",
  "/architecture/",
  "/build-log/",
  "/datasets/",
  "/docs/",
  "/engineering/",
  "/explore/",
  "/research/",
  "/status/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
  }));

  const docEntries = allDocKeys()
    .filter((slug) => slug !== "quickstart")
    .map((slug) => ({ url: `${BASE_URL}/docs/${slug}/` }));

  const researchEntries = RESEARCH.map((a) => ({
    url: `${BASE_URL}/research/${a.slug}/`,
  }));

  const engineeringEntries = ENGINEERING.map((a) => ({
    url: `${BASE_URL}/engineering/${a.slug}/`,
  }));

  const buildLogEntries = BUILD_LOG.map((e) => ({
    url: `${BASE_URL}/build-log/${e.id}/`,
  }));

  return [
    ...staticEntries,
    ...docEntries,
    ...researchEntries,
    ...engineeringEntries,
    ...buildLogEntries,
  ];
}
