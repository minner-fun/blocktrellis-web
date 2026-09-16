import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/article-view";
import { ENGINEERING, articleBySlug } from "@/lib/content";

export function generateStaticParams() {
  return ENGINEERING.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug("Engineering", slug);
  if (!article) return { title: "Engineering" };
  return { title: article.title, description: article.lead };
}

export default async function EngineeringArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleBySlug("Engineering", slug);
  if (!article) notFound();
  return <ArticleView article={article} />;
}
