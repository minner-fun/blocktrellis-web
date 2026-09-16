import type { Metadata } from "next";
import { ArchitectureDiagram } from "./diagram";

export const metadata: Metadata = {
  title: "Architecture",
  description: "How raw chain data becomes data products.",
  alternates: { canonical: "/architecture/" },
};

export default function ArchitecturePage() {
  return (
    <main className="shell" style={{ paddingTop: 64, paddingBottom: 80 }}>
      <span className="kicker">/architecture</span>
      <h1 className="display" style={{ marginBottom: 12 }}>
        How raw chain data becomes data products
      </h1>
      <p className="lede" style={{ margin: "0 0 40px", maxWidth: "56ch" }}>
        Each layer is an independently testable stage. Select a layer to read what it does and how it
        is built.
      </p>
      <ArchitectureDiagram />
    </main>
  );
}
