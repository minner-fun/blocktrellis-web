# ChainForge Website Prototype Brief

## 1. Product Positioning

**Product Name:** ChainForge  
**Domain:** `chainforge.cn`

### Tagline

> **From raw blockchain data to structured onchain intelligence.**

中文理解：

> 从原始区块链数据，到结构化链上智能。

ChainForge is not a simple block explorer or dashboard. It should be presented as a growing:

> **Blockchain Data Engineering Platform**

Core data pipeline:

```text
Raw Blockchain Data
        ↓
Protocol Decoding
        ↓
Canonical Data Models
        ↓
Entity Attribution
        ↓
Activity Classification
        ↓
APIs / SQL / Data Products
```

The first supported network is:

> **Arc Mainnet**

ChainForge starts by indexing Arc from mainnet launch / genesis and gradually adds protocol parsers, canonical datasets, semantic layers, APIs, and higher-level intelligence as the ecosystem grows.

---

# 2. Overall Visual Direction

The site should look like a serious blockchain data infrastructure company, not a personal portfolio and not a crypto marketing website.

### Visual references

- Allium
- Dune
- Helius
- Alchemy
- Vercel
- Linear
- Datadog
- ClickHouse
- Snowflake

### Style keywords

```text
clean
technical
credible
minimal
data-centric
developer-focused
professional
```

### Avoid

- excessive neon
- NFT / meme aesthetics
- large 3D crypto spheres
- excessive gradients
- speculative token language
- “1000x / decentralized future” marketing copy
- visual noise

### Prefer

Use product-native visual elements such as:

```text
SQL
JSON
schema
terminal
pipeline diagrams
data tables
API examples
metrics
status indicators
```

The visual identity should feel like:

> **Developer Infrastructure + Data Engineering + Research**

---

# 3. Main Navigation

Recommended navigation:

```text
ChainForge

Product
Datasets
Docs
Research
Engineering
Build Log
About

[GitHub]
[Explore Data]
```

A more compact alternative:

```text
Product
Datasets
Docs
Research
Build Log
GitHub
```

---

# 4. Homepage Hero

## Main Heading

Option 1:

> **Blockchain data, forged into intelligence.**

Option 2:

> **From raw blockchain data to structured intelligence.**

## Supporting Copy

> ChainForge indexes, decodes and models blockchain data into reliable datasets for developers, analysts and researchers.

## CTA

```text
[Explore Data]
[Read the Docs]
```

## Hero Visualization

Use an animated or interactive pipeline diagram:

```text
Arc Mainnet
    ↓
Blocks
Transactions
Logs
    ↓
Protocol Decoding
    ↓
Canonical Models
    ↓
APIs / SQL / Intelligence
```

---

# 5. Homepage Section — What ChainForge Does

Title:

> **From chain data to usable data**

Present the platform as five progressive layers.

## 01 — Ingest

```text
Blocks
Transactions
Logs
Traces
```

Copy:

> Capture raw blockchain data directly from chain nodes.

## 02 — Decode

```text
ABI
Events
Calls
Protocol Mechanics
```

Copy:

> Decode protocol-specific events and contract interactions.

## 03 — Normalize

```text
dex.trades
token.transfers
lending.borrow
payments
```

Copy:

> Transform protocol-specific data into canonical datasets.

## 04 — Understand

```text
Entity Attribution
Activity Classification
Noise Filtering
```

Copy:

> Add semantic context to understand who is acting and what is happening.

## 05 — Serve

```text
API
SQL
Realtime
MCP
```

Copy:

> Make structured blockchain data accessible to applications, analysts and AI agents.

---

# 6. Homepage Section — Starting with Arc

Title:

> **Starting with Arc**

Copy:

> ChainForge begins with Arc Mainnet, indexing the network from day one.

Example live status card:

```text
Arc Mainnet

Status              Live
Coverage            From Genesis
Latest Block        XXXXX
Indexed Block       XXXXX
Indexing Lag        2 blocks
Protocols Indexed   3
Datasets             8
```

Dataset progress:

```text
✓ Blocks
✓ Transactions
✓ Logs
✓ Token Transfers
○ DEX Trades
○ Stablecoin Activity
○ Lending
○ Entity Labels
```

This section should later be able to connect to real backend data.

---

# 7. Datasets Page

The Datasets page should feel like a real data catalog.

## Header

> **Datasets**

Search:

> Search datasets...

Categories:

```text
Core
Tokens
DEX
Lending
Stablecoins
Payments
Entities
Protocols
```

## Example Dataset

### `arc.blocks`

Description:

> Canonical block-level data from Arc Mainnet.

Example fields:

```text
block_number
block_hash
timestamp
gas_used
transaction_count
```

### `arc.transactions`

Description:

> Transactions executed on Arc.

### `token.transfers`

Description:

> Normalized ERC-20 token transfers.

### `dex.trades`

Status:

```text
Coming Soon
```

Future metadata:

```text
Rows
Last Updated
Freshness
Coverage
Schema
```

Example:

```text
Rows            28.4M
Freshness       3 sec
Coverage        Genesis → latest
Updated         8 sec ago
```

---

# 8. Docs Page

Docs should feel like a real developer platform, not just a README.

## Suggested Left Navigation

```text
Introduction

Getting Started
  Quickstart
  Authentication
  Rate Limits

Data
  Data Model
  Core Tables
  Tokens
  DEX
  Lending
  Stablecoins

API
  Overview
  Blocks
  Transactions
  Tokens
  Protocols

SQL
  Query Engine
  Example Queries

Concepts
  Canonical Models
  Protocol Decoding
  Entity Attribution
  Activity Classification

Infrastructure
  Data Freshness
  Data Quality
  Reorg Handling
```

Important engineering concepts to document:

```text
Reorg Handling
Idempotency
Data Freshness
Canonical Schema
Data Lineage
Attribution Confidence
```

These pages are part of the product and also part of the engineering portfolio.

---

# 9. Research Section

Research should focus on protocol mechanics and blockchain data methodology.

Positioning:

> **Protocol research + blockchain data methodology**

Possible articles:

```text
Understanding Arc's Transaction Model

How Uniswap V3 Swap Events Become dex.trades

Modeling Stablecoin Activity on Arc

What Counts as Real Stablecoin Volume?

How We Decode Protocol Events

Entity Attribution: From Address to Identity

Classifying Onchain Activity

Detecting Internal Transfers
```

Research answers:

> What did we learn about the chain, protocol, or data behavior?

---

# 10. Build Log Section

This is one of the most important parts of the site.

Title:

> **Build Log**

Subtitle:

> Building ChainForge in public.

Possible entries:

```text
#001 — Why I Started ChainForge

#002 — Indexing Arc from Genesis

#003 — Designing the Raw Data Layer

#004 — Parsing ERC-20 Transfers

#005 — Building the First Canonical Dataset

#006 — Adding Uniswap Protocol Decoding

#007 — Handling Chain Reorgs

#008 — Introducing Entity Attribution

#009 — Classifying Stablecoin Activity
```

Recommended article template:

```text
What I built
Why it matters
Architecture
Implementation
Problems encountered
What I learned
What's next
```

Build Log answers:

> What did we build, how did we build it, and what did we learn?

---

# 11. Engineering Section

As the content grows, separate:

```text
Research
Engineering
Build Log
```

## Research

Protocol and data research.

## Engineering

Reusable engineering methodology.

Possible articles:

```text
Designing Incremental Blockchain Pipelines

Using dbt for Onchain Data

ClickHouse Schema Design for Blockchain Data

Handling Blockchain Reorgs

Building Reliable Backfills

Designing Canonical Schemas

Building Idempotent Indexers
```

## Build Log

Chronological development notes and project progress.

---

# 12. Architecture Page

Suggested URL:

```text
/architecture
```

Main architecture diagram:

```text
                Arc Node
                   ↓
             Data Ingestion
                   ↓
      ┌────────────┼────────────┐
    Blocks      Transactions    Logs
                                ↓
                         Protocol Decoder
                                ↓
                         Canonical Layer
                                ↓
          ┌──────────┬──────────┬──────────┐
         DEX      Stablecoin   Lending    Token
                                ↓
                         Semantic Layer
                                ↓
              Entity Attribution
              Activity Classification
                                ↓
                    ClickHouse / PostgreSQL
                                ↓
             API / SQL / MCP / Realtime
```

Each layer can be clickable or expandable.

This page should visually communicate how ChainForge transforms raw chain data into reusable data products.

---

# 13. Data Quality / Status Page

Title:

> **Network & Data Status**

Example:

```text
Arc

Indexer Status        Healthy
Latest Block          2,918,331
Indexed Block         2,918,329
Lag                   2 blocks
Missing Blocks        0

Pipeline
────────────────────────

Blocks                Healthy
Transactions          Healthy
Logs                   Healthy
Token Transfers       Healthy
DEX Trades            Building

Last 24h

Blocks indexed        43,210
Transactions          2.91M
Logs processed        18.2M
Errors                 0.0012%
```

This section should later connect to real monitoring data.

---

# 14. Explore Page

Suggested URL:

```text
/explore
```

First version can be a lightweight data explorer.

Possible sections:

```text
Blocks
Transactions
Tokens
Protocols
Entities
```

Future feature:

```text
SQL Console
```

Example:

```sql
SELECT *
FROM dex.trades
WHERE chain = 'arc'
LIMIT 100;
```

For the prototype, this can initially be visual only.

---

# 15. API Page

Even if the first version has only a few endpoints, design the page like a mature platform.

Example endpoints:

```text
GET /v1/arc/blocks/latest

GET /v1/arc/blocks/{height}

GET /v1/arc/transactions/{hash}

GET /v1/arc/address/{address}

GET /v1/arc/token-transfers

GET /v1/dex/trades
```

Recommended layout:

- endpoint navigation on the left
- request parameters in the middle
- live JSON example on the right

Visual reference:

> Stripe-style API documentation

---

# 16. About Page

Do not write generic Web3 company hype.

Suggested copy:

> ChainForge is an independent blockchain data engineering project focused on understanding how raw blockchain data becomes reliable, reusable and meaningful datasets.

> It started in 2026 with Arc Mainnet and is being built in public.

## Principles

```text
Accuracy over hype
Explainability over black boxes
Canonical models over protocol silos
Open learning
Engineering first
```

---

# 17. Build in Public Section on Homepage

The homepage should include a visible section:

> **Building ChainForge in Public**

Show the latest three Build Log entries, for example:

```text
#003 Parsing Token Transfers on Arc

#002 Building the Arc Indexer

#001 Why ChainForge Exists
```

CTA:

> View Build Log →

The product should openly communicate that it is actively being built and improved.

This is not a weakness. It is part of the product identity.

---

# 18. Core Narrative

All site copy should reinforce the idea:

> **Raw data is easy to collect. Meaning is harder.**

Another possible homepage statement:

> Blockchains produce data.  
> ChainForge turns it into meaning.

The product story should move from:

```text
data
↓
structure
↓
context
↓
meaning
```

---

# 19. Recommended Sitemap

```text
/
├── Product
├── Datasets
│   ├── Arc
│   ├── Core
│   ├── Tokens
│   └── Protocols
│
├── Explore
│
├── Docs
│   ├── Getting Started
│   ├── Data Model
│   ├── API
│   ├── SQL
│   └── Concepts
│
├── Research
│
├── Engineering
│
├── Build Log
│
├── Architecture
│
├── Status
│
└── About
```

## First Version Pages to Fully Implement

```text
Home
Datasets
Docs
Research
Build Log
About
```

Other pages can initially be prototype / placeholder pages.

---

# 20. Product Evolution

The website should be designed to support the long-term evolution of ChainForge.

## Phase 1

```text
Raw Blocks
Transactions
Logs
Token Transfers
```

## Phase 2

```text
Protocol Decoding
DEX Trades
Lending
Stablecoins
Payments
```

## Phase 3

```text
Canonical Data Models
Data Quality
SQL / API
```

## Phase 4

```text
Entity Attribution
Activity Classification
Noise Filtering
```

## Phase 5

```text
Realtime Streams
MCP
AI Agents
Onchain Intelligence
```

The UI should visually support this progressive expansion.

---

# 21. Design Principle

Do not make the website feel like a finished giant company that already supports everything.

Instead, make it feel like:

> **A credible early-stage data infrastructure platform that is growing in public.**

The UI can distinguish between:

```text
Live
Beta
Building
Coming Soon
```

This makes unfinished areas feel intentional rather than incomplete.

---

# 22. Final Prompt for Claude Design

Use the following design instruction:

> Design ChainForge as if it were an early-stage but serious blockchain data infrastructure company, not a personal portfolio project.
>
> The product should feel like a mix of Allium, Dune, Helius, ClickHouse, Linear and Vercel.
>
> Focus heavily on data architecture, datasets, schemas, API examples, pipeline visualizations and technical writing.
>
> Avoid crypto hype, neon Web3 aesthetics, NFTs, token marketing and excessive gradients.
>
> The website should communicate that ChainForge starts from raw blockchain data and progressively transforms it through protocol decoding, canonical modeling, entity attribution and activity classification into reliable onchain intelligence.
>
> The first supported network is Arc Mainnet, indexed from genesis.
>
> Include a strong “Build in Public” section documenting the engineering process over time.
>
> Design the product so unfinished capabilities can be shown professionally using states such as Live, Beta, Building and Coming Soon.
>
> The overall feeling should be technical, trustworthy, precise, developer-focused and data-centric.

---

# 23. Optional Homepage Messaging Variants

## Option A

**Blockchain data, forged into intelligence.**

> Reliable onchain datasets built from raw blockchain data, protocol decoding and semantic modeling.

## Option B

**From raw blockchain data to structured intelligence.**

> ChainForge indexes, decodes and models blockchain activity into reusable data products.

## Option C

**Blockchains produce data. ChainForge turns it into meaning.**

> Protocol decoding, canonical datasets, entity attribution and activity classification for developers and researchers.

---

# 24. Initial Product Focus

For the first public release, keep the story focused.

### Chain

```text
Arc Mainnet
```

### Initial datasets

```text
arc.blocks
arc.transactions
arc.logs
token.transfers
```

### Near-term additions

```text
dex.trades
stablecoin.transfers
lending.activities
protocol.contracts
```

### Later intelligence layer

```text
entity.attributions
activity.classifications
```

The website should show this roadmap naturally inside the product experience.

---

# Final Product Statement

> **ChainForge is a blockchain data engineering platform that transforms raw onchain data into canonical datasets, semantic activities and explainable onchain intelligence.**

