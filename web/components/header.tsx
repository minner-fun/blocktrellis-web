"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { GITHUB_URL } from "@/lib/status";

const NAV = [
  { href: "/", label: "Product", match: (p: string) => p === "/" },
  { href: "/datasets", label: "Datasets", match: (p: string) => p.startsWith("/datasets") },
  { href: "/docs", label: "Docs", match: (p: string) => p.startsWith("/docs") },
  { href: "/research", label: "Research", match: (p: string) => p.startsWith("/research") },
  { href: "/build-log", label: "Build Log", match: (p: string) => p.startsWith("/build-log") },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="nav-bar">
        <Link href="/" className="nav-brand" onClick={() => setOpen(false)}>
          <Logo />
          BlockTrellis
        </Link>
        <div className="nav-links" data-navlinks="1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.match(pathname) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
        <Link href="/explore" className="btn btn-primary" data-hide-sm="1">
          Explore Data
        </Link>
        <button
          type="button"
          className="btn btn-secondary"
          data-menubtn="1"
          style={{ display: "none", padding: "8px 12px" }}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      {open ? (
        <div className="menu-panel">
          <Link href="/" onClick={() => setOpen(false)}>
            Product
          </Link>
          <Link href="/datasets" onClick={() => setOpen(false)}>
            Datasets
          </Link>
          <Link href="/docs" onClick={() => setOpen(false)}>
            Docs
          </Link>
          <Link href="/research" onClick={() => setOpen(false)}>
            Research
          </Link>
          <Link href="/build-log" onClick={() => setOpen(false)}>
            Build Log
          </Link>
          <Link href="/explore" onClick={() => setOpen(false)}>
            Explore Data →
          </Link>
        </div>
      ) : null}
    </>
  );
}
