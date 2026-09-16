import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BUILD_LOG, logById } from "@/lib/content";
import { BuildLogView } from "../build-log-view";

export function generateStaticParams() {
  return BUILD_LOG.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const entry = BUILD_LOG.find((e) => e.id === id);
  if (!entry) return { title: "Build Log" };
  return { title: `${entry.n} — ${entry.title}` };
}

export default async function BuildLogEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!BUILD_LOG.some((e) => e.id === id)) notFound();
  const entry = logById(id);
  return <BuildLogView id={entry.id} />;
}
