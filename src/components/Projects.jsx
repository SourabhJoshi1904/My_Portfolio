import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { PROJECTS, TECH_ICON_MAP } from '../data.js';

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const demoAvailable = Boolean(project.liveUrl);
  const githubAvailable = Boolean(project.githubUrl);
  const buttonBaseStyle = {
    flex: 1,
    height: 36,
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 700,
    fontFamily: "'Outfit',sans-serif",
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.55 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? project.accent + '66' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
        boxShadow: hovered ? `0 16px 48px ${project.accent}22` : 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 165, overflow: 'hidden', background: project.accent + '22' }}>
        <motion.img
          src={project.img}
          alt={project.title}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 40%, rgba(13,15,26,0.85) 100%)',
        }} />
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: project.accent, borderRadius: 8,
          padding: '4px 12px', fontSize: 18,
        }}>
          {project.emoji}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '22px 22px 26px' }}>
        <h3 style={{
          fontSize: 19, fontWeight: 700, color: '#fff',
          fontFamily: "'Syne', sans-serif", marginBottom: 10,
        }}>
          {project.title}
        </h3>
        <p style={{
          fontSize: 13, color: 'rgba(255,255,255,0.52)', lineHeight: 1.68,
          marginBottom: 18, fontFamily: "'Outfit',sans-serif",
        }}>
          {project.desc}
        </p>

        <p style={{
          fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em',
          textTransform: 'uppercase', marginBottom: 10, fontFamily: "'Outfit',sans-serif",
        }}>
          Technologies
        </p>

        {/* Tech icons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          {project.tags.map((tag) =>
            TECH_ICON_MAP[tag] ? (
              <img key={tag} src={TECH_ICON_MAP[tag]} alt={tag} title={tag} style={{ width: 20, height: 20 }}
                onError={(e) => { e.target.style.display = 'none'; }} />
            ) : (
              <span key={tag} style={{
                fontSize: 10, color: 'rgba(255,255,255,0.45)',
                border: '1px solid rgba(255,255,255,0.15)', borderRadius: 4,
                padding: '2px 8px', fontFamily: "'Outfit',sans-serif",
              }}>{tag}</span>
            )
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <motion.a
            href={demoAvailable ? project.liveUrl : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!demoAvailable}
            whileHover={demoAvailable ? { scale: 1.05 } : undefined}
            style={{
              ...buttonBaseStyle,
              pointerEvents: demoAvailable ? 'auto' : 'none',
              opacity: demoAvailable ? 1 : 0.45,
              background: demoAvailable ? project.accent + '22' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${demoAvailable ? project.accent + '55' : 'rgba(255,255,255,0.1)'}`,
              color: demoAvailable ? project.accent : 'rgba(255,255,255,0.45)',
            }}
          >
            Live Demo
          </motion.a>
          <motion.a
            href={githubAvailable ? project.githubUrl : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!githubAvailable}
            whileHover={githubAvailable ? { scale: 1.05 } : undefined}
            style={{
              ...buttonBaseStyle,
              pointerEvents: githubAvailable ? 'auto' : 'none',
              opacity: githubAvailable ? 1 : 0.45,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            GitHub
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '100px 48px', background: '#080b18', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontSize: 11, letterSpacing: '0.22em', color: '#2d4bff', textTransform: 'uppercase', marginBottom: 14, fontFamily: "'Outfit',sans-serif", fontWeight: 600 }}
        >
          02 — Work
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52 }}
        >
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', lineHeight: 1.15 }}>
            Welcome To<br /><span style={{ color: '#7c5cfc' }}>My Projects</span>
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', maxWidth: 190, textAlign: 'right', lineHeight: 1.65, fontFamily: "'Outfit',sans-serif", paddingBottom: 8 }}>
            Solving real problems with a modern tech stack.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
      {/* Gradient fade to Skills */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 160,
        background: 'linear-gradient(180deg, rgba(8,11,24,0) 0%, rgba(13,15,26,0.3) 35%, rgba(13,15,26,0.7) 75%, #0d0f1a 100%)',
        pointerEvents: 'none',
      }} />
    </section>
  );
}
