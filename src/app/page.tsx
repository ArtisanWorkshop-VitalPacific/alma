import { About } from "@/components/About";
import { Channels } from "@/components/Channels";
import { Facts } from "@/components/Facts";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Nav } from "@/components/Nav";
import { Partner } from "@/components/Partner";
import { Pricing } from "@/components/Pricing";
import { Standard } from "@/components/Standard";
import { Start } from "@/components/Start";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Facts />
        <HowItWorks />
        <Channels />
        <Standard />
        <Partner />
        <Pricing />
        <About />
        <Faq />
        <Start />
      </main>
      <Footer />
    </>
  );
}
