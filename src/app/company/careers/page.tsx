import type { Metadata } from "next";
import { CareersPage } from "@/components/company/CareersPage";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join a small team building control, visibility and automation for financial institutions and growing businesses. The work is high-stakes, and it ships.",
};

export default function CareersRoute() {
  return <CareersPage />;
}
