import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '100px 48px 120px', background: '#080b18', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontSize: 11, letterSpacing: '0.22em', color: '#2d4bff', textTransform: 'uppercase', marginBottom: 14, fontFamily: "'Outfit',sans-serif", fontWeight: 600 }}
        >
          04 — Contact
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', lineHeight: 1.1, marginBottom: 8 }}>
              Let's build
            </h2>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(32px, 4vw, 52px)', color: '#2d4bff', lineHeight: 1.1, marginBottom: 32 }}>
              something great.
            </h2>

            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.52)', lineHeight: 1.85, marginBottom: 44, fontFamily: "'Outfit',sans-serif", maxWidth: 380 }}>
              I'm open to frontend developer roles, internships, and freelance collaborations. If you have a project or an opportunity, I'd love to hear from you.
            </p>

            {[
              { icon: '✉', label: 'Email', val: 'sourabhjoshi.dev@gmail.com', href: 'mailto:sourabhjoshi.dev@gmail.com' },
              { icon: '☎', label: 'Phone', val: '+91 7505567931',             href: 'tel:+917505567931' },
            ].map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ x: 5 }}
                style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22, textDecoration: 'none' }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  border: '1px solid rgba(45,75,255,0.4)',
                  background: 'rgba(45,75,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: 10, color: '#2d4bff', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4, fontFamily: "'Outfit',sans-serif", fontWeight: 600 }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', fontFamily: "'Outfit',sans-serif" }}>
                    {item.val}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Right — Dark card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20, padding: '44px 40px',
            }}
          >
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.32)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 22, fontFamily: "'Outfit',sans-serif" }}>
              Available for work
            </p>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 26, color: '#fff', lineHeight: 1.3, marginBottom: 18 }}>
              Ready to start your next project?
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.48)', lineHeight: 1.85, marginBottom: 38, fontFamily: "'Outfit',sans-serif" }}>
              Whether it's a new product, a redesign, or scaling an existing one — I bring clean code, attention to detail, and genuine enthusiasm.
            </p>
            <motion.a
              href="mailto:joshisourabh925@gmail.com"
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(45,75,255,0.4)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'linear-gradient(135deg, #2d4bff, #7c5cfc)',
                color: '#fff', padding: '14px 32px', borderRadius: 32,
                fontSize: 14, fontWeight: 700, fontFamily: "'Outfit',sans-serif",
              }}
            >
              Send a message →
            </motion.a>
          </motion.div>

        </div>
      </div>
      {/* Gradient fade to Footer */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
        background: 'linear-gradient(180deg, rgba(8,11,24,0) 0%, rgba(8,11,24,0.4) 50%, #080b18 100%)',
        pointerEvents: 'none',
      }} />
    </section>
  );
}
