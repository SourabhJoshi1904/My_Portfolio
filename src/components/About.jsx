import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" style={{ padding: '120px 48px', background: '#0d0f1a', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontSize: 11, letterSpacing: '0.22em', color: '#2d4bff', textTransform: 'uppercase', marginBottom: 14, fontFamily: "'Outfit',sans-serif", fontWeight: 600 }}
        >
          01 — About
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', lineHeight: 1.1, marginBottom: 8 }}>
            Building interfaces
          </h2>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(32px, 5vw, 56px)', color: '#2d4bff', lineHeight: 1.1, marginBottom: 48 }}>
            people love to use.
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.62)', lineHeight: 1.9, marginBottom: 20, fontFamily: "'Outfit',sans-serif" }}>
              I'm a passionate BCA student with a strong interest in web development and software programming. I enjoy building interactive and user-friendly web applications using React, JavaScript, HTML, and CSS.
            </p>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.62)', lineHeight: 1.9, fontFamily: "'Outfit',sans-serif" }}>
              I've worked on projects from AI chatbots to MovieSearch App. Always eager to learn and build things that create real value for users.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            {[
              ['Location', 'Uttarakhand, India'],
              ['Email', 'joshisourabh925@gmail.com'],
              ['Phone', '+91 7505567931'],
              ['Degree', 'BCA — In Progress'],
            ].map(([l, v]) => (
              <div key={l} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 16, marginBottom: 16 }}>
                <p style={{ fontSize: 10, color: '#2d4bff', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 5, fontFamily: "'Outfit',sans-serif", fontWeight: 600 }}>{l}</p>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', fontFamily: "'Outfit',sans-serif" }}>{v}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', gap: 48, marginTop: 60, paddingTop: 48, borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          {[['3+', 'Projects Built'], ['2+', 'Years Learning'], ['8+', 'Technologies']].map(([val, lbl]) => (
            <div key={lbl}>
              <p style={{ fontSize: 38, fontWeight: 800, color: '#2d4bff', fontFamily: "'Syne', sans-serif" }}>{val}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: "'Outfit',sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>{lbl}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
