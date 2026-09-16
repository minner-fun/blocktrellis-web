export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      aria-hidden="true"
      style={{ flex: "none", display: "block" }}
    >
      <rect x="3" y="5" width="22" height="4.5" fill="currentColor" />
      <rect x="3" y="11.75" width="14" height="4.5" fill="#0f6f6a" />
      <rect x="3" y="18.5" width="22" height="4.5" fill="currentColor" />
    </svg>
  );
}

export function LogoMark({ size = 10 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        background: "var(--color-accent)",
        display: "inline-block",
        borderRadius: 1,
      }}
    />
  );
}
