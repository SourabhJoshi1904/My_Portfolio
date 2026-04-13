import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #b8c4e8 0%, #a0b0dc 35%, #8fa5d4 55%, #7a8fc8 100%)',
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'flex-start',
    }}>
      {/* Diagonal light streaks */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${-20 + i * 18}%`, left: `${-10 + i * 12}%`,
            width: '70%', height: '1px',
            background: 'rgba(255,255,255,0.12)',
            transform: 'rotate(-30deg)',
          }} />
        ))}
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 48px', paddingTop: 40 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          alignItems: 'center', gap: 40, minHeight: '90vh',
        }}>

          {/* LEFT — Name */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }} style={{ marginBottom: 32 }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(255,255,255,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: '#1a2fa0',
              }}>SJ</div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: 'clamp(52px, 7vw, 88px)',
                color: '#fff', lineHeight: 1.0, letterSpacing: '-0.03em',
                marginBottom: 16, textShadow: '0 2px 20px rgba(0,0,0,0.15)',
              }}
            >
              Sourabh<br />Joshi
            </motion.h1>

            {/* Blue underline */}
            <motion.div
              initial={{ width: 0 }} animate={{ width: 64 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              style={{ height: 4, background: '#2d4bff', borderRadius: 2, marginBottom: 28 }}
            />

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{ display: 'flex', gap: 28, marginLeft: '2%' }}
            >
              {[
                { label: 'GitHub',    char: '⬡', url: "https://github.com/SourabhJoshi1904"},
                { label: 'Instagram', char: '◈', url: "https://www.instagram.com/sourabhjoshi5305?igsh=b2t4Z3ZrbW03bGs4"},
                { label: 'LinkedIn',  char: 'in', url: "https://www.linkedin.com/in/sourabh-joshi-1904s5305"},
              ].map(({ label, char, url }) => (
                <motion.a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.25, color: '#fff' }}
                  title={label}
                  style={{
                    fontSize: 24, color: 'rgba(255,255,255,0.7)',
                    cursor: 'pointer', fontFamily: "'Syne', sans-serif",
                    transition: 'color 0.2s',
                    textDecoration: 'none',
                  }}
                >
                  {char}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* CENTER + RIGHT — Photo & Info */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ position: 'relative', zIndex: 2, left: '-3%' }}
            >
              {/* Floating dots */}
              {[
                { top: '10%', right: '-8%',  size: 10, delay: 0 },
                { top: '30%', left: '-10%',  size: 7,  delay: 0.5 },
                { bottom: '25%', right: '-12%', size: 14, delay: 1 },
                { bottom: '10%', left: '-5%', size: 8,  delay: 1.5 },
              ].map((dot, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: dot.delay }}
                  style={{
                    position: 'absolute', ...dot,
                    width: dot.size, height: dot.size,
                    borderRadius: '50%', background: '#2d4bff', opacity: 0.75,
                  }}
                />
              ))}

              {/* Photo container */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 335, height: 440,
                  borderRadius: '170px 170px 150px 150px',
                  overflow: 'hidden',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(45,75,255,0.18) 100%)',
                  border: '3px solid rgba(255,255,255,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 32px 80px rgba(30,50,120,0.35), inset 0 1px 1px rgba(255,255,255,0.5)',
                }}
              >
                <img
                  src="/photo.png"
                  alt="Sourabh Joshi"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const p = e.target.parentNode;
                    p.innerHTML = `
                      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px">
                        <span style="font-size:80px">👤</span>
                        <p style="color:rgba(255,255,255,0.6);font-size:12px;text-align:center;padding:0 16px;font-family:Outfit,sans-serif">
                          Add photo.jpg<br/>to /public folder
                        </p>
                      </div>`;
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Info card (right of photo) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{
                position: 'absolute', right: '-180px', top: '50%',
                transform: 'translateY(-50%)',
                maxWidth: 210,
              }}
            >
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 8, fontStyle: 'italic', fontFamily: "'Outfit',sans-serif" }}>
                — Introducing
              </p>
              <h2 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 19,
                color: '#fff', lineHeight: 1.3, marginBottom: 14,
                textShadow: '0 2px 12px rgba(0,0,0,0.12)',
              }}>
                Frontend Developer,<br />based in India.
              </h2>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, marginBottom: 20, fontFamily: "'Outfit',sans-serif" }}>
                I build interactive web apps with clean code and great UX. If you have a great project, I'm your guy.
              </p>
              <motion.a
                href="#about"
                whileHover={{ x: 4 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  color: '#2d4bff', fontSize: 13, fontWeight: 700,
                  fontFamily: "'Outfit',sans-serif",
                  textDecoration: 'underline', textUnderlineOffset: 3,
                }}
              >
                My story →
              </motion.a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
