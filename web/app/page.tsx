import type { Metadata } from "next";
import Link from "next/link";
import { ChainBadges } from "@/components/chain-badges";
import { ChainsStatusCard, HomePipeline } from "@/components/home-live";
import { StatusTag } from "@/components/status-tag";
import { HEADLINE, LAYERS, latestLogPreview } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const latestLog = latestLogPreview();

  return (
    <main>
      <div className="shell">
        <section
          data-stack="1"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,7fr) minmax(0,5fr)",
            gap: "48px clamp(32px,5vw,96px)",
            padding: "clamp(56px,8vw,112px) 0 72px",
            alignItems: "start",
          }}
        >
          <div>
            <h1 className="hero-title">{HEADLINE}</h1>
            <p style={{ fontSize: 17, lineHeight: "28px", maxWidth: "56ch", margin: "32px 0 0" }}>
              BlockTrellis indexes, decodes and models blockchain data into reliable datasets for
              developers, analysts and researchers.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
              <Link href="/explore" className="btn btn-primary">
                Explore Data
              </Link>
              <Link href="/docs" className="btn btn-secondary">
                Read the Docs
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px 28px",
                marginTop: 56,
                fontSize: 13,
                letterSpacing: 0,
                color: "var(--color-neutral-600)",
              }}
            >
              <span>Networks · Ethereum, Arc</span>
              <span>Coverage · From genesis</span>
              <span>Built in public · 2026</span>
            </div>
          </div>
          <HomePipeline />
        </section>

        <div className="rule" />

        <section style={{ padding: "72px 0" }}>
          <span className="kicker">What BlockTrellis does</span>
          <h2 className="section-title" style={{ marginBottom: 24 }}>
            From chain data to usable data
          </h2>
          {LAYERS.map((l) => (
            <div
              key={l.num}
              data-stack="1"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(64px,140px) minmax(0,360px) minmax(0,1fr)",
                gap: "16px clamp(24px,4vw,64px)",
                alignItems: "baseline",
                padding: "32px 0",
                borderTop: "1px solid var(--color-divider)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: 15,
                  fontFeatureSettings: "'tnum' 1",
                }}
              >
                {l.num}{" "}
                <span style={{ fontWeight: 400, color: "var(--color-neutral-600)", marginLeft: 8 }}>
                  {l.phase}
                </span>
              </p>
              <div>
                <h3 style={{ fontSize: 24, letterSpacing: "-0.01em", margin: "0 0 8px" }}>
                  {l.title}
                </h3>
                <p className="body-copy" style={{ margin: 0 }}>
                  {l.copy}
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {l.items.map((it) => (
                  <span key={it} className="chip">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className="rule" />

        <section
          data-stack="1"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,5fr) minmax(0,7fr)",
            gap: "40px clamp(32px,5vw,96px)",
            padding: "72px 0",
            alignItems: "start",
          }}
        >
          <div>
            <span className="kicker">Supported chains</span>
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              Ethereum and Arc, with more on the way
            </h2>
            <p className="body-copy" style={{ maxWidth: "44ch", margin: "0 0 20px" }}>
              BlockTrellis indexes Ethereum Mainnet and Arc today. The raw layer is namespaced per
              chain; everything above it — decoded events, canonical tables, the API — is
              chain-agnostic, so adding a network is additive, not a rewrite.
            </p>
            <div style={{ marginBottom: 24 }}>
              <ChainBadges />
            </div>
            <Link href="/status" style={{ fontSize: 14, fontWeight: 600 }}>
              Network &amp; data status →
            </Link>
          </div>
          <ChainsStatusCard />
        </section>

        <div className="rule" />

        <section style={{ padding: "72px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 24,
              flexWrap: "wrap",
              marginBottom: 8,
            }}
          >
            <div>
              <span className="kicker">Build log</span>
              <h2 className="section-title">Building BlockTrellis in Public</h2>
            </div>
            <Link href="/build-log" style={{ fontSize: 14, fontWeight: 600 }}>
              View Build Log →
            </Link>
          </div>
          {latestLog.map((e) => (
            <Link
              key={e.id}
              href={`/build-log/${e.id}`}
              className="row-link"
              style={{
                gridTemplateColumns: "72px minmax(0,1fr) auto",
                gap: "8px 24px",
                background: e.status === "Building" ? "var(--color-surface)" : "transparent",
              }}
            >
              <span className="mono" style={{ fontSize: 13, color: "var(--color-accent-700)" }}>
                {e.n}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: "-0.01em",
                }}
              >
                {e.title}
              </span>
              <span
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  fontSize: 12,
                  color: "var(--color-neutral-700)",
                  fontFeatureSettings: "'tnum' 1",
                }}
              >
                <StatusTag status={e.status} />
                {e.date}
              </span>
            </Link>
          ))}
        </section>
      </div>

      <section className="band">
        <div className="shell" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <h2
            style={{
              fontSize: "clamp(34px,4.4vw,60px)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              margin: "0 0 0 -0.05em",
              maxWidth: "18ch",
              color: "inherit",
            }}
          >
            Raw data is easy to collect. Meaning is harder.
          </h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 40 }}>
            <Link href="/architecture" className="btn btn-on-accent">
              See the architecture
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
