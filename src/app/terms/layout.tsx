import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for the AI Idea Validator assessment tool.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
