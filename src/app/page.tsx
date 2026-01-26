import { Hero, Problem, WhatItDoes, WhoItsFor, HowItWorks, TrustBadges, CTA } from '@/components/home';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <Problem />
      <WhatItDoes />
      <WhoItsFor />
      <HowItWorks />
      <CTA />
    </>
  );
}
