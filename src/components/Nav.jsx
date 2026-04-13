import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '18px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(13,15,26,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.35s ease',
      }}
    >
      {/* Logo */}
      <motion.a href="#home" whileHover={{ scale: 1.08 }}
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: 'linear-gradient(135deg, #2d4bff, #7c5cfc)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: '#fff',
        }}>SJ</div>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em' }}>
          Sourabh Joshi
        </span>
      </motion.a>

      {/* Links */}
      <div style={{ display: 'flex', gap: 36 }}>
        {['About', 'Projects', 'Skills', 'Contact'].map((l) => (
          <motion.a
            key={l}
            href={`#${l.toLowerCase()}`}
            whileHover={{ color: '#2d4bff' }}
            style={{
              fontSize: 14, color: 'rgba(255,255,255,0.7)',
              fontFamily: "'Outfit', sans-serif", fontWeight: 500,
              transition: 'color 0.2s',
            }}
          >
            {l}
          </motion.a>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        onClick={() => window.location.href = 'mailto:sourabhjoshi.dev@gmail.com'}
        whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(45,75,255,0.5)' }}
        whileTap={{ scale: 0.97 }}
        style={{
          background: 'linear-gradient(135deg, #2d4bff, #7c5cfc)',
          color: '#fff', padding: '9px 22px', borderRadius: 24,
          fontSize: 13, fontWeight: 600, fontFamily: "'Outfit', sans-serif",
          border: 'none', cursor: 'pointer',
        }}
      >
        Hire me
      </motion.button>
    </motion.nav>
  );
}
