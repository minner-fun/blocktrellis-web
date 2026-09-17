import type { Metadata } from "next";
import { BuildLogView } from "./build-log-view";

export const metadata: Metadata = {
  title: "Build Log",
  description: "Building BlockTrellis in public.",
  alternates: { canonical: "/build-log/" },
};

export default function BuildLogPage() {
  return <BuildLogView id="003" />;
}
