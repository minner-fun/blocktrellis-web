"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StatusTag } from "@/components/status-tag";
import { BUILD_LOG, logById, type LogInline } from "@/lib/content";

function Inline({ segments }: { segments: LogInline[] }) {
  return (
    <>
      {segments.map((seg, i) =>
        typeof seg === "string" ? (
          <span key={i}>{seg}</span>
        ) : (
          <a key={i} href={seg.href} target="_blank" rel="noopener noreferrer">
            {seg.text}
          </a>
        ),
      )}
    </>
  );
}

function Permalink({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        const url = `https://blocktrellis.com/build-log/${id}`;
        try {
          await navigator.clipboard.writeText(url);
        } catch {
          // clipboard API unavailable — link is still visible in the address bar
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      style={{
        fontSize: 13,
        fontWeight: 600,
        background: "transparent",
        border: 0,
        padding: 0,
        cursor: "pointer",
        color: "var(--color-accent)",
      }}
    >
      {copied ? "Copied ✓" : "Copy permalink →"}
    </button>
  );
}

export function BuildLogView({ id }: { id: string }) {
  const router = useRouter();
  const open = logById(id);

  return (
    <main className="shell" style={{ paddingTop: 64, paddingBottom: 80 }}>
      <h1 className="display" style={{ marginBottom: 12 }}>
        Build Log
      </h1>
      <p className="lede" style={{ margin: "0 0 40px" }}>
        Building BlockTrellis in public.
      </p>
      <div
        data-stack="1"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,5fr) minmax(0,7fr)",
          gap: "0 clamp(32px,5vw,80px)",
          alignItems: "start",
        }}
      >
        <div>
          {BUILD_LOG.map((e) => {
            const on = e.id === open.id;
            return (
              <button
                key={e.id}
                type="button"
                onClick={() => router.push(`/build-log/${e.id}`)}
                className="row-link"
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "transparent",
                  border: 0,
                  cursor: "pointer",
                  gridTemplateColumns: "56px minmax(0,1fr)",
                  gap: "4px 16px",
                  padding: "16px 0",
                }}
              >
                <span className="mono" style={{ fontSize: 13, color: "var(--color-accent-700)" }}>
                  {e.n}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: on ? 800 : 600,
                    fontSize: 17,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {e.title}
                </span>
                <span />
                <span
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    fontSize: 12,
                    color: "var(--color-neutral-700)",
                  }}
                >
                  <StatusTag status={e.status} />
                  {e.date}
                </span>
              </button>
            );
          })}
          <div className="rule" />
        </div>
        <article data-stack-sticky="1" className="panel" style={{ padding: 28, position: "sticky", top: 80 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <span className="mono" style={{ fontSize: 13, color: "var(--color-accent-700)" }}>
              {open.n}
            </span>
            <span style={{ fontSize: 12, color: "var(--color-neutral-700)" }}>{open.date}</span>
          </div>
          <h2
            style={{
              fontSize: "clamp(24px,2.6vw,32px)",
              letterSpacing: "-0.015em",
              lineHeight: 1.1,
              margin: "0 0 24px",
            }}
          >
            {open.title}
          </h2>
          {open.body ? (
            <div className="body-copy" style={{ display: "grid", gap: 20 }}>
              {open.body.map((block, i) => {
                if (block.kind === "img") {
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={block.src}
                      alt={block.alt}
                      style={{
                        width: "100%",
                        height: "auto",
                        border: "1px solid var(--color-divider)",
                      }}
                    />
                  );
                }
                return (
                  <p key={i} style={{ margin: 0, color: "var(--color-text)" }}>
                    <Inline segments={block.content} />
                  </p>
                );
              })}
            </div>
          ) : (
            <p style={{ margin: 0, color: "var(--color-neutral-600)" }}>
              {open.status === "Planned"
                ? "Not yet written."
                : "In progress — draft notes will be published with the release."}
            </p>
          )}
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--color-divider)" }}>
            <Permalink id={open.id} />
          </div>
        </article>
      </div>
    </main>
  );
}
