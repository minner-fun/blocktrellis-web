"use client";

import { StatusTag } from "@/components/status-tag";
import { useIndexer } from "@/components/indexer";
import { LAST_24H } from "@/lib/content";
import { fmt } from "@/lib/status";

export function StatusBoard() {
  const { latest, indexed, lag } = useIndexer();
  const top = [
    { k: "Indexer status", v: "Healthy", color: "var(--color-accent)" },
    { k: "Latest block", v: fmt(latest), color: "var(--color-text)" },
    { k: "Indexed block", v: fmt(indexed), color: "var(--color-text)" },
    { k: "Lag", v: `${lag} blocks`, color: "var(--color-text)" },
    { k: "Missing blocks", v: "0", color: "var(--color-text)" },
  ];
  const pipeline = [
    { n: "Blocks", s: "Healthy", to: fmt(indexed), lag: `${lag} blocks` },
    { n: "Transactions", s: "Healthy", to: fmt(indexed), lag: `${lag} blocks` },
    { n: "Logs", s: "Healthy", to: fmt(indexed), lag: `${lag} blocks` },
    { n: "Token Transfers", s: "Healthy", to: fmt(indexed - 1), lag: `${lag + 1} blocks` },
    { n: "DEX Trades", s: "Building", to: "—", lag: "—" },
  ];

  return (
    <>
      <div
        data-stack-5="1"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,minmax(0,1fr))",
          border: "1px solid var(--color-divider)",
        }}
      >
        {top.map((s, i) => (
          <div
            key={s.k}
            style={{
              padding: 20,
              borderRight: i === top.length - 1 ? 0 : "1px solid var(--color-divider)",
            }}
          >
            <div className="kicker-muted" style={{ marginBottom: 10 }}>
              {s.k}
            </div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: 28,
                letterSpacing: "-0.015em",
                fontFeatureSettings: "'tnum' 1",
                color: s.color,
              }}
            >
              {s.v}
            </div>
          </div>
        ))}
      </div>
      <div
        data-stack="1"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: "0 clamp(32px,5vw,80px)",
          marginTop: 56,
        }}
      >
        <section>
          <h2 style={{ fontSize: 22, letterSpacing: "-0.01em", margin: "0 0 12px" }}>Pipeline</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>Status</th>
                <th>Indexed to</th>
                <th>Lag</th>
              </tr>
            </thead>
            <tbody>
              {pipeline.map((p) => (
                <tr key={p.n}>
                  <td className="mono" style={{ fontSize: 13 }}>
                    {p.n}
                  </td>
                  <td>
                    <StatusTag status={p.s} />
                  </td>
                  <td className="mono" style={{ fontSize: 13 }}>
                    {p.to}
                  </td>
                  <td className="mono" style={{ fontSize: 13 }}>
                    {p.lag}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section>
          <h2 style={{ fontSize: 22, letterSpacing: "-0.01em", margin: "0 0 12px" }}>Last 24h</h2>
          {LAST_24H.map((r) => (
            <div
              key={r.k}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 8px",
                borderBottom: "1px solid var(--color-divider)",
                fontSize: 14,
              }}
            >
              <span style={{ color: "var(--color-neutral-700)" }}>{r.k}</span>
              <span className="mono">{r.v}</span>
            </div>
          ))}
          <p style={{ fontSize: 13, color: "var(--color-neutral-700)", margin: "16px 0 0" }}>
            Metrics are read from the indexer’s monitoring tables. This page will connect to live
            monitoring data.
          </p>
        </section>
      </div>
    </>
  );
}
