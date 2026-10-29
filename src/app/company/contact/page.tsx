import type { Metadata } from "next";
import { ContactPage } from "@/components/company/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Gravice about ElevateRM, V-Track or NICO. Book a 30-minute demo, email the team, or visit our Bengaluru office.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
