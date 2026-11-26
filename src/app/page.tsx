import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Fees } from "@/components/Fees";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Library } from "@/components/Library";
import { Nav } from "@/components/Nav";
import { Partnership } from "@/components/Partnership";
import { Purpose } from "@/components/Purpose";
import { Standards } from "@/components/Standards";
import { Subjects } from "@/components/Subjects";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Subjects />
        <Purpose />
        <Library />
        <Approach />
        <Standards />
        <Partnership />
        <Fees />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
