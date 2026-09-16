import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/article-view";
import { RESEARCH, articleBySlug } from "@/lib/content";

export function generateStaticParams() {
  return RESEARCH.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug("Research", slug);
  if (!article) return { title: "Research" };
  return {
    title: article.title,
    description: article.lead,
    alternates: { canonical: `/research/${slug}/` },
  };
}

export default async function ResearchArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleBySlug("Research", slug);
  if (!article) notFound();
  return <ArticleView article={article} />;
}
