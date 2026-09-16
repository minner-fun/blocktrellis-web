import type { Metadata } from "next";
import { ApiExplorer } from "./api-explorer";

export const metadata: Metadata = {
  title: "API",
  description: "REST API reference for ChainForge datasets.",
};

export default function ApiPage() {
  return <ApiExplorer />;
}
