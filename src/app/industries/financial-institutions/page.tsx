import type { Metadata } from "next";
import { FinancialServicesPage } from "@/components/industry/FinancialServicesPage";

export const metadata: Metadata = {
  title: "Financial institutions",
  description:
    "Gravice helps banks and NBFCs run relationship management, collateral tracking and loan documents on one platform, with the audit trail regulators expect.",
};

export default function FinancialInstitutionsRoute() {
  return <FinancialServicesPage />;
}
