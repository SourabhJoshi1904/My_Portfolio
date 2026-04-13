import { useScroll, useTransform, motion } from 'framer-motion';
import Nav     from './components/Nav.jsx';
import Hero    from './components/Hero.jsx';
import About   from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Skills  from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Footer  from './components/Footer.jsx';

export default function App() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div style={{ background: '#0d0f1a', minHeight: '100vh' }}>
      {/* Scroll progress bar */}
      <motion.div style={{
        position: 'fixed', top: 0, left: 0, height: 3, zIndex: 200,
        width: progressWidth,
        background: 'linear-gradient(90deg, #2d4bff, #7c5cfc, #ffd700)',
      }} />

      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
