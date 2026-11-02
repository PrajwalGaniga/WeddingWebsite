import { WeddingPageContent } from "@/components/WeddingPageContent";
import { GROOM_WEDDING_CONFIG } from "@/config/wedding-groom";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding of Gaywin & Neslin | December 21, 2026",
  description:
    "We, Mr. Clement Lasrado & Mrs. Felcy Rodrigues, cordially invite you to witness and bless the nuptials of our son Gaywin Cristan with Neslin Priya.",
};

export default function GroomWeddingInvitationPage() {
  return <WeddingPageContent config={GROOM_WEDDING_CONFIG} />;
}
