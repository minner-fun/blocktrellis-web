import { StatusTag } from "@/components/status-tag";
import { CHAINS } from "@/lib/content";

export function ChainBadges() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
      {CHAINS.map((c) => (
        <span
          key={c.slug}
          className="chip"
          style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
        >
          {c.name}
          <StatusTag status={c.status} />
        </span>
      ))}
      <span style={{ fontSize: 13, color: "var(--color-neutral-600)" }}>+ more chains coming</span>
    </div>
  );
}
