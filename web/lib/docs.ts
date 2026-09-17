export type DocBlock =
  | { kind: "h"; text: string }
  | { kind: "p"; text: string }
  | { kind: "code"; text: string; lang: string }
  | { kind: "note"; text: string; lang: string };

export type DocPage = {
  key: string;
  section: string;
  title: string;
  lead: string;
  blocks: DocBlock[];
};

export const DOC_NAV: { title: string; items: { name: string; key: string }[] }[] = [
  { title: "Introduction", items: [{ name: "Introduction", key: "introduction" }] },
  {
    title: "Getting Started",
    items: [
      { name: "Quickstart", key: "quickstart" },
      { name: "Authentication", key: "authentication" },
      { name: "Rate Limits", key: "rate-limits" },
    ],
  },
  {
    title: "Data",
    items: [
      { name: "Data Model", key: "data-model" },
      { name: "Core Tables", key: "core-tables" },
      { name: "Tokens", key: "tokens" },
      { name: "DEX", key: "dex" },
      { name: "Lending", key: "lending" },
      { name: "Stablecoins", key: "stablecoins" },
    ],
  },
  {
    title: "API",
    items: [
      { name: "Overview", key: "api-overview" },
      { name: "Blocks", key: "api-blocks" },
      { name: "Transactions", key: "api-transactions" },
      { name: "Tokens", key: "api-tokens" },
      { name: "Protocols", key: "api-protocols" },
    ],
  },
  {
    title: "SQL",
    items: [
      { name: "Query Engine", key: "query-engine" },
      { name: "Example Queries", key: "example-queries" },
    ],
  },
  {
    title: "Concepts",
    items: [
      { name: "Canonical Models", key: "canonical-models" },
      { name: "Protocol Decoding", key: "protocol-decoding" },
      { name: "Entity Attribution", key: "entity-attribution" },
      { name: "Activity Classification", key: "activity-classification" },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { name: "Data Freshness", key: "data-freshness" },
      { name: "Data Quality", key: "data-quality" },
      { name: "Reorg Handling", key: "reorg-handling" },
    ],
  },
];

export const DEFAULT_DOC = "quickstart";

const h = (text: string): DocBlock => ({ kind: "h", text });
const p = (text: string): DocBlock => ({ kind: "p", text });
const code = (text: string, lang: string): DocBlock => ({ kind: "code", text, lang });
const note = (text: string, lang: string): DocBlock => ({ kind: "note", text, lang });

export const DOCS: Record<string, DocPage> = {
  introduction: {
    key: "introduction",
    section: "Introduction",
    title: "BlockTrellis",
    lead: "BlockTrellis is a blockchain data engineering platform that transforms raw onchain data into canonical datasets, semantic activities and explainable onchain intelligence.",
    blocks: [
      h("What this is"),
      p("The first supported network is Arc Mainnet, indexed from genesis. The public surface today is a small set of live tables, an API that reads them, and the engineering notes that explain how they were built."),
      p("Unfinished work is labeled Live, Beta, Building or Coming Soon. Those labels are part of the product, not a disclaimer."),
      h("How to read the docs"),
      p("Getting Started is enough to pull a block. Data describes the tables. Concepts describe the layers. Infrastructure describes freshness, quality and reorgs."),
      note("The SQL console is not yet public. Example queries run against the same ClickHouse tables the API reads.", "Building"),
    ],
  },
  quickstart: {
    key: "quickstart",
    section: "Getting Started",
    title: "Quickstart",
    lead: "Read your first block from Arc Mainnet in under a minute, then query the same data with SQL.",
    blocks: [
      h("1. Get an API key"),
      p("Keys are free while BlockTrellis is in beta. Every request is authenticated with a bearer token."),
      code(
        `curl https://api.blocktrellis.com/v1/arc/blocks/latest \\
  -H "Authorization: Bearer $BLOCKTRELLIS_KEY"`,
        "bash",
      ),
      h("2. Read the response"),
      p("Responses are canonical: field names match the dataset schema exactly, so a block from the API and a row in arc.blocks are the same shape."),
      code(
        `{
  "block_number": 2918331,
  "block_hash": "0x7f3a…c21e",
  "timestamp": "2026-09-15T08:41:02Z",
  "gas_used": 14820331,
  "transaction_count": 67
}`,
        "json",
      ),
      h("3. Query with SQL"),
      code(
        `SELECT toStartOfHour(timestamp) AS hour,
       count() AS blocks,
       sum(transaction_count) AS txns
FROM arc.blocks
WHERE timestamp > now() - INTERVAL 1 DAY
GROUP BY hour ORDER BY hour;`,
        "sql",
      ),
      note(
        "The SQL console is not yet public. Queries above run against the same ClickHouse tables the API reads.",
        "Building",
      ),
    ],
  },
  authentication: {
    key: "authentication",
    section: "Getting Started",
    title: "Authentication",
    lead: "Every request to api.blocktrellis.com carries a bearer token. There is no unauthenticated path, including health checks that return dataset metadata.",
    blocks: [
      h("Header"),
      code(`Authorization: Bearer cf_live_…`, "http"),
      p("Keys are issued per project. A key can read every live dataset; there is no per-table ACL in beta."),
      h("Errors"),
      p("Missing or malformed tokens return 401. Revoked tokens return 403. Both responses are JSON with an error code and a message, never an HTML page."),
      note("Key issuance is currently manual. Request one through the GitHub repository while self-serve is being built.", "Beta"),
    ],
  },
  "rate-limits": {
    key: "rate-limits",
    section: "Getting Started",
    title: "Rate Limits",
    lead: "Beta keys share a per-key budget. Burst is allowed; sustained load above the budget is 429’d rather than silently sampled.",
    blocks: [
      h("Default budget"),
      p("120 requests per minute and 2 concurrent connections per key. List endpoints count as one request regardless of page size."),
      h("Headers"),
      code(
        `X-RateLimit-Limit: 120
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1726400000`,
        "http",
      ),
      p("When the budget is exhausted the body includes retry_after in seconds. Clients should back off; retries that ignore it are still counted."),
      note("Higher limits for research workloads are available on request. There is no paid tier yet.", "Live"),
    ],
  },
  "data-model": {
    key: "data-model",
    section: "Data",
    title: "Data Model",
    lead: "BlockTrellis separates raw, decoded, canonical and semantic tables. Each layer is derived from the one below it and never mutates it.",
    blocks: [
      h("Layers"),
      code(
        `raw        arc.blocks · arc.transactions · arc.logs · arc.traces
decoded    uniswap_v3.swap · erc20.transfer · aave_v3.borrow
canonical  dex.trades · token.transfers · lending.activities
semantic   entity.attributions · activity.classifications`,
        "schema",
      ),
      h("Naming"),
      p("Raw tables are namespaced by chain. Decoded tables are namespaced by protocol. Canonical tables are namespaced by domain and carry a protocol column so rows from different decoders coexist."),
      h("Lineage"),
      p("Every canonical row keeps tx_hash, log_index and block_number, so any value can be traced back to the exact raw log that produced it."),
    ],
  },
  "core-tables": {
    key: "core-tables",
    section: "Data",
    title: "Core Tables",
    lead: "arc.blocks, arc.transactions, arc.logs and arc.traces are the raw layer. They are typed, flattened, and written from node RPC with no interpretation.",
    blocks: [
      h("arc.blocks"),
      p("One row per block. Height, hash, parent hash, timestamp, gas_used, transaction_count. Coverage is genesis to head minus the two-block lag."),
      h("arc.transactions"),
      p("One row per transaction. to_address is Nullable — contract-creating transactions leave it null rather than inventing a value."),
      h("arc.logs and arc.traces"),
      p("Logs are the event stream decoders consume. Traces are flattened call rows, not JSON blobs. Both are rebuildable from the node by block range."),
      note("arc.traces is live in storage and not yet exposed on the API.", "Building"),
    ],
  },
  tokens: {
    key: "tokens",
    section: "Data",
    title: "Tokens",
    lead: "token.transfers is the first canonical dataset: normalized ERC-20 Transfer events with scaled amounts and lineage back to arc.logs.",
    blocks: [
      h("What is included"),
      p("Every well-formed Transfer log on Arc. amount_raw is always present. amount is present when decimals are known. Unknown decimals stay null — we do not assume 18."),
      h("What is not included"),
      p("Native value transfers live on arc.transactions.value. NFT transfers are out of scope for this table. Mint and burn are still Transfer rows; activity labels arrive with the semantic layer."),
      code(
        `SELECT token_address, count() AS transfers
FROM token.transfers
WHERE block_number > 2900000
GROUP BY token_address
ORDER BY transfers DESC
LIMIT 20;`,
        "sql",
      ),
    ],
  },
  dex: {
    key: "dex",
    section: "Data",
    title: "DEX",
    lead: "dex.trades is the canonical swap table. It is a union of protocol decoders, not a Uniswap table with extra columns.",
    blocks: [
      h("Status"),
      p("Building. Uniswap V3 is the first decoder. The table schema is public; the API returns 501 until the decoder is live."),
      h("Shape"),
      p("protocol, pool_address, token_sold, token_bought, amount_sold, amount_bought, plus tx_hash and log_index. Signed Uniswap amounts are oriented into an unsigned sold/bought pair."),
      note("Do not build volume charts on token.transfers while waiting for dex.trades. Router hops will inflate the number.", "Building"),
    ],
  },
  lending: {
    key: "lending",
    section: "Data",
    title: "Lending",
    lead: "lending.activities will normalize supply, borrow, repay and liquidation events across decoded lending protocols.",
    blocks: [
      p("Coming Soon. The table is named so that protocol decoders have a destination. No rows are served yet."),
      h("Intended grain"),
      p("One row per protocol event, not per token movement. A borrow that emits both a Borrow log and a Transfer is one activity with lineage to both."),
      note("Work on lending starts after the first DEX decoder is in production.", "Coming Soon"),
    ],
  },
  stablecoins: {
    key: "stablecoins",
    section: "Data",
    title: "Stablecoins",
    lead: "stablecoin.transfers will carry issuer context and an activity column so mint, burn and payments are not the same number.",
    blocks: [
      p("Coming Soon. Until it ships, token.transfers is the source of truth for ERC-20 movement, including stablecoins."),
      h("Why a separate table"),
      p("Raw Transfer volume is not stablecoin activity. Issuer mints, treasury rebalancing and user payments share an event signature and must be classified before anyone publishes a volume chart."),
      note("The classification rules are being written in the Research section first, then encoded as a model.", "Coming Soon"),
    ],
  },
  "api-overview": {
    key: "api-overview",
    section: "API",
    title: "Overview",
    lead: "The REST API is a thin reader over the same tables the SQL engine uses. Field names match the dataset schema. There is no parallel “API shape.”",
    blocks: [
      h("Base URL"),
      code("https://api.blocktrellis.com", "text"),
      h("Conventions"),
      p("JSON only. Pagination uses a cursor, not offset. Timestamps are ISO-8601 UTC. Hashes are 0x-prefixed. Null means unknown or not applicable, never a sentinel string."),
      h("Versioning"),
      p("The current prefix is /v1. Additive fields may appear without a version bump. Removed or renamed fields require /v2."),
      note("Interactive examples live on the API page. This section is the contract.", "Live"),
    ],
  },
  "api-blocks": {
    key: "api-blocks",
    section: "API",
    title: "Blocks",
    lead: "Block endpoints read arc.blocks. They lag the chain head by two blocks so a response is unlikely to be reorganised.",
    blocks: [
      h("Latest"),
      code("GET /v1/arc/blocks/latest", "http"),
      h("By height"),
      code("GET /v1/arc/blocks/{height}", "http"),
      p("height 0 is genesis. A height that has not been indexed returns 404, not an empty object. A height that was reorganised and not yet repaired returns 409 with the previous hash."),
    ],
  },
  "api-transactions": {
    key: "api-transactions",
    section: "API",
    title: "Transactions",
    lead: "Transaction endpoints read arc.transactions and can optionally attach logs from arc.logs.",
    blocks: [
      code("GET /v1/arc/transactions/{hash}", "http"),
      p("include_logs=true attaches raw logs. Decoded logs are included only when a decoder exists for that topic0; otherwise the raw log is returned without a decoded object."),
      p("Reverted transactions are present with status 0. They are not omitted."),
    ],
  },
  "api-tokens": {
    key: "api-tokens",
    section: "API",
    title: "Tokens",
    lead: "Token endpoints read token.transfers. Filters are address, token and block range.",
    blocks: [
      code("GET /v1/arc/token-transfers", "http"),
      p("Default limit is 100, max 1000. Results are newest first. A next_cursor is returned when more rows exist."),
      p("amount may be null when decimals are unknown. Clients that need a number should use amount_raw and apply their own decimals, or skip the row."),
    ],
  },
  "api-protocols": {
    key: "api-protocols",
    section: "API",
    title: "Protocols",
    lead: "Protocol endpoints will list decoded contracts and, later, protocol-specific events. They are not live.",
    blocks: [
      p("Coming Soon. dex.trades is the first protocol-facing dataset and currently returns 501."),
      code("GET /v1/dex/trades", "http"),
      note("Track decoder progress on the Status page and in the Build Log.", "Building"),
    ],
  },
  "query-engine": {
    key: "query-engine",
    section: "SQL",
    title: "Query Engine",
    lead: "Analytical queries run on ClickHouse. The SQL console is not public yet; the engine and the tables are the same ones the API reads.",
    blocks: [
      h("Dialect"),
      p("ClickHouse SQL. Use toStartOfHour, count(), sum() and INTERVAL. Do not expect PostgreSQL-only functions to work."),
      h("What you can query"),
      p("Live datasets: arc.blocks, arc.transactions, arc.logs, token.transfers. Building and Coming Soon tables are absent, not empty."),
      note("Read-only. There is no INSERT path for customers, and there will not be.", "Building"),
    ],
  },
  "example-queries": {
    key: "example-queries",
    section: "SQL",
    title: "Example Queries",
    lead: "Queries against live tables. Copy them into the console when it opens; until then they document the schema.",
    blocks: [
      h("Blocks per hour"),
      code(
        `SELECT toStartOfHour(timestamp) AS hour,
       count() AS blocks,
       sum(transaction_count) AS txns
FROM arc.blocks
WHERE timestamp > now() - INTERVAL 1 DAY
GROUP BY hour
ORDER BY hour;`,
        "sql",
      ),
      h("Top tokens by transfer count"),
      code(
        `SELECT token_address, count() AS transfers
FROM token.transfers
WHERE block_number > (SELECT max(block_number) FROM arc.blocks) - 7200
GROUP BY token_address
ORDER BY transfers DESC
LIMIT 20;`,
        "sql",
      ),
      h("Failed transactions"),
      code(
        `SELECT count() AS failed,
       count() / (SELECT count() FROM arc.transactions WHERE block_number > 2910000) AS rate
FROM arc.transactions
WHERE status = 0 AND block_number > 2910000;`,
        "sql",
      ),
    ],
  },
  "canonical-models": {
    key: "canonical-models",
    section: "Concepts",
    title: "Canonical Models",
    lead: "A canonical table has one schema, many protocols, and a lineage key back to the raw log. It is a union, not a lowest-common-denominator dump.",
    blocks: [
      p("Protocol tables are accurate and unusable across protocols. Canonical tables are usable and must not lose the protocol. The protocol column is required."),
      p("Domain fields are the intersection of what every decoder can populate honestly. Protocol-specific extras stay on the protocol table."),
      p("If a canonical table cannot be rebuilt from a block range of raw + decoded tables, it does not ship."),
    ],
  },
  "protocol-decoding": {
    key: "protocol-decoding",
    section: "Concepts",
    title: "Protocol Decoding",
    lead: "Decoding is a registry lookup plus a typed writer. Unknown topics stay in arc.logs. Known topics write one row to a protocol-namespaced table.",
    blocks: [
      p("The registry is keyed by (protocol, version, event) and, for proxies, by implementation code hash. The emitting address on the row is still the proxy."),
      p("Raw logs are never mutated. A decoder bug is a rebuild of the decoded table, not a patch of arc.logs."),
      p("Calldata decoding follows the same rule as event decoding: match, write, or leave raw."),
    ],
  },
  "entity-attribution": {
    key: "entity-attribution",
    section: "Concepts",
    title: "Entity Attribution",
    lead: "An address is not an entity. Attribution is a scored mapping, published with the evidence that produced the score.",
    blocks: [
      p("Coming Soon (Phase 4). The table will be entity.attributions, with a required confidence column."),
      p("Most addresses will remain unlabeled. That is the correct default. Downstream models that need a name must filter on confidence, not coalesce null to a fake entity."),
      note("Research notes on the method are published before the table. Read those first.", "Coming Soon"),
    ],
  },
  "activity-classification": {
    key: "activity-classification",
    section: "Concepts",
    title: "Activity Classification",
    lead: "Classification is a layer on top of canonical rows. It never overwrites dex.trades or token.transfers.",
    blocks: [
      p("Coming Soon (Phase 4). activity.classifications labels who did what, and flags internal movement so volume is not counted twice."),
      p("The conservative default is unclassified. Over-labeling is more expensive to unwind than a gap."),
      p("Consumers who want raw protocol mechanics should keep using the canonical tables."),
    ],
  },
  "data-freshness": {
    key: "data-freshness",
    section: "Infrastructure",
    title: "Data Freshness",
    lead: "The indexer follows the chain head with a two-block lag. Freshness on the Status page is that lag, not a marketing SLA.",
    blocks: [
      p("Live tables typically trail the head by two blocks. Token transfers may trail by one additional block while the decoder commits."),
      p("The Status page exposes latest block, indexed block, lag and missing blocks. Missing blocks is 0 in the steady state; a non-zero value is an incident."),
      p("API responses that include a block_number can be compared to /v1/arc/blocks/latest to measure lag from the client side."),
    ],
  },
  "data-quality": {
    key: "data-quality",
    section: "Infrastructure",
    title: "Data Quality",
    lead: "Quality is measured, not asserted. The checks that currently run are uniqueness, not-null lineage keys, and a gap scan on block_number.",
    blocks: [
      h("Checks"),
      p("Raw tables: contiguous block_number from genesis to indexed head, unique (block_number, block_hash). Canonical tables: unique (tx_hash, log_index), not-null protocol where the table has one."),
      h("What we do not claim"),
      p("We do not claim decoder completeness for protocols we have not listed as Live. Absence of a row is not evidence the event did not happen if the decoder is Building."),
      note("Error rate for the last 24h is published on the Status page.", "Live"),
    ],
  },
  "reorg-handling": {
    key: "reorg-handling",
    section: "Infrastructure",
    title: "Reorg Handling",
    lead: "Arc can reorganise its most recent blocks. BlockTrellis indexes to the head with a two-block lag and repairs any block whose hash changes.",
    blocks: [
      h("Detection"),
      p("On every new block, the indexer compares the parent hash with the stored hash at height − 1. A mismatch marks a reorg starting at the deepest divergent height."),
      h("Repair"),
      code(
        `1. find divergence height h
2. delete rows where block_number >= h (all layers, one transaction)
3. re-ingest h … head
4. re-run decoders and canonical models for the range
5. emit reorg event to status page`,
        "procedure",
      ),
      h("Idempotency"),
      p("All writes are keyed by (block_number, block_hash). Re-processing a block replaces its rows rather than appending, so a repair leaves no duplicates."),
      note(
        "Reorgs deeper than 64 blocks trigger a full-range audit and are recorded on the status page.",
        "Live",
      ),
    ],
  },
};

export function docHref(key: string) {
  return key === DEFAULT_DOC ? "/docs" : `/docs/${key}`;
}

export function allDocKeys() {
  return DOC_NAV.flatMap((s) => s.items.map((i) => i.key));
}
