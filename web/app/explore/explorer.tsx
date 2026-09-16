"use client";

import { useMemo, useState } from "react";
import { StatusTag } from "@/components/status-tag";
import { useIndexer } from "@/components/indexer";
import { EXPLORE_TABS, SQL_SAMPLE } from "@/lib/content";
import { fmt } from "@/lib/status";

function hex(n: number) {
  let s = "";
  let x = Math.imul(n, 2654435761) >>> 0;
  for (let i = 0; i < 8; i++) {
    x = (Math.imul(x, 1103515245) + 12345) >>> 0;
    s += ((x >>> 16) & 15).toString(16);
  }
  return s;
}

function skeleton(cols: string[]) {
  return Array.from({ length: 6 }, (_, r) =>
    cols.map((_, c) => `${40 + ((r * 7 + c * 13) % 50)}%`),
  );
}

export function Explorer() {
  const { indexed } = useIndexer();
  const [tab, setTab] = useState("Blocks");
  const current = EXPLORE_TABS.find((t) => t.name === tab) ?? EXPLORE_TABS[0];

  const blocks = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const n = indexed - i;
      const d = new Date(Date.now() - i * 2400);
      return {
        n: fmt(n),
        h: `0x${hex(n)}…${hex(n + 7).slice(0, 4)}`,
        t: `${d.toISOString().replace("T", " ").slice(0, 19)} UTC`,
        tx: 40 + ((n * 37) % 90),
        gas: fmt(9_000_000 + ((n * 7919) % 8_000_000)),
      };
    });
  }, [indexed]);

  return (
    <>
      <div style={{ display: "flex", borderBottom: "1px solid var(--color-divider)" }}>
        {EXPLORE_TABS.map((t) => {
          const on = tab === t.name;
          return (
            <button
              key={t.name}
              type="button"
              onClick={() => setTab(t.name)}
              style={{
                font: "inherit",
                fontSize: 14,
                padding: "10px 16px",
                cursor: "pointer",
                border: 0,
                background: "transparent",
                color: on ? "var(--color-accent)" : "var(--color-text)",
                fontWeight: on ? 600 : 400,
                boxShadow: on ? "inset 0 -2px 0 var(--color-accent)" : "none",
              }}
            >
              {t.name}
            </button>
          );
        })}
      </div>

      {tab === "Blocks" ? (
        <table className="table" style={{ marginTop: 16 }}>
          <thead>
            <tr>
              <th>Block</th>
              <th>Hash</th>
              <th>Timestamp</th>
              <th>Txns</th>
              <th>Gas used</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((b) => (
              <tr key={b.n}>
                <td className="mono" style={{ fontSize: 13, color: "var(--color-accent-700)" }}>
                  {b.n}
                </td>
                <td className="mono" style={{ fontSize: 13 }}>
                  {b.h}
                </td>
                <td style={{ fontSize: 13 }}>{b.t}</td>
                <td className="mono" style={{ fontSize: 13 }}>
                  {b.tx}
                </td>
                <td className="mono" style={{ fontSize: 13 }}>
                  {b.gas}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "20px 0 12px" }}>
            <StatusTag status={current.status} />
            <span style={{ fontSize: 14, color: "var(--color-neutral-800)" }}>{current.note}</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  {current.cols.map((c) => (
                    <th key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {skeleton(current.cols).map((row, i) => (
                  <tr key={i}>
                    {row.map((w, j) => (
                      <td key={j}>
                        <span
                          style={{
                            display: "block",
                            height: 12,
                            width: w,
                            background: "var(--color-neutral-200)",
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <section
        data-stack="1"
        style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: "0 clamp(32px,5vw,80px)",
          alignItems: "start",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <h2 style={{ fontSize: 22, letterSpacing: "-0.01em", margin: 0 }}>SQL Console</h2>
            <StatusTag status="Coming Soon" />
          </div>
          <div className="panel">
            <pre
              style={{
                padding: 16,
                fontSize: 13,
                lineHeight: "22px",
                background: "var(--color-surface)",
              }}
            >
              {SQL_SAMPLE}
            </pre>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 14px",
                borderTop: "1px solid var(--color-divider)",
              }}
            >
              <span style={{ fontSize: 12, color: "var(--color-neutral-700)" }}>
                Query engine · ClickHouse
              </span>
              <button type="button" className="btn btn-primary" disabled>
                Run query
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 style={{ fontSize: 22, letterSpacing: "-0.01em", margin: "0 0 12px" }}>
            Address lookup
          </h2>
          <input
            className="input"
            placeholder="0x… address, tx hash or block height"
            style={{ fontFamily: "var(--font-mono)" }}
          />
          <p style={{ fontSize: 13, color: "var(--color-neutral-700)", margin: "12px 0 0" }}>
            Resolves against arc.blocks, arc.transactions and token.transfers. Entity labels arrive
            with the semantic layer.
          </p>
        </div>
      </section>
    </>
  );
}
