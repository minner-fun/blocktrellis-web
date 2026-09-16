import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell" style={{ padding: "96px 0 120px" }}>
      <span className="kicker">404</span>
      <h1 className="display" style={{ marginBottom: 16 }}>
        This page is not in the catalog
      </h1>
      <p className="lede" style={{ maxWidth: "48ch", margin: "0 0 32px" }}>
        The route does not exist. Live surfaces are listed below.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link href="/" className="btn btn-primary">
          Product
        </Link>
        <Link href="/datasets" className="btn btn-secondary">
          Datasets
        </Link>
        <Link href="/docs" className="btn btn-secondary">
          Docs
        </Link>
      </div>
    </main>
  );
}
