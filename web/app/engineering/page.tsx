import type { Metadata } from "next";
import Link from "next/link";
import { StatusTag } from "@/components/status-tag";
import { ENGINEERING } from "@/lib/content";

export const metadata: Metadata = {
  title: "Engineering",
  description: "Reusable engineering methodology for blockchain data pipelines.",
  alternates: { canonical: "/engineering/" },
};

export default function EngineeringPage() {
  return (
    <main className="shell" style={{ paddingTop: 64, paddingBottom: 80 }}>
      <span className="kicker">Reusable engineering methodology</span>
      <h1 className="display" style={{ marginBottom: 40 }}>
        Engineering
      </h1>
      {ENGINEERING.map((r) => (
        <Link
          key={r.slug}
          href={`/engineering/${r.slug}`}
          className="row-link"
          style={{
            gridTemplateColumns: "minmax(0,1fr) auto",
            gap: 24,
            maxWidth: 820,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: "-0.01em",
              lineHeight: 1.15,
            }}
          >
            {r.title}
          </span>
          <StatusTag status={r.kind} />
        </Link>
      ))}
      <div className="rule" style={{ maxWidth: 820 }} />
    </main>
  );
}
