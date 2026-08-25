import About from "@/components/About";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import CosmicSpaceCanvas from "@/components/CosmicSpaceCanvas";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";
import SectionRail from "@/components/SectionRail";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <ScrollProgress />
      <SectionRail />
      <CustomCursor />
      <CosmicSpaceCanvas />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Services />
        <Certificates />
        <Stats />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      {/* developer-mode easter egg (point 66) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `console.log("%c👋 Hey developer — you found the source of the universe.\\n\\nThis portfolio is built with Next.js, Three.js and too much curiosity.\\n\\nWant to build something together? hello@sourabhjoshi.dev","color:#7C5CFF;font-size:14px;font-weight:bold");`,
        }}
      />
    </>
  );
}
