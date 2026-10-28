import type { Metadata } from "next";
import { ManufacturingPage } from "@/components/industry/ManufacturingPage";

export const metadata: Metadata = {
  title: "Manufacturing",
  description:
    "Gravice turns supplier invoices, GRNs and purchase orders into Tally / Zoho / ERP entries without retyping, and keeps key accounts and dealer deals in one place.",
};

export default function ManufacturingRoute() {
  return <ManufacturingPage />;
}
