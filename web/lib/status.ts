export type StatusKind =
  | "Live"
  | "Beta"
  | "Building"
  | "Coming Soon"
  | "Healthy"
  | "Published"
  | "Planned"
  | "Draft"
  | "Protocol"
  | "Methodology";

export function statusClass(status: string) {
  switch (status) {
    case "Live":
    case "Healthy":
    case "Published":
    case "Protocol":
      return "tag tag-accent";
    case "Beta":
    case "Methodology":
      return "tag tag-outline";
    default:
      return "tag tag-neutral";
  }
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function fmt(n: number) {
  return n.toLocaleString("en-US");
}

export const GITHUB_URL = "https://github.com/minner-fun/blocktrellis-web";
export const API_BASE = "https://api.blocktrellis.com";

// Seed numbers for the client-side "live" block simulation, one per chain.
export const CHAIN_SEED = {
  ethereum: { latest: 21_842_119, indexed: 21_842_117 },
  arc: { latest: 2_918_331, indexed: 2_918_329 },
} as const;

export type ChainSlug = keyof typeof CHAIN_SEED;
