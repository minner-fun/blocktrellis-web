"use client";

import Link from "next/link";
import { LiveNumber, useIndexer } from "@/components/indexer";
import { StatusTag } from "@/components/status-tag";
import { DATASET_PROGRESS, PIPELINE } from "@/lib/content";
import { fmt } from "@/lib/status";

export function HomePipeline() {
  const { latest } = useIndexer();

  return (
    <div className="panel" style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>
      <div className="panel-head">
        <span>pipeline · arc</span>
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
        <span>latest_block</span>
        <span style={{ color: "var(--color-text)" }}>{fmt(latest)}</span>
      </div>
    </div>
  );
}

export function ArcStatusCard() {
  const { latest, indexed, lag } = useIndexer();
  const stats = [
    ["Status", "Live"],
    ["Coverage", "From Genesis"],
    ["Latest Block", fmt(latest)],
    ["Indexed Block", fmt(indexed)],
    ["Indexing Lag", `${lag} blocks`],
    ["Protocols Indexed", "3"],
    ["Datasets", "8"],
  ];

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 17 }}>
            Arc Mainnet
          </span>
          <StatusTag status="Live" />
        </div>
        {stats.map(([k, v]) => (
          <div key={k} className="stat-row">
            <span style={{ color: "var(--color-neutral-700)" }}>{k}</span>
            <span className="mono">{v}</span>
          </div>
        ))}
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
