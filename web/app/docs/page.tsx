import type { Metadata } from "next";
import { DocsShell } from "./docs-shell";

export const metadata: Metadata = {
  title: "Docs",
  description: "Developer documentation for the BlockTrellis data platform.",
  alternates: { canonical: "/docs/" },
};

export default function DocsPage() {
  return <DocsShell docKey="quickstart" />;
}
