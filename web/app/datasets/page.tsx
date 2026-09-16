import type { Metadata } from "next";
import { DatasetCatalog } from "./catalog";

export const metadata: Metadata = {
  title: "Datasets",
  description: "Canonical, documented tables built from Arc Mainnet.",
  alternates: { canonical: "/datasets/" },
};

export default function DatasetsPage() {
  return <DatasetCatalog />;
}
