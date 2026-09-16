"use client";

import { useMemo, useState } from "react";
import { useIndexer } from "@/components/indexer";
import { ENDPOINTS } from "@/lib/content";
import { API_BASE } from "@/lib/status";

function hex(n: number) {
  let s = "";
  let x = Math.imul(n, 2654435761) >>> 0;
  for (let i = 0; i < 8; i++) {
    x = (Math.imul(x, 1103515245) + 12345) >>> 0;
    s += ((x >>> 16) & 15).toString(16);
  }
  return s;
}

export function ApiExplorer() {
  const { indexed } = useIndexer();
  const [ep, setEp] = useState(0);
  const current = ENDPOINTS[ep];

  const json = useMemo(() => {
    if (ep !== 0) return current.json;
    return `{
  "block_number": ${indexed},
  "block_hash": "0x${hex(indexed)}…",
  "timestamp": "2026-09-15T08:41:02Z",
  "gas_used": 14820331,
  "transaction_count": 67
}`;
  }, [ep, indexed, current.json]);

  const curl = `curl ${API_BASE}${current.path.replace(/\{(\w+)\}/g, "<$1>")} \\\n  -H "Authorization: Bearer $CHAINFORGE_KEY"`;
  const params =
    current.params.length > 0
      ? current.params
      : [{ n: "—", t: "", req: "", d: "No parameters." }];

  return (
    <main
      data-stack="1"
      className="shell"
      style={{
        display: "grid",
        gridTemplateColumns: "260px minmax(0,1fr) minmax(0,1fr)",
        gap: "0 clamp(24px,3vw,48px)",
        alignItems: "start",
      }}
    >
      <aside
        data-stack-sticky="1"
        style={{
          position: "sticky",
          top: 64,
          padding: "40px 0",
          borderRight: "1px solid var(--color-divider)",
        }}
      >
        <div className="kicker-muted" style={{ marginBottom: 8 }}>
          Endpoints · v1
        </div>
        {ENDPOINTS.map((e, i) => {
          const on = ep === i;
          return (
            <button
              key={e.path}
              type="button"
              onClick={() => setEp(i)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "8px 8px 8px 0",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                background: "transparent",
                border: 0,
                cursor: "pointer",
                color: on ? "var(--color-accent)" : "var(--color-text)",
                fontWeight: on ? 600 : 400,
              }}
            >
              <span style={{ color: "var(--color-accent-700)", marginRight: 8 }}>{e.method}</span>
              {e.path}
            </button>
          );
        })}
        <div className="rule" style={{ margin: "24px 0 16px" }} />
        <div className="kicker-muted" style={{ marginBottom: 8 }}>
          Base URL
        </div>
        <div className="mono" style={{ fontSize: 12 }}>
          {API_BASE}
        </div>
      </aside>
      <section style={{ padding: "48px 0 80px" }}>
        <span className="kicker">API reference</span>
        <h1
          style={{
            fontSize: "clamp(28px,3vw,36px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: "0 0 12px",
          }}
        >
          {current.title}
        </h1>
        <div
          className="mono"
          style={{
            fontSize: 13,
            padding: "10px 12px",
            background: "var(--color-surface)",
            border: "1px solid var(--color-divider)",
            marginBottom: 20,
          }}
        >
          <span style={{ color: "var(--color-accent-700)", fontWeight: 600 }}>{current.method}</span>{" "}
          {current.path}
        </div>
        <p className="body-copy" style={{ margin: "0 0 24px" }}>
          {current.desc}
        </p>
        <h2
          style={{
            fontSize: 16,
            margin: "0 0 4px",
            paddingTop: 16,
            borderTop: "1px solid var(--color-divider)",
          }}
        >
          Parameters
        </h2>
        {params.map((p) => (
          <div
            key={p.n + p.d}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) auto",
              gap: "2px 12px",
              padding: "12px 0",
              borderBottom: "1px solid var(--color-divider)",
              fontSize: 13,
            }}
          >
            <span className="mono" style={{ fontWeight: 600 }}>
              {p.n}{" "}
              {p.t ? (
                <span style={{ fontWeight: 400, color: "var(--color-accent-700)", marginLeft: 6 }}>
                  {p.t}
                </span>
              ) : null}
            </span>
            <span
              style={{
                fontSize: 11,
                color: "var(--color-neutral-700)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {p.req}
            </span>
            <span style={{ color: "var(--color-neutral-800)", gridColumn: "1 / -1" }}>{p.d}</span>
          </div>
        ))}
      </section>
      <section data-stack-sticky="1" style={{ padding: "48px 0 80px", position: "sticky", top: 64 }}>
        <div className="panel">
          <div className="panel-head">
            <span>request</span>
            <span>curl</span>
          </div>
          <pre
            style={{
              padding: 14,
              fontSize: 12,
              lineHeight: "19px",
              overflow: "auto",
              background: "var(--color-surface)",
            }}
          >
            {curl}
          </pre>
          <div
            className="panel-head"
            style={{ borderTop: "1px solid var(--color-divider)" }}
          >
            <span>response</span>
            <span>200 · application/json</span>
          </div>
          <pre style={{ padding: 14, fontSize: 12, lineHeight: "19px", overflow: "auto" }}>
            {json}
          </pre>
        </div>
      </section>
    </main>
  );
}
