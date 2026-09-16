import { statusClass } from "@/lib/status";

export function StatusTag({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  return <span className={[statusClass(status), className].filter(Boolean).join(" ")}>{status}</span>;
}
