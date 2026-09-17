"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CHAIN_SEED, fmt, type ChainSlug } from "@/lib/status";

type ChainState = { latest: number; indexed: number };
type IndexerState = Record<ChainSlug, ChainState>;

const INITIAL: IndexerState = {
  ethereum: { ...CHAIN_SEED.ethereum },
  arc: { ...CHAIN_SEED.arc },
};

const IndexerContext = createContext<IndexerState>(INITIAL);

export function IndexerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<IndexerState>(INITIAL);

  useEffect(() => {
    const t = setInterval(() => {
      setState((prev) => {
        const next = {} as IndexerState;
        (Object.keys(prev) as ChainSlug[]).forEach((chain) => {
          next[chain] = {
            latest: prev[chain].latest + 1,
            indexed: Math.random() < 0.85 ? prev[chain].indexed + 1 : prev[chain].indexed,
          };
        });
        return next;
      });
    }, 2400);
    return () => clearInterval(t);
  }, []);

  return <IndexerContext.Provider value={state}>{children}</IndexerContext.Provider>;
}

export function useAllChains() {
  return useContext(IndexerContext);
}

export function useIndexer(chain: ChainSlug = "arc") {
  const { latest, indexed } = useContext(IndexerContext)[chain];
  return { latest, indexed, lag: latest - indexed };
}

export function LiveNumber({
  which,
  chain = "arc",
}: {
  which: "latest" | "indexed" | "lag";
  chain?: ChainSlug;
}) {
  const { latest, indexed, lag } = useIndexer(chain);
  if (which === "lag") return <>{lag} blocks</>;
  return <>{fmt(which === "indexed" ? indexed : latest)}</>;
}
