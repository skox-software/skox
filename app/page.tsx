import { Hero } from "@/components/Hero";
import { LeakCalculator } from "@/components/LeakCalculator";
import { ScopeForm } from "@/components/ScopeForm";
import { Footer } from "@/components/Footer";
import { FrontDeskSection } from "@/components/FrontDeskSection";
import { Proof } from "@/components/Proof";
import { Team } from "@/components/Team";
import { Faq, Offer, ProblemStack, RiskReversal, Shipped, WhatWeBuild, WhatWeDont, WhyUs } from "@/components/Body";

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <ProblemStack />
        <LeakCalculator />
        <WhatWeBuild />
        <FrontDeskSection />
        <Offer />
        <Shipped />
        <RiskReversal />
        <Proof />
        <WhyUs />
        <Team />
        <WhatWeDont />
        <Faq />
        <ScopeForm />
      </main>
      <Footer />
    </>
  );
}
