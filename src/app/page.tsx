// src/app/page.tsx
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Activities } from "@/components/Activities";
import { WorkApproach } from "@/components/WorkApproach";
import { Geography } from "@/components/Geography";
import { TechnicalBase } from "@/components/TechnicalBase";
import { Documentation } from "@/components/Documentation";
import { News } from "@/components/News";
import { Contacts } from "@/components/Contacts";
import { GeologySection } from "@/components/GeologySection";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Activities />
      <GeologySection />
      <WorkApproach />
      <Geography />
      {/* <Projects /> */}
      <Documentation />
      <TechnicalBase />
      <News />
      <Contacts />
    </main>
  );
}
