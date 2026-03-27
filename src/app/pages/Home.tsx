import { Hero } from "../components/Hero";
import { Marquee } from "../components/Marquee";
import { Work } from "../components/Work";
import { About } from "../components/About";
import { Skills } from "../components/Skills";
import { Certificates } from "../components/Certificates";
import { Contact } from "../components/Contact";

export function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Work />
      <About />
      <Skills />
      <Certificates />
      <Contact />
    </>
  );
}
