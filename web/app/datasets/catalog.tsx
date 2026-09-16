"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { StatusTag } from "@/components/status-tag";
import { DATASET_CATEGORIES, DATASETS, type Dataset } from "@/lib/content";

export function DatasetCatalog({ initial }: { initial?: string }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [selected, setSelected] = useState(initial ?? "arc.blocks");

  const rows = useMemo(() => {
    const q = query.toLowerCase();
    return DATASETS.filter(
      (d) =>
        (cat === "All" || d.cat === cat) &&
        (!q || d.name.includes(q) || d.desc.toLowerCase().includes(q)),
    );
  }, [query, cat]);

  const sel: Dataset = DATASETS.find((d) => d.name === selected) ?? DATASETS[0];
  const liveCount = DATASETS.filter((d) => d.status === "Live").length;
  const buildCount = DATASETS.filter((d) => d.status === "Building").length;
  const soonCount = DATASETS.filter((d) => d.status === "Coming Soon").length;
  const meta = [
    ["Category", sel.cat],
    ["Rows", sel.rows],
    ["Freshness", sel.fresh],
    ["Coverage", sel.coverage],
    ["Updated", sel.updated],
  ];

  return (
    <main className="shell" style={{ paddingTop: 64, paddingBottom: 0 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1 className="display" style={{ marginBottom: 12 }}>
            Datasets
          </h1>
          <p className="body-copy" style={{ margin: 0, maxWidth: "52ch" }}>
            Canonical, documented tables built from Arc Mainnet. Each dataset carries its schema,
            freshness and coverage.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 13,
            letterSpacing: 0,
            color: "var(--color-neutral-600)",
          }}
        >
          <span>{liveCount} live</span>
          <span>{buildCount} building</span>
          <span>{soonCount} planned</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          flexWrap: "wrap",
          margin: "32px 0 0",
          padding: "20px 0",
          borderTop: "1px solid var(--color-divider)",
          borderBottom: "1px solid var(--color-divider)",
        }}
      >
        <input
          className="input"
          placeholder="Search datasets..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ maxWidth: 320 }}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 0, border: "1px solid var(--color-divider)" }}>
          {DATASET_CATEGORIES.map((name, i) => {
            const on = cat === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setCat(name)}
                style={{
                  font: "inherit",
                  fontSize: 13,
                  padding: "7px 12px",
                  cursor: "pointer",
                  border: 0,
                  borderLeft: i ? "1px solid var(--color-divider)" : 0,
                  background: on ? "var(--color-accent)" : "transparent",
                  color: on ? "#fff" : "var(--color-text)",
                }}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="table" style={{ marginTop: 8 }}>
          <thead>
            <tr>
              <th>Dataset</th>
              <th>Description</th>
              <th>Status</th>
              <th>Rows</th>
              <th>Freshness</th>
              <th>Coverage</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d) => (
              <tr
                key={d.name}
                onClick={() => setSelected(d.name)}
                style={{
                  cursor: "pointer",
                  background:
                    selected === d.name
                      ? "color-mix(in srgb, var(--color-text) 6%, transparent)"
                      : "transparent",
                }}
              >
                <td className="mono" style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>
                  {d.name}
                </td>
                <td style={{ color: "var(--color-neutral-800)" }}>{d.desc}</td>
                <td>
                  <StatusTag status={d.status} />
                </td>
                <td className="mono" style={{ fontSize: 13 }}>
                  {d.rows}
                </td>
                <td className="mono" style={{ fontSize: 13 }}>
                  {d.fresh}
                </td>
                <td style={{ fontSize: 13, color: "var(--color-neutral-700)" }}>{d.coverage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section
        data-stack="1"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,5fr) minmax(0,7fr)",
          gap: "32px clamp(32px,5vw,80px)",
          padding: "56px 0 72px",
          alignItems: "start",
        }}
      >
        <div>
          <span className="kicker">Selected dataset</span>
          <h2 className="mono" style={{ fontSize: 28, letterSpacing: "-0.01em", margin: "0 0 12px" }}>
            {sel.name}
          </h2>
          <p className="body-copy" style={{ margin: "0 0 20px" }}>
            {sel.desc}
          </p>
          {meta.map(([k, v]) => (
            <div key={k} className="stat-row">
              <span style={{ color: "var(--color-neutral-700)" }}>{k}</span>
              <span className="mono">{v}</span>
            </div>
          ))}
        </div>
        <div className="panel">
          <div className="panel-head">
            <span>schema</span>
            <StatusTag status={sel.status} className="normal-case tracking-[.02em]" />
          </div>
          {sel.fields ? (
            sel.fields.map((f) => (
              <div
                key={f[0]}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0,1.2fr) 110px minmax(0,2fr)",
                  gap: 16,
                  padding: "10px 14px",
                  borderBottom: "1px solid var(--color-divider)",
                  fontSize: 13,
                  fontFamily: "var(--font-mono)",
                }}
              >
                <span style={{ fontWeight: 600 }}>{f[0]}</span>
                <span style={{ color: "var(--color-accent-700)" }}>{f[1]}</span>
                <span style={{ fontFamily: "var(--font-body)", color: "var(--color-neutral-700)" }}>
                  {f[2]}
                </span>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "32px 14px",
                fontSize: 14,
                color: "var(--color-neutral-700)",
                maxWidth: "44ch",
              }}
            >
              Schema is being designed. It will follow the canonical-model conventions documented in{" "}
              <Link href="/docs/canonical-models">Docs → Concepts</Link>.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
