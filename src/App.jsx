import { useState } from "react";
import Background from "./components/layout/Background";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import MobileCTA from "./components/layout/MobileCTA";
import Hero from "./components/sections/Hero";
import TrustBar from "./components/sections/TrustBar";
import ProblemSection from "./components/sections/ProblemSection";
import Positioning from "./components/sections/Positioning";
import Portfolio from "./components/portfolio/Portfolio";
import BeforeAfter from "./components/sections/BeforeAfter";
import Differentials from "./components/sections/Differentials";
import Services from "./components/sections/Services";
import Process from "./components/sections/Process";
import Comparison from "./components/sections/Comparison";
import TechStack from "./components/sections/TechStack";
import Testimonials from "./components/sections/Testimonials";
import Objections from "./components/sections/Objections";
import FAQ from "./components/sections/FAQ";
import FinalCTA from "./components/sections/FinalCTA";
import ContactForm from "./components/sections/ContactForm";

/*
 * Ordem da narrativa (cada seção responde uma pergunta do visitante):
 * proposta → prova → projetos → diferenciais → processo → confiança → objeções → CTA
 */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Background />
      <Navbar open={menuOpen} setOpen={setMenuOpen} />

      <main id="conteudo" inert={menuOpen}>
        <Hero />
        <TrustBar />
        <ProblemSection />
        <Positioning />
        <Portfolio />
        <BeforeAfter />
        <Differentials />
        <Services />
        <Process />
        <Comparison />
        <TechStack />
        <Testimonials />
        <Objections />
        <FAQ />
        <FinalCTA />
        <ContactForm />
      </main>

      <Footer inert={menuOpen} />
      <MobileCTA hidden={menuOpen} />
    </>
  );
}
