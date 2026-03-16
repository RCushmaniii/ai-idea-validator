import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for AI Idea Validator. No accounts, no tracking, no data storage. Your startup idea stays yours.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
