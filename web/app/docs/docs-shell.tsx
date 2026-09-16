import Link from "next/link";
import { StatusTag } from "@/components/status-tag";
import { DOC_NAV, DOCS, DEFAULT_DOC, docHref, type DocPage } from "@/lib/docs";

export function DocsShell({ docKey }: { docKey: string }) {
  const doc: DocPage = DOCS[docKey] ?? DOCS[DEFAULT_DOC];

  return (
    <main
      data-stack="1"
      className="shell"
      style={{
        paddingLeft: "var(--shell-pad)",
        paddingRight: "var(--shell-pad)",
        display: "grid",
        gridTemplateColumns: "240px minmax(0,1fr)",
        gap: "0 clamp(32px,5vw,80px)",
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
          maxHeight: "calc(100vh - 64px)",
          overflow: "auto",
        }}
      >
        {DOC_NAV.map((sec) => (
          <div key={sec.title} style={{ marginBottom: 24 }}>
            <div className="kicker-muted" style={{ marginBottom: 6 }}>
              {sec.title}
            </div>
            {sec.items.map((i) => {
              const on = i.key === doc.key;
              return (
                <Link
                  key={i.key}
                  href={docHref(i.key)}
                  style={{
                    display: "block",
                    fontSize: 14,
                    padding: "5px 0",
                    textDecoration: "none",
                    color: on ? "var(--color-accent)" : "var(--color-text)",
                    fontWeight: on ? 600 : 400,
                  }}
                >
                  {i.name}
                </Link>
              );
            })}
          </div>
        ))}
      </aside>
      <article style={{ padding: "48px 0 80px", maxWidth: 760 }}>
        <span className="kicker">{doc.section}</span>
        <h1
          style={{
            fontSize: "clamp(32px,3.6vw,44px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.08,
            margin: "0 0 16px",
          }}
        >
          {doc.title}
        </h1>
        <p className="lede" style={{ margin: "0 0 32px" }}>
          {doc.lead}
        </p>
        {doc.blocks.map((b, i) => {
          if (b.kind === "h") {
            return (
              <h2
                key={i}
                style={{
                  fontSize: 22,
                  letterSpacing: "-0.01em",
                  margin: "32px 0 8px",
                  paddingTop: 24,
                  borderTop: "1px solid var(--color-divider)",
                }}
              >
                {b.text}
              </h2>
            );
          }
          if (b.kind === "p") {
            return (
              <p key={i} className="body-copy" style={{ margin: "0 0 16px", color: "var(--color-text)" }}>
                {b.text}
              </p>
            );
          }
          if (b.kind === "code") {
            return (
              <div key={i} className="code-block">
                <div className="code-block-label">{b.lang}</div>
                <pre>{b.text}</pre>
              </div>
            );
          }
          return (
            <div key={i} className="note">
              <StatusTag status={b.lang} />
              <span>{b.text}</span>
            </div>
          );
        })}
      </article>
    </main>
  );
}
