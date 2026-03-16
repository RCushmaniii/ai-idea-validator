import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about the AI Idea Validator, defensibility verdicts, contradiction detection, and how the assessment works.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
