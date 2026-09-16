import type { Metadata } from "next";
import { StatusTag } from "@/components/status-tag";
import { Explorer } from "./explorer";

export const metadata: Metadata = {
  title: "Explore",
  description: "Lightweight explorer for Arc Mainnet blocks, transactions and tokens.",
  alternates: { canonical: "/explore/" },
};

export default function ExplorePage() {
  return (
    <main className="shell" style={{ paddingTop: 64, paddingBottom: 80 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 24,
          flexWrap: "wrap",
          marginBottom: 24,
        }}
      >
        <h1 className="display" style={{ margin: 0 }}>
          Explore
        </h1>
        <StatusTag status="Beta" />
      </div>
      <Explorer />
    </main>
  );
}
