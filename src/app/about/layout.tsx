import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn why AI Idea Validator exists and how it evaluates startup ideas for defensibility. A brutal filter for founders who refuse to waste years on replaceable businesses.',
  openGraph: {
    title: 'About AI Idea Validator',
    description:
      'Learn why AI Idea Validator exists and how it evaluates startup ideas for defensibility.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
