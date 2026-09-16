import type { Metadata } from "next";
import { BuildLogView } from "./build-log-view";

export const metadata: Metadata = {
  title: "Build Log",
  description: "Building ChainForge in public.",
};

export default function BuildLogPage() {
  return <BuildLogView id="003" />;
}
