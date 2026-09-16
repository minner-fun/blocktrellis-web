"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { INITIAL_INDEXED, INITIAL_LATEST, fmt } from "@/lib/status";

type IndexerState = {
  latest: number;
  indexed: number;
  lag: number;
};

const IndexerContext = createContext<IndexerState>({
  latest: INITIAL_LATEST,
  indexed: INITIAL_INDEXED,
  lag: INITIAL_LATEST - INITIAL_INDEXED,
});

export function IndexerProvider({ children }: { children: React.ReactNode }) {
  const [latest, setLatest] = useState(INITIAL_LATEST);
  const [indexed, setIndexed] = useState(INITIAL_INDEXED);

  useEffect(() => {
    const t = setInterval(() => {
      setLatest((n) => n + 1);
      setIndexed((n) => (Math.random() < 0.85 ? n + 1 : n));
    }, 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <IndexerContext.Provider value={{ latest, indexed, lag: latest - indexed }}>
      {children}
    </IndexerContext.Provider>
  );
}

export function useIndexer() {
  return useContext(IndexerContext);
}

export function LiveNumber({
  which,
}: {
  which: "latest" | "indexed" | "lag";
}) {
  const { latest, indexed, lag } = useIndexer();
  if (which === "lag") return <>{lag} blocks</>;
  return <>{fmt(which === "indexed" ? indexed : latest)}</>;
}
