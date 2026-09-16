import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { GITHUB_URL } from "@/lib/status";

export function Footer() {
  return (
    <footer className="footer">
      <div
        className="shell"
        data-stack-4="1"
        style={{
          paddingTop: 40,
          paddingBottom: 40,
          display: "grid",
          gridTemplateColumns: "minmax(0,2fr) repeat(3,minmax(0,1fr))",
          gap: 32,
          fontSize: 13,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            <LogoMark />
            ChainForge
          </div>
          <div style={{ color: "var(--color-neutral-700)", maxWidth: "32ch" }}>
            From raw blockchain data to structured onchain intelligence. chainforge.cn
          </div>
        </div>
        <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
          <span className="kicker-muted">Product</span>
          <Link href="/datasets">Datasets</Link>
          <Link href="/explore">Explore</Link>
          <Link href="/api">API</Link>
          <Link href="/status">Status</Link>
        </div>
        <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
          <span className="kicker-muted">Learn</span>
          <Link href="/docs">Docs</Link>
          <Link href="/architecture">Architecture</Link>
          <Link href="/research">Research</Link>
          <Link href="/engineering">Engineering</Link>
        </div>
        <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
          <span className="kicker-muted">Project</span>
          <Link href="/build-log">Build Log</Link>
          <Link href="/about">About</Link>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
