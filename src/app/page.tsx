import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { About } from "@/components/sections/About";
import { Cases } from "@/components/sections/Cases";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { Compare } from "@/components/sections/Compare";
import { ProcessCarousel } from "@/components/sections/ProcessCarousel";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <MarqueeBand />
      <About />
      <Cases />
      <Services />
      <Gallery />
      <Compare />
      <ProcessCarousel />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
