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

export const GITHUB_URL = "https://github.com/chainforge";
export const API_BASE = "https://api.chainforge.cn";
export const INITIAL_LATEST = 2_918_331;
export const INITIAL_INDEXED = 2_918_329;
