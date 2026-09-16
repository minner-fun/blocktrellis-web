import type { Metadata } from "next";
import { StatusBoard } from "./status-board";

export const metadata: Metadata = {
  title: "Network & Data Status",
  description: "Indexer health, lag and pipeline status for Arc Mainnet.",
  alternates: { canonical: "/status/" },
};

export default function StatusPage() {
  return (
    <main className="shell" style={{ paddingTop: 64, paddingBottom: 80 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 24,
          flexWrap: "wrap",
          marginBottom: 32,
        }}
      >
        <h1 className="display" style={{ margin: 0 }}>
          Network &amp; Data Status
        </h1>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
          <span className="live-dot-lg" />
          All systems healthy · updated 4 sec ago
        </span>
      </div>
      <StatusBoard />
    </main>
  );
}
