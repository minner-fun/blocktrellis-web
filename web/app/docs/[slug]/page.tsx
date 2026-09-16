import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShell } from "../docs-shell";
import { DOCS, allDocKeys } from "@/lib/docs";

export function generateStaticParams() {
  return allDocKeys()
    .filter((k) => k !== "quickstart")
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = DOCS[slug];
  if (!doc) return { title: "Docs" };
  return { title: doc.title, description: doc.lead };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!DOCS[slug]) notFound();
  return <DocsShell docKey={slug} />;
}
