"use client";

import { useState } from "react";
import { StatusTag } from "@/components/status-tag";
import { ARCH_LAYERS } from "@/lib/content";

export function ArchitectureDiagram() {
  const [sel, setSel] = useState(3);
  const layer = ARCH_LAYERS[sel];

  return (
    <div
      data-stack="1"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0,7fr) minmax(0,5fr)",
        gap: "32px clamp(32px,5vw,80px)",
        alignItems: "start",
      }}
    >
      <div>
        {ARCH_LAYERS.map((a, i) => {
          const on = sel === i;
          return (
            <div key={a.name}>
              <button
                type="button"
                onClick={() => setSel(i)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  font: "inherit",
                  cursor: "pointer",
                  padding: "14px 16px",
                  border: `1px solid ${on ? "var(--color-accent)" : "var(--color-divider)"}`,
                  background: on ? "var(--color-accent)" : "var(--color-surface)",
                  color: on ? "#fff" : "var(--color-text)",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    alignItems: "baseline",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16 }}>
                    {a.name}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      opacity: 0.7,
                    }}
                  >
                    {a.kind}
                  </span>
                </span>
                <span style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                  {a.cells.map((c) => (
                    <span
                      key={c}
                      className="mono"
                      style={{
                        fontSize: 12,
                        padding: "3px 8px",
                        border: "1px solid currentColor",
                        opacity: 0.85,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </span>
              </button>
              {i < ARCH_LAYERS.length - 1 ? (
                <div
                  style={{
                    height: 18,
                    width: 2,
                    background: "var(--color-divider)",
                    marginLeft: 28,
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      <aside data-stack-sticky="1" className="panel" style={{ padding: 24, position: "sticky", top: 80 }}>
        <span className="kicker-muted" style={{ display: "block", marginBottom: 8 }}>
          {layer.kind}
        </span>
        <h2 style={{ fontSize: 26, letterSpacing: "-0.015em", margin: "0 0 12px" }}>{layer.name}</h2>
        <p style={{ fontSize: 15, lineHeight: "25px", margin: "0 0 16px" }}>{layer.detail}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 12,
            borderTop: "1px solid var(--color-divider)",
            fontSize: 13,
          }}
        >
          <span style={{ color: "var(--color-neutral-700)" }}>Status</span>
          <StatusTag status={layer.status} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderTop: "1px solid var(--color-divider)",
            fontSize: 13,
          }}
        >
          <span style={{ color: "var(--color-neutral-700)" }}>Stack</span>
          <span className="mono">{layer.stack}</span>
        </div>
      </aside>
    </div>
  );
}
