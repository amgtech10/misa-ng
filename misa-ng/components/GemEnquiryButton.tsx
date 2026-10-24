"use client";

import { openLead } from "@/lib/lead";

type GemEnquiryButtonProps = {
  enquiryTitle: string;
};

export default function GemEnquiryButton({
  enquiryTitle,
}: GemEnquiryButtonProps) {
  return (
    <button
      type="button"
      onClick={() => openLead(enquiryTitle)}
      className="btn btn-brand mt-8 w-fit"
    >
      Enquire about this gem
    </button>
  );
}