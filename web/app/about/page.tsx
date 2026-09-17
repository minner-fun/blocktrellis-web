import type { Metadata } from "next";
import Link from "next/link";
import { StatusTag } from "@/components/status-tag";
import { PRINCIPLES, ROADMAP } from "@/lib/content";
import { GITHUB_URL } from "@/lib/status";

export const metadata: Metadata = {
  title: "About",
  description:
    "BlockTrellis is an independent blockchain data engineering project, started in 2026 with Arc Mainnet and built in public.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <main className="shell" style={{ paddingTop: 64, paddingBottom: 80 }}>
      <h1 className="display" style={{ marginBottom: 32 }}>
        About
      </h1>
      <div
        data-stack="1"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,7fr) minmax(0,5fr)",
          gap: "40px clamp(32px,5vw,96px)",
          alignItems: "start",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "clamp(20px,2vw,26px)",
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
              margin: "0 0 24px",
              fontWeight: 600,
            }}
          >
            BlockTrellis is an independent blockchain data engineering project focused on understanding
            how raw blockchain data becomes reliable, reusable and meaningful datasets.
          </p>
          <p className="lede" style={{ margin: "0 0 40px" }}>
            It started in 2026 with Arc Mainnet and is being built in public.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/build-log" className="btn btn-primary">
              Read the Build Log
            </Link>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              GitHub
            </a>
          </div>
        </div>
        <div>
          <span className="kicker" style={{ marginBottom: 8 }}>
            Principles
          </span>
          {PRINCIPLES.map((t, i) => (
            <div
              key={t}
              style={{
                display: "grid",
                gridTemplateColumns: "32px minmax(0,1fr)",
                gap: 16,
                padding: "16px 0",
                borderTop: "1px solid var(--color-divider)",
                alignItems: "baseline",
              }}
            >
              <span className="mono" style={{ fontSize: 13, color: "var(--color-neutral-700)" }}>
                0{i + 1}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: "-0.01em",
                }}
              >
                {t}
              </span>
            </div>
          ))}
          <div className="rule" />
        </div>
      </div>
      <section style={{ marginTop: 72, paddingTop: 32, borderTop: "1px solid var(--color-divider)" }}>
        <span className="kicker" style={{ marginBottom: 16 }}>
          Roadmap
        </span>
        <div
          data-stack-5="1"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,minmax(0,1fr))",
            gap: 0,
            border: "1px solid var(--color-divider)",
          }}
        >
          {ROADMAP.map((ph, i) => (
            <div
              key={ph.name}
              style={{
                padding: 20,
                borderRight: i === ROADMAP.length - 1 ? 0 : "1px solid var(--color-divider)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 12,
                  gap: 8,
                }}
              >
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15 }}>
                  {ph.name}
                </span>
                <StatusTag status={ph.status} />
              </div>
              {ph.items.map((item) => (
                <div
                  key={item}
                  className="mono"
                  style={{ fontSize: 12, padding: "4px 0", color: "var(--color-neutral-800)" }}
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
