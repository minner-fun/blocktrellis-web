import type { Metadata } from "next";
import { DocsShell } from "./docs-shell";

export const metadata: Metadata = {
  title: "Docs",
  description: "Developer documentation for the ChainForge data platform.",
};

export default function DocsPage() {
  return <DocsShell docKey="quickstart" />;
}
