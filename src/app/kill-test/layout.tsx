import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Defensibility AI Idea Validator',
  description:
    'Run the Defensibility AI Idea Validator on your startup idea. A founder-grade, no-mercy evaluation that separates viable businesses from interesting software.',
  openGraph: {
    title: 'Defensibility AI Idea Validator',
    description:
      'Run the AI Idea Validator on your startup idea. Find out if it can survive.',
  },
};

export default function KillTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
