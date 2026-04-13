import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { SKILLS_GRID, SKILL_BARS } from '../data.js';

function SkillIconCard({ skill, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.06 }}
      style={{
        background: hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? 'rgba(255,215,0,0.45)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 12, padding: '22px 12px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 12, cursor: 'default', minHeight: 115,
        boxShadow: hovered ? '0 8px 32px rgba(255,215,0,0.14)' : 'none',
        transition: 'all 0.25s ease',
      }}
    >
      <motion.img
        src={skill.icon}
        alt={skill.name}
        animate={hovered ? { rotate: [0, -8, 8, 0], scale: 1.2 } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          width: 46,
          height: 46,
          objectFit: 'contain',
          filter: skill.name === 'Tailwind' ? 'brightness(1.5)' : 'none',
        }}
        onError={(e) => { e.target.style.opacity = '1'; }}
      />
      <span style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
        color: hovered ? '#ffd700' : 'rgba(255,255,255,0.65)',
        textTransform: 'uppercase', fontFamily: "'Outfit',sans-serif",
        transition: 'color 0.25s', textAlign: 'center',
      }}>
        {skill.name}
      </span>
    </motion.div>
  );
}

function SkillBar({ skill, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)', fontFamily: "'Outfit',sans-serif", fontWeight: 500 }}>
          {skill.name}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.6 }}
          style={{ fontSize: 12, color: skill.color, fontFamily: "'Outfit',sans-serif", fontWeight: 700 }}
        >
          {skill.pct}%
        </motion.span>
      </div>
      <div style={{ height: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.pct}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            height: '100%', borderRadius: 3,
            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '100px 0', background: '#0d0f1a', position: 'relative', overflow: 'hidden' }}>

      {/* Soft glow accents */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 140, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: -40, left: '12%', width: 240, height: 240,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,91,252,0.25) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', top: -30, right: '10%', width: 180, height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45,75,255,0.22) 0%, transparent 70%)',
        }} />
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 140, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', bottom: -30, left: '10%', width: 200, height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(44,196,255,0.18) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: -20, right: '15%', width: 240, height: 240,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,91,252,0.18) 0%, transparent 70%)',
        }} />
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 2 }}>
        <div style={{
          background: '#111218',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20, padding: '60px 52px',
          boxShadow: '0 40px 100px rgba(0,0,0,0.55)',
        }}>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontSize: 11, letterSpacing: '0.22em', color: '#ffd700', textTransform: 'uppercase', marginBottom: 12, fontFamily: "'Outfit',sans-serif", fontWeight: 600, textAlign: 'center' }}
          >
            03 — Expertise
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', color: '#ffd700', textAlign: 'center', marginBottom: 14 }}
          >
            What I do
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontSize: 14, color: 'rgba(255,255,255,0.48)', textAlign: 'center', lineHeight: 1.75, maxWidth: 580, margin: '0 auto 52px', fontFamily: "'Outfit',sans-serif" }}
          >
            Passionate Frontend Developer pursuing BCA. I build responsive, user-friendly web apps and love learning modern technologies every day.
          </motion.p>

          {/* Icon grid with Skills label */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 52, alignItems: 'stretch' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              paddingRight: 12, borderRight: '3px solid #ffd700',
              marginRight: 4, flexShrink: 0,
            }}>
              <span style={{
                fontSize: 13, fontWeight: 800, color: '#ffd700',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                fontFamily: "'Syne',sans-serif",
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}>
                Skills
              </span>
            </div>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
              {SKILLS_GRID.map((s, i) => (
                <SkillIconCard key={s.name} skill={s} index={i} />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 44 }} />

          {/* Progress bars */}
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontSize: 10, letterSpacing: '0.2em', color: '#ffd700', textTransform: 'uppercase', marginBottom: 28, fontFamily: "'Outfit',sans-serif", fontWeight: 700 }}
          >
            Proficiency
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 60px' }}>
            {SKILL_BARS.map((s, i) => (
              <SkillBar key={s.name} skill={s} delay={i * 0.09} />
            ))}
          </div>

        </div>
      </div>
      {/* Gradient fade to Contact */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 160,
        background: 'linear-gradient(180deg, rgba(13,15,26,0) 0%, rgba(8,11,24,0.3) 35%, rgba(8,11,24,0.7) 75%, #080b18 100%)',
        pointerEvents: 'none',
      }} />
    </section>
  );
}
