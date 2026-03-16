import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with CushLabs about the AI Idea Validator. Questions, feedback, and partnership inquiries welcome.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
