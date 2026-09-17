"use client";

import { LiveNumber, useAllChains, useIndexer } from "@/components/indexer";
import { StatusTag } from "@/components/status-tag";
import { CHAINS, DATASET_PROGRESS, PIPELINE } from "@/lib/content";
import { fmt } from "@/lib/status";

export function HomePipeline() {
  const { latest } = useIndexer();

  return (
    <div className="panel" style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>
      <div className="panel-head">
        <span>pipeline · multi-chain</span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span className="live-dot" />
          live
        </span>
      </div>
      {PIPELINE.map((s) => (
        <div key={s.name} style={{ padding: "14px 14px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              padding: "12px 14px",
              background: "var(--color-surface)",
            }}
          >
            <span style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{s.name}</span>
            <span
              data-hide-sm="1"
              style={{ color: "var(--color-neutral-700)", textAlign: "right", whiteSpace: "nowrap" }}
            >
              {s.sub}
            </span>
          </div>
          <div style={{ height: 14, width: 2, background: "var(--color-divider)", margin: "0 0 0 27px" }} />
        </div>
      ))}
      <div
        style={{
          padding: "0 14px 14px",
          display: "flex",
          justifyContent: "space-between",
          color: "var(--color-neutral-700)",
        }}
      >
        <span>latest_block · arc</span>
        <span style={{ color: "var(--color-text)" }}>{fmt(latest)}</span>
      </div>
    </div>
  );
}

export function ChainsStatusCard() {
  const all = useAllChains();

  return (
    <div
      data-stack="1"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
        gap: 0,
        border: "1px solid var(--color-divider)",
      }}
    >
      <div style={{ padding: 20, borderRight: "1px solid var(--color-divider)" }}>
        <div className="kicker-muted" style={{ marginBottom: 16, lineHeight: "26px" }}>
          Networks
        </div>
        {CHAINS.map((c) => {
          const s = all[c.slug];
          const lag = s.latest - s.indexed;
          return (
            <div
              key={c.slug}
              style={{ padding: "12px 0", borderTop: "1px solid var(--color-divider)" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15 }}>
                  {c.name}
                </span>
                <StatusTag status={c.status} />
              </div>
              <div className="stat-row">
                <span style={{ color: "var(--color-neutral-700)" }}>Latest block</span>
                <span className="mono">{fmt(s.latest)}</span>
              </div>
              <div className="stat-row">
                <span style={{ color: "var(--color-neutral-700)" }}>Lag</span>
                <span className="mono">{lag} blocks</span>
              </div>
            </div>
          );
        })}
        <div className="stat-row" style={{ paddingTop: 12, borderTop: "1px solid var(--color-divider)" }}>
          <span style={{ color: "var(--color-neutral-700)" }}>Protocols Indexed</span>
          <span className="mono">3</span>
        </div>
        <div className="stat-row">
          <span style={{ color: "var(--color-neutral-700)" }}>Datasets</span>
          <span className="mono">8</span>
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <div className="kicker-muted" style={{ marginBottom: 16, lineHeight: "26px" }}>
          Dataset progress
        </div>
        {DATASET_PROGRESS.map((p) => (
          <div
            key={p.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "7px 0",
              fontSize: 13,
              fontFamily: "var(--font-mono)",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                flex: "none",
                border: "1.5px solid var(--color-accent)",
                background: p.done ? "var(--color-accent)" : "transparent",
              }}
            />
            <span style={{ color: p.done ? "var(--color-text)" : "var(--color-neutral-600)" }}>
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatusHeroLag() {
  return <LiveNumber which="lag" />;
}
