import Link from "next/link";
import { StatusTag } from "@/components/status-tag";
import { ENGINEERING, RESEARCH, type Article } from "@/lib/content";

export function ArticleView({ article }: { article: Article }) {
  const list = article.parent === "Research" ? RESEARCH : ENGINEERING;
  const more = list.filter((x) => x.slug !== article.slug).slice(0, 3);
  const parentHref = article.parent === "Research" ? "/research" : "/engineering";

  return (
    <main className="shell" style={{ paddingTop: 40, paddingBottom: 80 }}>
      <Link href={parentHref} style={{ fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
        ← {article.parent}
      </Link>
      <div
        data-stack="1"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,7fr) minmax(0,4fr)",
          gap: "40px clamp(32px,5vw,96px)",
          alignItems: "start",
          marginTop: 24,
        }}
      >
        <article style={{ maxWidth: 720 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
            <StatusTag status={article.kind} />
            <span style={{ fontSize: 13, color: "var(--color-neutral-700)" }}>{article.meta}</span>
          </div>
          <h1
            style={{
              fontSize: "clamp(32px,4vw,52px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.06,
              margin: "0 0 20px",
            }}
          >
            {article.title}
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: "29px",
              color: "var(--color-neutral-800)",
              margin: "0 0 32px",
              paddingBottom: 32,
              borderBottom: "1px solid var(--color-divider)",
            }}
          >
            {article.lead}
          </p>
          {article.sections.map((s) => (
            <div key={s.h}>
              <h2 style={{ fontSize: 22, letterSpacing: "-0.01em", margin: "32px 0 8px" }}>{s.h}</h2>
              <p className="body-copy" style={{ margin: 0, color: "var(--color-neutral-800)" }}>
                {s.t}
              </p>
            </div>
          ))}
        </article>
        <aside style={{ position: "sticky", top: 80 }}>
          <div style={{ borderTop: "1px solid var(--color-divider)", paddingTop: 16 }}>
            <div className="kicker-muted" style={{ marginBottom: 8 }}>
              On this page
            </div>
            {article.sections.map((s) => (
              <div
                key={s.h}
                style={{
                  fontSize: 14,
                  padding: "6px 0",
                  borderBottom: "1px solid var(--color-divider)",
                }}
              >
                {s.h}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--color-divider)", paddingTop: 16, marginTop: 32 }}>
            <div className="kicker-muted" style={{ marginBottom: 8 }}>
              Related datasets
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {article.datasets.map((name) => (
                <Link
                  key={name}
                  href="/datasets"
                  className="chip"
                  style={{ textDecoration: "none", color: "var(--color-text)" }}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid var(--color-divider)", paddingTop: 16, marginTop: 32 }}>
            <div className="kicker-muted" style={{ marginBottom: 8 }}>
              More in {article.parent}
            </div>
            {more.map((m) => (
              <Link
                key={m.slug}
                href={`${parentHref}/${m.slug}`}
                style={{
                  display: "block",
                  fontSize: 14,
                  padding: "8px 0",
                  borderBottom: "1px solid var(--color-divider)",
                  textDecoration: "none",
                  color: "var(--color-text)",
                  fontWeight: 600,
                }}
              >
                {m.title}
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
