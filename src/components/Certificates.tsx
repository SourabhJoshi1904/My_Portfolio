"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Award, Briefcase, Calendar, CheckCircle2, ExternalLink, ShieldCheck, Sparkles, X, FileText, Building2, Eye, ZoomIn, ArrowLeft, Maximize2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export type CertificateItem = {
  id: string;
  type: "internship" | "certification";
  title: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
  skills: string[];
  credentialId: string;
  verifyUrl?: string;
  badge: string;
  accent: string;
  imageUrl: string;
};

const certificateData: CertificateItem[] = [
  {
    id: "fsd-tamizhan-internship",
    type: "internship",
    title: "Full Stack Development (MERN / MEAN)",
    organization: "Tamizhan Skills (RISE Internship)",
    period: "01 June 2026 – 30 June 2026",
    description:
      "Successfully completed the RISE Internship Program in Full Stack Development (MERN / MEAN) at Tamizhan Skills, affiliated with Dev Bhoomi Uttarakhand University.",
    highlights: [
      "Engineered full-stack features using MERN / MEAN stack architecture.",
      "Participated in hands-on learning sessions, code reviews, and real project tasks.",
      "Recognized by Skill India, NSDC, MSME, and Microsoft Certified Educator program.",
    ],
    skills: ["MERN Stack", "MEAN Stack", "React.js", "Node.js", "MongoDB", "Express.js"],
    credentialId: "Intern ID: TS-RISE-FSD-202606190",
    verifyUrl: "https://tamizhanskills.com",
    badge: "RISE INTERNSHIP PROGRAM",
    accent: "#f59e0b",
    imageUrl: "/certificates/fullstack-internship.png",
  },
  {
    id: "webdev-vaultofcodes-internship",
    type: "internship",
    title: "Web Development Internship",
    organization: "VaultofCodes.in",
    period: "June 2026 – July 2026 (1 Month)",
    description:
      "Completed 1-Month intensive Internship in Web Development at VaultofCodes.in, certified by AICTE National Internship Portal & MSME Udyam.",
    highlights: [
      "Developed responsive user interfaces, modular CSS, and JavaScript components.",
      "Verified under AICTE Student ID: STU6a1ldccece2a81779555534.",
      "Partnered with AICTE National Internship Portal & Google for Education Network.",
    ],
    skills: ["Web Development", "HTML5", "CSS3", "JavaScript", "Responsive Design"],
    credentialId: "AICTE: STU6a1ldccece2a81779555534",
    verifyUrl: "https://vaultofcodes.in",
    badge: "AICTE & MSME CERTIFIED",
    accent: "#38bdf8",
    imageUrl: "/certificates/web-development-internship.png",
  },
  {
    id: "training-development-nptel",
    type: "certification",
    title: "Training and Development",
    organization: "IIT Kharagpur (NPTEL / Swayam - MoE)",
    period: "Jan – Apr 2026 (12 Week Course)",
    description:
      "Elite + Silver Medal Certification awarded by IIT Kharagpur & NPTEL for achieving a 79% consolidated score in Training and Development.",
    highlights: [
      "Secured Elite + Silver Badge with 79% score (Proctored Exam: 54/75).",
      "Achieved 100% score in Online Assignments (25/25).",
      "Recommended for 4 Academic Credits by IIT Kharagpur.",
    ],
    skills: ["Training & Development", "HRD", "Instructional Design", "Talent Management"],
    credentialId: "Roll No: NPTEL26HS65S953400590",
    verifyUrl: "https://nptel.ac.in",
    badge: "ELITE + SILVER NPTEL",
    accent: "#eab308",
    imageUrl: "/certificates/training-development-nptel.png",
  },
  {
    id: "leadership-nptel",
    type: "certification",
    title: "Leadership and Team Effectiveness",
    organization: "IIT Roorkee (NPTEL / Swayam - MoE)",
    period: "Jan – Apr 2026 (12 Week Course)",
    description:
      "Elite Certification awarded by IIT Roorkee & NPTEL for successfully completing the course in Leadership and Team Effectiveness.",
    highlights: [
      "Achieved 100% score in Online Assignments (25/25).",
      "Awarded Elite status with 63% consolidated score.",
      "Recommended for 4 Academic Credits by IIT Roorkee.",
    ],
    skills: ["Leadership", "Team Effectiveness", "Strategic Management", "Organizational Behaviour"],
    credentialId: "Roll No: NPTEL26MG61S653401170",
    verifyUrl: "https://nptel.ac.in",
    badge: "ELITE NPTEL CERTIFICATION",
    accent: "#ef4444",
    imageUrl: "/certificates/leadership-nptel.png",
  },
];

export default function Certificates() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "internship" | "certification">("all");
  const [activeModal, setActiveModal] = useState<CertificateItem | null>(null);
  const [viewImageTab, setViewImageTab] = useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const filteredItems = certificateData.filter((item) => {
    if (selectedFilter === "all") return true;
    return item.type === selectedFilter;
  });

  const handleBackToCertificates = () => {
    setIsFullScreen(false);
    setActiveModal(null);
    setTimeout(() => {
      document.getElementById("certificates")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <section id="certificates" className="relative py-28 overflow-hidden bg-[#050508]" aria-label="Certificates and Internships">
      {/* Background Decorative Radial Lighting */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[120px]" />

      <div className="container-content relative z-10">
        {/* Header Title */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 font-mono text-xs font-semibold tracking-widest text-amber-400"
          >
            <ShieldCheck size={14} className="text-amber-400" />
            CREDENTIALS & EXPERIENCE
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-2 mt-4 max-w-3xl"
          >
            Internship Experience & <br />
            <span className="text-gradient">Verified Certifications</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-xl font-body text-base text-muted"
          >
            Official internship completion certificates and IIT NPTEL Elite certifications in Full-Stack, Web Development, Leadership, and HR Development.
          </motion.p>

          {/* Category Filter Switches */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-md"
          >
            {[
              { id: "all", label: "All Credentials" },
              { id: "internship", label: "Internships" },
              { id: "certification", label: "Certifications" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as "all" | "internship" | "certification")}
                className={`rounded-full px-5 py-2 text-xs font-mono transition-all duration-300 ${
                  selectedFilter === tab.id
                    ? "bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Credentials Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 backdrop-blur-xl transition-all duration-500 hover:border-amber-400/50 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
            >
              <div>
                {/* Top Badge & Organization */}
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-mono text-[10px] font-bold text-amber-400">
                    {item.type === "internship" ? <Briefcase size={12} /> : <Award size={12} />}
                    {item.badge}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-xs text-white/50">
                    <Calendar size={12} />
                    {item.period}
                  </span>
                </div>

                {/* Certificate Preview Image Box */}
                <div 
                  onClick={() => {
                    setActiveModal(item);
                    setViewImageTab(true);
                  }}
                  className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-black/60 cursor-pointer group/img"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center transition-all duration-500 group-hover/img:scale-105 group-hover/img:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/img:opacity-30 transition-opacity" />
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/80 border border-white/20 px-3 py-1 font-mono text-[11px] text-amber-400 backdrop-blur-md opacity-90 group-hover/img:opacity-100 transition-opacity">
                    <ZoomIn size={13} />
                    <span>Click to View Full Certificate</span>
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="mt-5 font-display text-xl font-bold text-white transition-colors duration-300 group-hover:text-amber-400">
                  {item.title}
                </h3>

                <div className="mt-1 flex items-center gap-2 font-body text-sm font-semibold text-amber-400/90">
                  <Building2 size={14} />
                  {item.organization}
                </div>

                <p className="mt-3 font-body text-sm leading-relaxed text-muted">
                  {item.description}
                </p>

                {/* Highlights List */}
                <div className="mt-4 space-y-2">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-white/80">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-amber-400" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Skills & Verification Trigger */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[10px] text-white/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setActiveModal(item);
                    setViewImageTab(true);
                  }}
                  className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-amber-400 transition-all duration-300 hover:bg-amber-400 hover:text-black shadow-sm"
                >
                  <Eye size={13} />
                  View Certificate
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      <AnimatePresence>
        {activeModal && !isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto"
            onClick={handleBackToCertificates}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full rounded-2xl border border-amber-400/40 bg-[#090b14] p-5 sm:p-7 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Back to Certificates Button */}
              <button
                onClick={handleBackToCertificates}
                className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 font-mono text-xs font-bold text-amber-400 hover:bg-amber-400 hover:text-black transition-all shadow-md"
              >
                <ArrowLeft size={14} /> Back to Certificates
              </button>

              {/* Modal Close Button */}
              <button
                onClick={handleBackToCertificates}
                className="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-2 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                aria-label="Close Modal"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="mt-8 sm:mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 font-mono text-xs font-bold text-emerald-400">
                    <ShieldCheck size={14} /> VERIFIED OFFICIAL CREDENTIAL
                  </span>
                  <span className="font-mono text-xs text-white/50 hidden sm:inline">{activeModal.credentialId}</span>
                </div>

                <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1">
                  <button
                    onClick={() => setViewImageTab(true)}
                    className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${
                      viewImageTab ? "bg-amber-500 text-black font-bold" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Certificate Document
                  </button>
                  <button
                    onClick={() => setViewImageTab(false)}
                    className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${
                      !viewImageTab ? "bg-amber-500 text-black font-bold" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Credential Details
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="mt-5 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                {viewImageTab ? (
                  /* Real Certificate Image Viewer */
                  <div className="relative w-full rounded-xl border border-amber-400/30 overflow-hidden bg-black/80 flex items-center justify-center min-h-[300px] sm:min-h-[450px]">
                    <Image
                      src={activeModal.imageUrl}
                      alt={activeModal.title}
                      width={1200}
                      height={850}
                      className="w-full h-auto object-contain max-h-[60vh] rounded-lg"
                      priority
                    />
                  </div>
                ) : (
                  /* Credential Details Canvas Card */
                  <div className="rounded-xl border border-amber-400/30 bg-gradient-to-b from-[#121524] to-[#0a0d18] p-6 sm:p-8 text-center shadow-inner relative overflow-hidden">
                    <div className="absolute right-3 top-3 opacity-10 font-display font-black text-6xl text-amber-400 select-none">
                      SOURABH
                    </div>

                    <div className="flex items-center justify-center gap-2 text-amber-400 font-mono text-xs tracking-widest uppercase">
                      <Sparkles size={16} /> Official Certificate of Achievement <Sparkles size={16} />
                    </div>

                    <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-white tracking-wide">
                      {activeModal.title}
                    </h3>

                    <p className="mt-2 font-body text-sm text-white/70 max-w-2xl mx-auto">
                      Awarded to <span className="font-bold text-amber-400">Sourabh Joshi</span> for successful completion of engineering milestone & internship responsibilities at <span className="text-white font-semibold">{activeModal.organization}</span>.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                      {activeModal.skills.map((skill) => (
                        <span key={skill} className="rounded-full bg-amber-400/10 border border-amber-400/20 px-3 py-1 font-mono text-xs text-amber-300">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 space-y-2 text-left max-w-xl mx-auto bg-black/30 p-4 rounded-xl border border-white/5">
                      <h4 className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Key Highlights & Verification:</h4>
                      {activeModal.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-white/80">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-amber-400" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/50">
                      <span>TENURE / ISSUED: {activeModal.period}</span>
                      <span className="text-emerald-400 font-semibold">STATUS: VERIFIED ACTIVE</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleBackToCertificates}
                  className="flex items-center gap-1.5 font-mono text-xs text-amber-400 hover:underline"
                >
                  <ArrowLeft size={13} /> Back to Certificate Section
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsFullScreen(true)}
                    className="flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/20 px-4 py-2 font-mono text-xs font-bold text-amber-300 hover:bg-amber-400 hover:text-black transition-all shadow-md"
                  >
                    <Maximize2 size={14} /> Full Screen View
                  </button>
                  {activeModal.verifyUrl && (
                    <a
                      href={activeModal.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 btn-primary text-xs py-2 px-4"
                    >
                      Organization Website <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Lightbox Mode */}
      <AnimatePresence>
        {isFullScreen && activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col justify-between"
          >
            {/* Top Fixed Control Bar */}
            <div className="w-full flex items-center justify-between p-4 sm:p-6 bg-black/80 border-b border-white/10 backdrop-blur-md z-10">
              <button
                onClick={handleBackToCertificates}
                className="flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-400/15 px-4 py-2 font-mono text-xs font-bold text-amber-300 hover:bg-amber-400 hover:text-black transition-all shadow-lg"
              >
                <ArrowLeft size={16} /> Back to Certificate Section
              </button>

              <div className="hidden sm:flex flex-col items-center text-center">
                <span className="font-display text-base font-bold text-white">{activeModal.title}</span>
                <span className="font-mono text-xs text-amber-400">{activeModal.organization}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsFullScreen(false)}
                  className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-mono text-xs text-white/80 hover:bg-white/20"
                >
                  Exit Full Screen
                </button>
                <button
                  onClick={handleBackToCertificates}
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
                  aria-label="Close Fullscreen"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main Fullscreen Image Container */}
            <div className="flex-1 relative flex items-center justify-center p-2 sm:p-8 overflow-auto">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={activeModal.imageUrl}
                  alt={activeModal.title}
                  width={1600}
                  height={1100}
                  className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl border border-white/10"
                  priority
                />
              </div>
            </div>

            {/* Bottom Info Bar with Sticky Back Button */}
            <div className="w-full p-4 bg-black/80 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white/60">
              <span>CREDENTIAL ID: {activeModal.credentialId}</span>

              <button
                onClick={handleBackToCertificates}
                className="flex items-center gap-2 rounded-full border border-amber-400 bg-amber-400 px-5 py-2 font-mono text-xs font-bold text-black hover:bg-amber-300 transition-all shadow-xl"
              >
                <ArrowLeft size={15} /> Back to Certificate Section
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
