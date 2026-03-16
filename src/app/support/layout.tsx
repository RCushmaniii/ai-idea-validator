import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with the AI Idea Validator. Find documentation, FAQs, and contact options for technical support.",
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
