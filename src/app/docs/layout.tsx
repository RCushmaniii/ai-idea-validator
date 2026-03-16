import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Technical documentation for the AI Idea Validator including the 23-question assessment framework, verdict system, and JSON import/export schema.",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
