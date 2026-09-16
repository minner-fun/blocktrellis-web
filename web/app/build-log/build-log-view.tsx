"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { StatusTag } from "@/components/status-tag";
import { BUILD_LOG, LOG_HEADINGS, logById } from "@/lib/content";

export function BuildLogView({ id }: { id: string }) {
  const router = useRouter();
  const open = logById(id);
  const sections = LOG_HEADINGS.map((h, i) => {
    const t = open.body
      ? open.body[i]
      : open.status === "Planned"
        ? "Not yet written."
        : "In progress — draft notes will be published with the release.";
    const written = Boolean(open.body);
    return { h, t, written };
  });

  return (
    <main className="shell" style={{ paddingTop: 64, paddingBottom: 80 }}>
      <h1 className="display" style={{ marginBottom: 12 }}>
        Build Log
      </h1>
      <p className="lede" style={{ margin: "0 0 40px" }}>
        Building ChainForge in public.
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
        <article
          data-stack-sticky="1"
          className="panel"
          style={{ padding: 28, position: "sticky", top: 80 }}
        >
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
              margin: "0 0 20px",
            }}
          >
            {open.title}
          </h2>
          {sections.map((s) => (
            <div
              key={s.h}
              style={{
                display: "grid",
                gridTemplateColumns: "150px minmax(0,1fr)",
                gap: 16,
                padding: "12px 0",
                borderTop: "1px solid var(--color-divider)",
                fontSize: 14,
                lineHeight: "22px",
              }}
            >
              <span className="kicker-muted" style={{ paddingTop: 4 }}>
                {s.h}
              </span>
              <span style={{ color: s.written ? "var(--color-text)" : "var(--color-neutral-600)" }}>
                {s.t}
              </span>
            </div>
          ))}
          <div style={{ marginTop: 8 }}>
            <Link href={`/build-log/${open.id}`} style={{ fontSize: 13, fontWeight: 600 }}>
              Permalink →
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
