import { slugify } from "./status";

export const HEADLINE = "From raw blockchain data to structured intelligence.";

export const PIPELINE = [
  { name: "Arc Mainnet", sub: "node · rpc" },
  { name: "Blocks · Transactions · Logs", sub: "raw" },
  { name: "Protocol Decoding", sub: "abi · events · calls" },
  { name: "Canonical Models", sub: "dex · tokens · lending" },
  { name: "APIs / SQL / Intelligence", sub: "serve" },
];

export const LAYERS = [
  {
    num: "01",
    phase: "Ingest",
    title: "Ingest",
    copy: "Capture raw blockchain data directly from chain nodes.",
    items: ["Blocks", "Transactions", "Logs", "Traces"],
  },
  {
    num: "02",
    phase: "Decode",
    title: "Decode",
    copy: "Decode protocol-specific events and contract interactions.",
    items: ["ABI", "Events", "Calls", "Protocol Mechanics"],
  },
  {
    num: "03",
    phase: "Normalize",
    title: "Normalize",
    copy: "Transform protocol-specific data into canonical datasets.",
    items: ["dex.trades", "token.transfers", "lending.borrow", "payments"],
  },
  {
    num: "04",
    phase: "Understand",
    title: "Understand",
    copy: "Add semantic context to understand who is acting and what is happening.",
    items: ["Entity Attribution", "Activity Classification", "Noise Filtering"],
  },
  {
    num: "05",
    phase: "Serve",
    title: "Serve",
    copy: "Make structured blockchain data accessible to applications, analysts and AI agents.",
    items: ["API", "SQL", "Realtime", "MCP"],
  },
];

export const DATASET_PROGRESS = [
  { name: "Blocks", done: true },
  { name: "Transactions", done: true },
  { name: "Logs", done: true },
  { name: "Token Transfers", done: true },
  { name: "DEX Trades", done: false },
  { name: "Stablecoin Activity", done: false },
  { name: "Lending", done: false },
  { name: "Entity Labels", done: false },
];

export type Dataset = {
  name: string;
  cat: string;
  desc: string;
  status: "Live" | "Building" | "Coming Soon";
  rows: string;
  fresh: string;
  coverage: string;
  updated: string;
  fields: [string, string, string][] | null;
};

export const DATASETS: Dataset[] = [
  {
    name: "arc.blocks",
    cat: "Core",
    desc: "Canonical block-level data from Arc Mainnet.",
    status: "Live",
    rows: "2.92M",
    fresh: "3 sec",
    coverage: "Genesis → latest",
    updated: "8 sec ago",
    fields: [
      ["block_number", "UInt64", "Height of the block"],
      ["block_hash", "FixedString(66)", "Keccak hash of the block header"],
      ["timestamp", "DateTime", "Block timestamp (UTC)"],
      ["gas_used", "UInt64", "Total gas consumed"],
      ["transaction_count", "UInt32", "Transactions included"],
    ],
  },
  {
    name: "arc.transactions",
    cat: "Core",
    desc: "Transactions executed on Arc.",
    status: "Live",
    rows: "28.4M",
    fresh: "3 sec",
    coverage: "Genesis → latest",
    updated: "8 sec ago",
    fields: [
      ["tx_hash", "FixedString(66)", "Transaction hash"],
      ["block_number", "UInt64", "Containing block"],
      ["from_address", "String", "Sender"],
      ["to_address", "Nullable(String)", "Recipient or contract"],
      ["value", "UInt256", "Native value transferred"],
      ["status", "UInt8", "1 = success, 0 = reverted"],
    ],
  },
  {
    name: "arc.logs",
    cat: "Core",
    desc: "Raw event logs emitted by contracts on Arc.",
    status: "Live",
    rows: "182M",
    fresh: "3 sec",
    coverage: "Genesis → latest",
    updated: "8 sec ago",
    fields: [
      ["tx_hash", "FixedString(66)", "Emitting transaction"],
      ["log_index", "UInt32", "Position within the transaction"],
      ["address", "String", "Emitting contract"],
      ["topic0", "FixedString(66)", "Event signature"],
      ["data", "String", "ABI-encoded payload"],
    ],
  },
  {
    name: "token.transfers",
    cat: "Tokens",
    desc: "Normalized ERC-20 token transfers.",
    status: "Live",
    rows: "41.7M",
    fresh: "5 sec",
    coverage: "Genesis → latest",
    updated: "11 sec ago",
    fields: [
      ["token_address", "String", "Contract of the token"],
      ["from_address", "String", "Sender"],
      ["to_address", "String", "Recipient"],
      ["amount_raw", "UInt256", "Amount in base units"],
      ["amount", "Decimal(38,18)", "Amount scaled by decimals"],
      ["block_number", "UInt64", "Containing block"],
    ],
  },
  {
    name: "dex.trades",
    cat: "DEX",
    desc: "Canonical swaps across decoded DEX protocols.",
    status: "Building",
    rows: "—",
    fresh: "—",
    coverage: "Uniswap V3 first",
    updated: "—",
    fields: [
      ["protocol", "LowCardinality(String)", "Decoder that produced the row"],
      ["pool_address", "String", "Liquidity pool"],
      ["token_sold", "String", "Token sold"],
      ["token_bought", "String", "Token bought"],
      ["amount_sold", "Decimal(38,18)", ""],
      ["amount_bought", "Decimal(38,18)", ""],
    ],
  },
  {
    name: "stablecoin.transfers",
    cat: "Stablecoins",
    desc: "Stablecoin movements with issuer and activity context.",
    status: "Coming Soon",
    rows: "—",
    fresh: "—",
    coverage: "—",
    updated: "—",
    fields: null,
  },
  {
    name: "lending.activities",
    cat: "Lending",
    desc: "Supply, borrow, repay and liquidation events, normalized.",
    status: "Coming Soon",
    rows: "—",
    fresh: "—",
    coverage: "—",
    updated: "—",
    fields: null,
  },
  {
    name: "payments.transfers",
    cat: "Payments",
    desc: "Transfers classified as payments, net of internal movement.",
    status: "Coming Soon",
    rows: "—",
    fresh: "—",
    coverage: "—",
    updated: "—",
    fields: null,
  },
  {
    name: "protocol.contracts",
    cat: "Protocols",
    desc: "Registry of decoded protocol contracts and versions.",
    status: "Coming Soon",
    rows: "—",
    fresh: "—",
    coverage: "—",
    updated: "—",
    fields: null,
  },
  {
    name: "entity.attributions",
    cat: "Entities",
    desc: "Address-to-entity mapping with confidence scores.",
    status: "Coming Soon",
    rows: "—",
    fresh: "—",
    coverage: "—",
    updated: "—",
    fields: null,
  },
  {
    name: "activity.classifications",
    cat: "Entities",
    desc: "Per-transaction activity labels and noise flags.",
    status: "Coming Soon",
    rows: "—",
    fresh: "—",
    coverage: "—",
    updated: "—",
    fields: null,
  },
];

export const DATASET_CATEGORIES = [
  "All",
  "Core",
  "Tokens",
  "DEX",
  "Lending",
  "Stablecoins",
  "Payments",
  "Entities",
  "Protocols",
];

export const PRINCIPLES = [
  "Accuracy over hype",
  "Explainability over black boxes",
  "Canonical models over protocol silos",
  "Open learning",
  "Engineering first",
];

export const ROADMAP = [
  {
    name: "Phase 1",
    status: "Live",
    items: ["arc.blocks", "arc.transactions", "arc.logs", "token.transfers"],
  },
  {
    name: "Phase 2",
    status: "Building",
    items: ["protocol decoding", "dex.trades", "lending", "stablecoins", "payments"],
  },
  {
    name: "Phase 3",
    status: "Beta",
    items: ["canonical models", "data quality", "SQL / API"],
  },
  {
    name: "Phase 4",
    status: "Coming Soon",
    items: ["entity attribution", "activity classification", "noise filtering"],
  },
  {
    name: "Phase 5",
    status: "Coming Soon",
    items: ["realtime streams", "MCP", "AI agents", "onchain intelligence"],
  },
];

export type ArticleKind = "Protocol" | "Methodology" | "Published" | "Draft";

export type Article = {
  title: string;
  kind: ArticleKind;
  meta: string;
  parent: "Research" | "Engineering";
  slug: string;
  lead: string;
  sections: { h: string; t: string }[];
  datasets: string[];
};

export const RESEARCH: Article[] = [
  {
    title: "Understanding Arc's Transaction Model",
    kind: "Protocol",
    meta: "Arc · 14 min",
    parent: "Research",
    slug: slugify("Understanding Arc's Transaction Model"),
    lead: "Arc is EVM-compatible, but receipt fields, trace availability and fee accounting are not identical to Ethereum mainnet. This note records the differences that matter for an indexer.",
    sections: [
      {
        h: "Context",
        t: "The first Arc node we pinned returned traces in a slightly different envelope than geth. Treating Arc as “just another EVM chain” produced silent gaps in arc.traces for contract-creating transactions.",
      },
      {
        h: "Method",
        t: "We compared 10,000 consecutive blocks from a local Arc node against the public RPC, field by field: header, receipts, logs, and traces. Divergent fields were written into a lineage table with the node version that produced them.",
      },
      {
        h: "Findings",
        t: "Transaction status, log bloom and cumulative gas match Ethereum. Contract-creation traces omit the `to` field rather than setting it to null. A small number of system transactions appear in the block body without a corresponding user signature.",
      },
      {
        h: "Implications for the data model",
        t: "arc.transactions.to_address is Nullable. arc.traces is flattened rather than stored as JSON. System transactions are flagged rather than dropped, so downstream decoders can ignore them without losing lineage.",
      },
    ],
    datasets: ["arc.transactions", "arc.blocks"],
  },
  {
    title: "How Uniswap V3 Swap Events Become dex.trades",
    kind: "Methodology",
    meta: "DEX · 11 min",
    parent: "Research",
    slug: slugify("How Uniswap V3 Swap Events Become dex.trades"),
    lead: "A Swap log is not a trade. This note walks the decoder from topic0 to a canonical dex.trades row, including the amount and token orientation rules.",
    sections: [
      {
        h: "Context",
        t: "Uniswap V3 emits Swap(sender, recipient, amount0, amount1, sqrtPriceX96, liquidity, tick). amount0 and amount1 are signed. Canonical trades need an unsigned sold/bought pair and a protocol tag.",
      },
      {
        h: "Method",
        t: "The decoder matches topic0 against the versioned ABI registry, reads the pool’s token0/token1 from protocol.contracts, and orients the signed amounts into token_sold / token_bought.",
      },
      {
        h: "Findings",
        t: "A naive abs() on both amounts double-counts flash-swap repayments. We keep only the user-facing leg and attach the flash flag from the surrounding call trace when present.",
      },
      {
        h: "Implications for the data model",
        t: "dex.trades is a union of protocol decoders, not a Uniswap table. Each row keeps tx_hash, log_index and protocol so a trade can be traced back to the exact Swap log that produced it.",
      },
    ],
    datasets: ["dex.trades", "arc.logs"],
  },
  {
    title: "Modeling Stablecoin Activity on Arc",
    kind: "Protocol",
    meta: "Stablecoins · 9 min",
    parent: "Research",
    slug: slugify("Modeling Stablecoin Activity on Arc"),
    lead: "Stablecoin volume on a new chain is easy to overstate. We separate issuer mints, internal settlement and user payments before publishing a number.",
    sections: [
      {
        h: "Context",
        t: "token.transfers includes every ERC-20 Transfer. For USDC-class tokens that mix mint, burn, treasury rebalancing and user payment in the same event, raw volume is not activity.",
      },
      {
        h: "Method",
        t: "Issuer addresses are listed in protocol.contracts. Transfers where from or to is the issuer are tagged mint/burn. Remaining transfers are candidates for payments.transfers once the semantic layer lands.",
      },
      {
        h: "Findings",
        t: "On the Arc blocks we have decoded so far, issuer-side movement accounts for a large share of apparent stablecoin volume. Reporting raw Transfer sums would mislead any TVL or activity dashboard.",
      },
      {
        h: "Implications for the data model",
        t: "stablecoin.transfers will carry an activity column rather than a separate mint table. Until that ships, token.transfers is the source of truth and volume charts should not be built from it unfiltered.",
      },
    ],
    datasets: ["token.transfers", "stablecoin.transfers"],
  },
  {
    title: "What Counts as Real Stablecoin Volume?",
    kind: "Methodology",
    meta: "Stablecoins · 12 min",
    parent: "Research",
    slug: slugify("What Counts as Real Stablecoin Volume?"),
    lead: "Volume is a derived metric, not a column. This note states the filters we will use and the ones we will not.",
    sections: [
      {
        h: "Context",
        t: "Dashboards often sum Transfer amounts and call the result volume. That number includes mint, burn, router hops, MEV backruns and self-transfers.",
      },
      {
        h: "Method",
        t: "We classify each transfer, then define volume as the sum of payments.transfers where noise = false. Router hops that net to a single user payment collapse to one row.",
      },
      {
        h: "Findings",
        t: "Self-transfers and zero-amount events are common enough on Arc to move a daily chart. They are cheap to filter at the canonical layer and expensive to explain later.",
      },
      {
        h: "Implications for the data model",
        t: "Volume is computed in SQL over classified rows, not stored. The classification itself is versioned so a definition change can be replayed.",
      },
    ],
    datasets: ["token.transfers", "activity.classifications"],
  },
  {
    title: "How We Decode Protocol Events",
    kind: "Methodology",
    meta: "Decoding · 8 min",
    parent: "Research",
    slug: slugify("How We Decode Protocol Events"),
    lead: "Decoding is a registry lookup plus a typed writer. This note is the procedure, not the ABI catalogue.",
    sections: [
      {
        h: "Context",
        t: "A log is bytes. A decoded table is a typed row. The gap is an ABI, a contract version and a writer that never appends duplicates.",
      },
      {
        h: "Method",
        t: "topic0 is matched against a versioned ABI registry keyed by (protocol, version, event). Unknown topics stay in arc.logs. Known topics write one row to a protocol-namespaced table.",
      },
      {
        h: "Findings",
        t: "Proxy contracts reuse implementation ABIs across versions. The registry therefore keys on the implementation code hash, not the proxy address, and records the proxy as the emitting address.",
      },
      {
        h: "Implications for the data model",
        t: "Decoded tables are protocol-specific. Canonical tables union them. Raw logs are never mutated, so a decoder bug is a rebuild, not a patch.",
      },
    ],
    datasets: ["arc.logs", "protocol.contracts"],
  },
  {
    title: "Entity Attribution: From Address to Identity",
    kind: "Methodology",
    meta: "Entities · 15 min",
    parent: "Research",
    slug: slugify("Entity Attribution: From Address to Identity"),
    lead: "An address is not an entity. Attribution is a scored mapping, published with the evidence that produced the score.",
    sections: [
      {
        h: "Context",
        t: "Explorers label addresses as a display convenience. Research and risk need a mapping that can be wrong, and a way to say how wrong.",
      },
      {
        h: "Method",
        t: "Seeds come from protocol deployments, attested registries and clustered funding. Each edge carries a method and a confidence. The published table is the current best label per address, not the full graph.",
      },
      {
        h: "Findings",
        t: "High-confidence labels are sparse. Most addresses remain unlabeled, which is the correct default. Forcing a name produces the kind of silent error the rest of the pipeline is built to avoid.",
      },
      {
        h: "Implications for the data model",
        t: "entity.attributions.confidence is required. Downstream models that need a name must filter, not coalesce to “unknown entity” as if it were a finding.",
      },
    ],
    datasets: ["entity.attributions", "arc.transactions"],
  },
  {
    title: "Classifying Onchain Activity",
    kind: "Methodology",
    meta: "Semantics · 10 min",
    parent: "Research",
    slug: slugify("Classifying Onchain Activity"),
    lead: "A transaction can be a swap, a payment, a rebalance, or noise. Classification is a layer on top of canonical rows, not a replacement for them.",
    sections: [
      {
        h: "Context",
        t: "Canonical tables say what happened at the protocol level. Product questions — “did a user pay, or did a router hop?” — need a second pass.",
      },
      {
        h: "Method",
        t: "Rules run over canonical rows and traces: if a dex.trades row is surrounded by token.transfers that net to the same user, the outer transfers are marked internal.",
      },
      {
        h: "Findings",
        t: "Most misclassification we have seen is over-labeling, not under-labeling. A conservative default of “unclassified” is cheaper to correct than a confident wrong label.",
      },
      {
        h: "Implications for the data model",
        t: "activity.classifications is additive. It never overwrites dex.trades or token.transfers. Consumers who want raw mechanics keep using the canonical tables.",
      },
    ],
    datasets: ["activity.classifications", "token.transfers"],
  },
  {
    title: "Detecting Internal Transfers",
    kind: "Methodology",
    meta: "Semantics · 7 min",
    parent: "Research",
    slug: slugify("Detecting Internal Transfers"),
    lead: "Internal movement is the main source of inflated volume. This note is the detector we will ship with the semantic layer.",
    sections: [
      {
        h: "Context",
        t: "A Uniswap swap produces at least two token.transfers. Counting both as user activity double-counts the same economic event.",
      },
      {
        h: "Method",
        t: "Within a transaction, transfers that are explained by a decoded protocol event are flagged internal. Unexplained transfers remain candidates for payments.",
      },
      {
        h: "Findings",
        t: "The detector is only as good as the decoder coverage. On protocols we have not decoded, we do not guess — those transfers stay unclassified.",
      },
      {
        h: "Implications for the data model",
        t: "noise filtering is Phase 4. Until then, token.transfers is complete and unlabeled, which is preferable to a partial, overconfident filter.",
      },
    ],
    datasets: ["token.transfers", "activity.classifications"],
  },
];

export const ENGINEERING: Article[] = [
  {
    title: "Designing Incremental Blockchain Pipelines",
    kind: "Published",
    meta: "Engineering",
    parent: "Engineering",
    slug: slugify("Designing Incremental Blockchain Pipelines"),
    lead: "A blockchain indexer is an incremental pipeline over an append-only log that sometimes rewrites its tail. The design has to assume both.",
    sections: [
      {
        h: "Context",
        t: "Batch ETL assumes a closed range. A chain does not close. Head follows new blocks; backfill closes historical ranges; reorgs reopen them.",
      },
      {
        h: "Method",
        t: "Two workers share one write path. The backfiller claims exclusive ranges. The head follower reads with a two-block lag. Both write rows keyed by (block_number, block_hash).",
      },
      {
        h: "Findings",
        t: "Sharing the write path matters more than sharing the fetch path. Divergent writers produce divergent schemas, and the canonical layer cannot repair that.",
      },
      {
        h: "Implications for the data model",
        t: "Every table that is derived from a block range must be rebuildable from that range. If it cannot, it does not belong in the pipeline.",
      },
    ],
    datasets: ["arc.blocks", "arc.transactions"],
  },
  {
    title: "Using dbt for Onchain Data",
    kind: "Published",
    meta: "Engineering",
    parent: "Engineering",
    slug: slugify("Using dbt for Onchain Data"),
    lead: "Decoded tables are a transform. Canonical tables are a model. dbt is the right tool for the second, and the wrong tool for the first.",
    sections: [
      {
        h: "Context",
        t: "The decoder is a Rust writer against a live head. dbt runs after the raw and decoded tables are already in ClickHouse.",
      },
      {
        h: "Method",
        t: "Canonical models are incremental, filtered by block_number, and unique on (tx_hash, log_index). A reorg deletes the range and the next dbt run fills it.",
      },
      {
        h: "Findings",
        t: "dbt tests catch schema drift between decoders — a Uniswap decoder that names amount_in differently from a fork decoder is a failed uniqueness test, not a late-night surprise.",
      },
      {
        h: "Implications for the data model",
        t: "Protocol-specific decoding stays out of dbt. Domain unions (dex.trades, token.transfers) live in dbt, where they can be reviewed as SQL.",
      },
    ],
    datasets: ["dex.trades", "token.transfers"],
  },
  {
    title: "ClickHouse Schema Design for Blockchain Data",
    kind: "Published",
    meta: "Engineering",
    parent: "Engineering",
    slug: slugify("ClickHouse Schema Design for Blockchain Data"),
    lead: "Blockchain tables are wide, append-heavy and queried by block range. MergeTree with a (block_number, tx_index) order fits; JSON columns do not.",
    sections: [
      {
        h: "Context",
        t: "The first traces schema stored the call tree as a JSON string. Queries that needed a from/to pair scanned the whole column.",
      },
      {
        h: "Method",
        t: "Raw tables are flattened. Low-cardinality strings for protocol and status. UInt256 stored as Decimal(76,0) until native wide integers are uniform across the cluster.",
      },
      {
        h: "Findings",
        t: "Partitioning by a 1,000-block range makes reorg deletes cheap. Ordering by (block_number, tx_index, log_index) makes decoder joins a merge rather than a hash.",
      },
      {
        h: "Implications for the data model",
        t: "If a field will be filtered, it is a column. If it will be displayed once, it can wait. Traces taught us that the expensive way around.",
      },
    ],
    datasets: ["arc.logs", "arc.blocks"],
  },
  {
    title: "Handling Blockchain Reorgs",
    kind: "Draft",
    meta: "Engineering",
    parent: "Engineering",
    slug: slugify("Handling Blockchain Reorgs"),
    lead: "A reorg is a delete plus a rebuild, keyed by block hash. This draft is the procedure the indexer already runs; the published note will include measured depths on Arc.",
    sections: [
      {
        h: "Context",
        t: "Arc can reorganise its most recent blocks. Serving the head without a lag means serving data that may disappear.",
      },
      {
        h: "Method",
        t: "On every new block the indexer compares the parent hash with the stored hash at height − 1. A mismatch marks a reorg starting at the deepest divergent height.",
      },
      {
        h: "Findings",
        t: "Draft. Depths and frequencies will be published with Build Log #007.",
      },
      {
        h: "Implications for the data model",
        t: "All writes are keyed by (block_number, block_hash). Re-processing a block replaces its rows. The API lags the head by two blocks.",
      },
    ],
    datasets: ["arc.blocks", "arc.transactions"],
  },
  {
    title: "Building Reliable Backfills",
    kind: "Draft",
    meta: "Engineering",
    parent: "Engineering",
    slug: slugify("Building Reliable Backfills"),
    lead: "A backfill is a range job with checkpoints, not a one-shot script. Draft notes while the remaining historical ranges close.",
    sections: [
      {
        h: "Context",
        t: "Genesis coverage is what makes the datasets usable for research. A hole at block 12 is a hole in every derived table.",
      },
      {
        h: "Method",
        t: "Ranges of 200 blocks, checkpoint every 1,000, adaptive RPC batching. Failed ranges go back on a queue rather than stalling the worker.",
      },
      {
        h: "Findings",
        t: "Draft. RPC version skew is the main source of retry storms so far.",
      },
      {
        h: "Implications for the data model",
        t: "The lineage table records node version per range. A later decoder change can rebuild from raw without re-fetching the chain.",
      },
    ],
    datasets: ["arc.blocks", "arc.logs"],
  },
  {
    title: "Designing Canonical Schemas",
    kind: "Draft",
    meta: "Engineering",
    parent: "Engineering",
    slug: slugify("Designing Canonical Schemas"),
    lead: "A canonical table has one schema, many protocols, and a lineage key back to the raw log. Draft while dex.trades is being designed.",
    sections: [
      {
        h: "Context",
        t: "Protocol tables are accurate and unusable across protocols. Canonical tables are usable and must not lose the protocol.",
      },
      {
        h: "Method",
        t: "Each canonical row keeps protocol, tx_hash, log_index and block_number. Domain fields are the intersection of what every decoder can populate honestly.",
      },
      {
        h: "Findings",
        t: "Draft. The temptation is to add a column for every protocol quirk. That produces a protocol table with extra names.",
      },
      {
        h: "Implications for the data model",
        t: "If a field cannot be filled by every decoder in the union, it stays on the protocol table.",
      },
    ],
    datasets: ["dex.trades", "token.transfers"],
  },
  {
    title: "Building Idempotent Indexers",
    kind: "Draft",
    meta: "Engineering",
    parent: "Engineering",
    slug: slugify("Building Idempotent Indexers"),
    lead: "Retries are the common case. An indexer that appends on retry duplicates the chain.",
    sections: [
      {
        h: "Context",
        t: "RPC timeouts, process restarts and reorg repairs all re-process blocks that may already be stored.",
      },
      {
        h: "Method",
        t: "Inserts are keyed by block hash. A retry for the same hash replaces. A retry for a new hash at the same height is a reorg, not a duplicate.",
      },
      {
        h: "Findings",
        t: "Draft. The first writer used block_number as the key and duplicated every repaired block.",
      },
      {
        h: "Implications for the data model",
        t: "Uniqueness is (block_number, block_hash) at the raw layer and (tx_hash, log_index) at the decoded layer.",
      },
    ],
    datasets: ["arc.blocks", "arc.transactions"],
  },
];

export const LOG_HEADINGS = [
  "What I built",
  "Why it matters",
  "Architecture",
  "Implementation",
  "Problems encountered",
  "What I learned",
  "What's next",
];

export type LogEntry = {
  id: string;
  n: string;
  title: string;
  date: string;
  status: "Published" | "Building" | "Planned";
  body: string[] | null;
};

export const BUILD_LOG: LogEntry[] = [
  {
    id: "001",
    n: "#001",
    title: "Why I Started BlockTrellis",
    date: "2026-03-02",
    status: "Published",
    body: [
      "A public statement of the project: a blockchain data engineering platform, starting with Arc Mainnet, built in the open.",
      "Most chain data products skip from RPC to a dashboard. The missing work is the part in between — decoding, canonical models, and the ability to explain a number.",
      "A small pipeline with a documented raw layer, rather than a warehouse of unnamed JSON.",
      "This log, a genesis indexer, and a rule that unfinished work is labeled Building or Coming Soon instead of hidden.",
      "The urge to describe the future product instead of the current tables.",
      "Raw data is easy to collect. Meaning is harder. That sentence is the product.",
      "Indexing Arc from genesis (#002).",
    ],
  },
  {
    id: "002",
    n: "#002",
    title: "Indexing Arc from Genesis",
    date: "2026-03-19",
    status: "Published",
    body: [
      "A backfill from block 0 to head, and a live tail that follows new blocks with a two-block lag.",
      "Coverage from genesis is what makes the datasets trustworthy for research.",
      "Two workers: a range backfiller and a head follower sharing one write path.",
      "Rate-limited RPC with adaptive batch sizing; checkpoint every 1,000 blocks.",
      "RPC providers return inconsistent trace formats between versions.",
      "Pin the node version and record it in the lineage table.",
      "Design the raw layer schema (#003).",
    ],
  },
  {
    id: "003",
    n: "#003",
    title: "Designing the Raw Data Layer",
    date: "2026-04-08",
    status: "Published",
    body: [
      "A raw layer of four tables — arc.blocks, arc.transactions, arc.logs, arc.traces — written straight from node RPC with no interpretation.",
      "Everything above depends on it. If raw is lossy or reorders fields, every decoder inherits the bug.",
      "Node → fetcher → batch writer → ClickHouse MergeTree, partitioned by block range, ordered by (block_number, tx_index).",
      "Batches of 200 blocks; each batch is a single insert keyed by block hash so retries are safe.",
      "Traces are 30× the size of logs. First schema stored them as JSON strings and queries were unusable.",
      "Flatten early. Typed columns beat JSON blobs for anything that gets queried more than once.",
      "Token transfers as the first derived table (#004).",
    ],
  },
  {
    id: "004",
    n: "#004",
    title: "Parsing ERC-20 Transfers",
    date: "2026-05-03",
    status: "Published",
    body: [
      "token.transfers: a canonical ERC-20 Transfer table with scaled amounts, sourced from arc.logs.",
      "It is the first derived dataset and the template for every later canonical table — lineage keys, no mutation of raw, rebuildable by block range.",
      "Decoder matches Transfer(topic0), reads decimals from a token registry, writes amount_raw and amount.",
      "Tokens with missing decimals stay as amount_raw only; we do not guess 18.",
      "A handful of non-standard Transfer events (indexed value, missing to) failed ABI decode and were dropped until we added a fallback path.",
      "Canonical tables should degrade to raw fields rather than invent values. Null is better than 18.",
      "The first protocol decoder, starting with Uniswap V3 (#006), after a canonical-dataset write-up (#005).",
    ],
  },
  {
    id: "005",
    n: "#005",
    title: "Building the First Canonical Dataset",
    date: "2026-06-11",
    status: "Published",
    body: [
      "A written convention for canonical tables: domain namespace, protocol column, (tx_hash, log_index) uniqueness, rebuild-from-raw.",
      "Without the convention, every decoder invents a slightly different trade table and nothing unions cleanly.",
      "dbt models over decoded tables, incremental on block_number, tested for uniqueness and not-null lineage keys.",
      "token.transfers was rewritten against the convention so it would not be a special case.",
      "The first draft had both token_address and contract_address. Two names for one thing is how silos start.",
      "Name the thing once. Put protocol-specific extras on the protocol table.",
      "Uniswap protocol decoding (#006).",
    ],
  },
  {
    id: "006",
    n: "#006",
    title: "Adding Uniswap Protocol Decoding",
    date: "2026-08-20",
    status: "Building",
    body: null,
  },
  {
    id: "007",
    n: "#007",
    title: "Handling Chain Reorgs",
    date: "—",
    status: "Planned",
    body: null,
  },
  {
    id: "008",
    n: "#008",
    title: "Introducing Entity Attribution",
    date: "—",
    status: "Planned",
    body: null,
  },
  {
    id: "009",
    n: "#009",
    title: "Classifying Stablecoin Activity",
    date: "—",
    status: "Planned",
    body: null,
  },
  {
    id: "010",
    n: "#010",
    title: "Scoping the Real Build: Ethereum and Arc",
    date: "2026-09-17",
    status: "Published",
    body: [
      "No code today — a job posting for Allium's Blockchain Data Wizard, Analyst or Scientist role reframed the project's scope: two real chains instead of one.",
      "Turning data scattered across a chain into something useful is the same job I've done for years, just moved on-chain — scraping and cleaning websites, now parsing protocol data straight off RPC.",
      "Still three stages, described plainly: pull raw data from a node, decode key events against each protocol's ABI, normalize the result into tables an analyst or auditor can actually use.",
      "Not started. The only decision made so far is scope: Ethereum Mainnet and Arc, nothing else, for now.",
      "Every blockchain data job posting wants a dozen chains. Picking two on purpose, and writing that down, is harder than it sounds.",
      "The distance between \"scraping websites\" and \"decoding a chain\" is smaller than it looks — same discipline, different source.",
      "Start pulling raw blocks and transactions from an Ethereum node and an Arc node.",
    ],
  },
];

export const ARCH_LAYERS = [
  {
    name: "Arc Node",
    kind: "Source",
    cells: ["JSON-RPC", "WebSocket"],
    detail:
      "A pinned Arc full node. BlockTrellis reads blocks, receipts and traces over RPC and subscribes to new heads over WebSocket.",
    status: "Live",
    stack: "arc-node v1.4",
  },
  {
    name: "Data Ingestion",
    kind: "Pipeline",
    cells: ["backfill", "head follower", "checkpoints"],
    detail:
      "Two workers share one write path: a range backfiller from genesis and a head follower with a two-block lag. Writes are idempotent by block hash.",
    status: "Live",
    stack: "Rust · Tokio",
  },
  {
    name: "Raw Layer",
    kind: "Storage",
    cells: ["arc.blocks", "arc.transactions", "arc.logs", "arc.traces"],
    detail:
      "Typed, flattened raw tables with no interpretation. Every higher layer is derived from these and can be rebuilt from them.",
    status: "Live",
    stack: "ClickHouse MergeTree",
  },
  {
    name: "Protocol Decoder",
    kind: "Transform",
    cells: ["ABI registry", "event decoding", "call decoding"],
    detail:
      "Matches log topics and calldata against a versioned ABI registry, producing one decoded table per protocol event.",
    status: "Building",
    stack: "Rust · dbt",
  },
  {
    name: "Canonical Layer",
    kind: "Models",
    cells: ["dex.trades", "stablecoin.transfers", "lending.activities", "token.transfers"],
    detail:
      "Protocol-specific decoded tables are unioned into domain tables with one schema, keeping tx_hash and log_index for lineage.",
    status: "Beta",
    stack: "dbt · ClickHouse",
  },
  {
    name: "Semantic Layer",
    kind: "Intelligence",
    cells: ["entity attribution", "activity classification", "noise filtering"],
    detail:
      "Adds who and what: addresses resolved to entities with confidence scores, transactions labelled by activity, internal movement flagged.",
    status: "Coming Soon",
    stack: "Python · dbt",
  },
  {
    name: "Storage",
    kind: "Serving store",
    cells: ["ClickHouse", "PostgreSQL"],
    detail:
      "ClickHouse for analytical tables and the SQL engine; PostgreSQL for metadata, lineage and API keys.",
    status: "Live",
    stack: "ClickHouse 24 · PG 16",
  },
  {
    name: "Serve",
    kind: "Interfaces",
    cells: ["API", "SQL", "MCP", "Realtime"],
    detail:
      "REST API today; SQL console, MCP server for agents, and realtime streams follow the roadmap.",
    status: "Beta",
    stack: "Go · REST",
  },
];

export const LAST_24H = [
  { k: "Blocks indexed", v: "43,210" },
  { k: "Transactions", v: "2.91M" },
  { k: "Logs processed", v: "18.2M" },
  { k: "Errors", v: "0.0012%" },
];

export const EXPLORE_TABS = [
  {
    name: "Blocks",
    status: "Live",
    note: "",
    cols: [] as string[],
  },
  {
    name: "Transactions",
    status: "Live",
    note: "Table view lands with the next Explore release.",
    cols: ["Tx hash", "Block", "From", "To", "Value", "Status"],
  },
  {
    name: "Tokens",
    status: "Beta",
    note: "Metadata (symbol, decimals) is being backfilled.",
    cols: ["Token", "Symbol", "Transfers 24h", "Holders", "Last transfer"],
  },
  {
    name: "Protocols",
    status: "Building",
    note: "Protocol pages appear as decoders ship.",
    cols: ["Protocol", "Version", "Contracts", "Events decoded", "Status"],
  },
  {
    name: "Entities",
    status: "Coming Soon",
    note: "Depends on the semantic layer (Phase 4).",
    cols: ["Entity", "Type", "Addresses", "Confidence", "Activity 24h"],
  },
];

export const SQL_SAMPLE = `SELECT *
FROM dex.trades
WHERE chain = 'arc'
LIMIT 100;`;

export type Endpoint = {
  method: "GET";
  path: string;
  title: string;
  desc: string;
  params: { n: string; t: string; req: string; d: string }[];
  json: string;
};

export const ENDPOINTS: Endpoint[] = [
  {
    method: "GET",
    path: "/v1/arc/blocks/latest",
    title: "Latest block",
    desc: "Returns the most recently indexed block on Arc Mainnet. Lags the chain head by two blocks to avoid serving data that may be reorganised.",
    params: [],
    json: `{
  "block_number": 2918329,
  "block_hash": "0x7f3a…c21e",
  "timestamp": "2026-09-15T08:41:02Z",
  "gas_used": 14820331,
  "transaction_count": 67
}`,
  },
  {
    method: "GET",
    path: "/v1/arc/blocks/{height}",
    title: "Block by height",
    desc: "Returns a single block by its height.",
    params: [
      { n: "height", t: "integer", req: "required", d: "Block number, 0 = genesis" },
    ],
    json: `{
  "block_number": 1000000,
  "block_hash": "0x2b91…4e0a",
  "timestamp": "2026-05-30T14:02:11Z",
  "gas_used": 9120044,
  "transaction_count": 41
}`,
  },
  {
    method: "GET",
    path: "/v1/arc/transactions/{hash}",
    title: "Transaction by hash",
    desc: "Returns a transaction with its receipt status and decoded logs where a decoder exists.",
    params: [
      { n: "hash", t: "string", req: "required", d: "0x-prefixed transaction hash" },
      {
        n: "include_logs",
        t: "boolean",
        req: "optional",
        d: "Attach raw and decoded logs (default false)",
      },
    ],
    json: `{
  "tx_hash": "0x9ac1…77d3",
  "block_number": 2918200,
  "from_address": "0x4f2a…",
  "to_address": "0xa0b8…",
  "value": "0",
  "status": 1,
  "logs": []
}`,
  },
  {
    method: "GET",
    path: "/v1/arc/address/{address}",
    title: "Address summary",
    desc: "Returns balances, first and last activity and — once the semantic layer ships — the attributed entity.",
    params: [{ n: "address", t: "string", req: "required", d: "0x-prefixed address" }],
    json: `{
  "address": "0x4f2a…",
  "first_seen_block": 12,
  "last_seen_block": 2918290,
  "tx_count": 18432,
  "entity": null
}`,
  },
  {
    method: "GET",
    path: "/v1/arc/token-transfers",
    title: "Token transfers",
    desc: "Lists normalized ERC-20 transfers, filterable by token, address and block range.",
    params: [
      { n: "token", t: "string", req: "optional", d: "Token contract address" },
      { n: "address", t: "string", req: "optional", d: "Match from or to" },
      { n: "from_block", t: "integer", req: "optional", d: "Inclusive lower bound" },
      { n: "limit", t: "integer", req: "optional", d: "Max 1000 (default 100)" },
    ],
    json: `{
  "data": [
    {
      "token_address": "0xd9e1…",
      "from_address": "0x4f2a…",
      "to_address": "0x88c0…",
      "amount": "2500.000000",
      "block_number": 2918290
    }
  ],
  "next_cursor": "eyJiIjoyOTE4Mjkw…"
}`,
  },
  {
    method: "GET",
    path: "/v1/dex/trades",
    title: "DEX trades",
    desc: "Canonical swaps across all decoded DEX protocols. Building — returns 501 until dex.trades is live.",
    params: [
      { n: "protocol", t: "string", req: "optional", d: "e.g. uniswap_v3" },
      { n: "pool", t: "string", req: "optional", d: "Pool address" },
    ],
    json: `{
  "error": "not_implemented",
  "message": "dex.trades is building. Track progress at /status.",
  "status": 501
}`,
  },
];

export function articleBySlug(parent: "Research" | "Engineering", slug: string) {
  const list = parent === "Research" ? RESEARCH : ENGINEERING;
  return list.find((a) => a.slug === slug);
}

export function logById(id: string) {
  return BUILD_LOG.find((l) => l.id === id) ?? BUILD_LOG[2];
}

export function latestLogPreview() {
  const building = BUILD_LOG.filter((l) => l.status === "Building");
  const published = BUILD_LOG.filter((l) => l.status === "Published").slice(-2).reverse();
  return [...building, ...published];
}
