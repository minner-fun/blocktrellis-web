import type { Metadata } from "next";
import Link from "next/link";
import { StatusTag } from "@/components/status-tag";
import { RESEARCH } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description: "Protocol research and blockchain data methodology.",
};

export default function ResearchPage() {
  return (
    <main className="shell" style={{ paddingTop: 64, paddingBottom: 80 }}>
      <span className="kicker">Protocol research + blockchain data methodology</span>
      <h1 className="display" style={{ marginBottom: 12 }}>
        Research
      </h1>
      <p className="lede" style={{ margin: "0 0 40px", maxWidth: "56ch" }}>
        What did we learn about the chain, the protocol, or the behaviour of the data? Each note
        documents a mechanism and the method used to measure it.
      </p>
      <div
        data-stack="1"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) 280px",
          gap: "0 clamp(32px,5vw,80px)",
          alignItems: "start",
        }}
      >
        <div>
          {RESEARCH.map((r) => (
            <Link
              key={r.slug}
              href={`/research/${r.slug}`}
              className="row-link"
              style={{
                gridTemplateColumns: "minmax(0,1fr) auto",
                gap: "8px 24px",
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
              <span style={{ fontSize: 14, color: "var(--color-neutral-700)", gridColumn: "1 / -1" }}>
                {r.meta}
              </span>
            </Link>
          ))}
          <div className="rule" />
        </div>
        <aside style={{ borderTop: "1px solid var(--color-divider)", paddingTop: 20 }}>
          <div className="kicker-muted" style={{ marginBottom: 12 }}>
            Also on this site
          </div>
          <Link
            href="/engineering"
            style={{
              display: "block",
              padding: "10px 0",
              borderBottom: "1px solid var(--color-divider)",
              textDecoration: "none",
              color: "inherit",
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            Engineering{" "}
            <span
              style={{
                display: "block",
                fontWeight: 400,
                fontSize: 13,
                color: "var(--color-neutral-700)",
              }}
            >
              Reusable pipeline and schema methodology
            </span>
          </Link>
          <Link
            href="/build-log"
            style={{
              display: "block",
              padding: "10px 0",
              borderBottom: "1px solid var(--color-divider)",
              textDecoration: "none",
              color: "inherit",
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            Build Log{" "}
            <span
              style={{
                display: "block",
                fontWeight: 400,
                fontSize: 13,
                color: "var(--color-neutral-700)",
              }}
            >
              Chronological development notes
            </span>
          </Link>
        </aside>
      </div>
    </main>
  );
}
