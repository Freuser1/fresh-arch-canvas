import { useState } from 'react';

export type PortfolioModalType =
  | 'projects'
  | 'about'
  | 'skills'
  | 'process'
  | 'experiments'
  | 'contact'
  | null;

interface PortfolioModalsProps {
  activeModal: PortfolioModalType;
  onClose: () => void;
}

export function PortfolioModals({ activeModal, onClose }: PortfolioModalsProps) {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [filter, setFilter] = useState<'all' | 'interactive' | 'systems' | 'visual'>('all');

  if (!activeModal) return null;

  const projects = [
    {
      id: 'kinetic-canvas',
      title: 'Kinetic Motion Studio',
      category: 'interactive',
      role: 'Creative Technologist & UI Lead',
      year: '2026',
      description:
        'A browser-based interactive canvas blending GLSL fragment shaders with mouse-scrubbed typography and inertia physics.',
      stack: ['WebGL', 'Three.js', 'React', 'Tailwind CSS'],
      metric: '60fps across mobile & desktop',
    },
    {
      id: 'aurora-design-system',
      title: 'Aurora Spatial Design System',
      category: 'systems',
      role: 'Design Engineer',
      year: '2025',
      description:
        'An accessible, multi-platform component ecosystem engineered for fluid dark-mode transitions, micro-haptics, and responsive math.',
      stack: ['TypeScript', 'Design Systems', 'Figma Tokens', 'React'],
      metric: 'Adopted across 14 commercial applications',
    },
    {
      id: 'verve-audio',
      title: 'Verve Generative Soundscape',
      category: 'interactive',
      role: 'Full Stack Creative Developer',
      year: '2025',
      description:
        'Real-time Web Audio API synthesizer that visualizes ambient sound frequencies into morphing 3D geometric ribbon meshes.',
      stack: ['Web Audio API', 'Canvas API', 'GLSL', 'Vite'],
      metric: 'Over 120,000 community interactions',
    },
    {
      id: 'monolith-flagship',
      title: 'Monolith Architectural Flagship',
      category: 'visual',
      role: 'Creative Director & Frontend Developer',
      year: '2024',
      description:
        'Immersive digital flagship for a contemporary architecture studio featuring dynamic viewport projections and unhurried editorial layouts.',
      stack: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      metric: 'Site of the Day & FWA Nominee',
    },
  ];

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#0c0c0c] border border-white/20 rounded-2xl p-6 sm:p-8 text-white shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-colors text-sm cursor-pointer"
          aria-label="Close dialog"
        >
          ✕
        </button>

        {/* 1. PROJECTS MODAL */}
        {activeModal === 'projects' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest text-white/60">
              <span>Selected Works</span>
              <span>·</span>
              <span>2024 — 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-2">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-white/70 mb-6 leading-relaxed">
              A curated selection of interactive web flagships, design systems, and creative technology experiments.
            </p>

            {/* Filter pills */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 text-xs">
              {(
                [
                  { id: 'all', label: 'All Works' },
                  { id: 'interactive', label: 'Interactive & Motion' },
                  { id: 'systems', label: 'Design Systems' },
                  { id: 'visual', label: 'Editorial & Brand' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                    filter === tab.id
                      ? 'bg-white text-black font-medium'
                      : 'border border-white/20 text-white/70 hover:border-white/50 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Project list */}
            <div className="space-y-4">
              {filteredProjects.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/30 transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                    <h3 className="text-lg font-medium text-white group-hover:text-white/90">
                      {item.title}
                    </h3>
                    <div className="text-xs text-white/50">
                      {item.role} · {item.year}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 mb-3 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs">
                    <div className="flex flex-wrap gap-2 text-white/60">
                      {item.stack.map((tech) => (
                        <span key={tech} className="bg-white/5 px-2 py-0.5 rounded border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="text-white/50 italic text-[11px]">
                      {item.metric}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. ABOUT ME MODAL */}
        {activeModal === 'about' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest text-white/60">
              <span>Bio & Background</span>
              <span>·</span>
              <span>Design & Code</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-4">
              About Me
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-white/80 leading-relaxed">
              <p>
                Hello! I am a creative technologist and senior design engineer specializing in crafting tactile, high-performance web experiences. My work lives at the convergence of graphic discipline, fluid animation choreography, and modern software engineering.
              </p>
              <p>
                With over seven years of practice across agency flagships and technology ventures, I champion the idea that digital interfaces shouldn&apos;t feel like static paperwork—they should breathe, react, and respond intuitively to human presence.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-white/50 uppercase tracking-wider mb-1">Focus</div>
                  <div className="font-medium text-white">Interactive Engineering & UI Systems</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-white/50 uppercase tracking-wider mb-1">Availability</div>
                  <div className="font-medium text-white">Open for select commissions & roles</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-white/50 uppercase tracking-wider mb-1">Location</div>
                  <div className="font-medium text-white">Remote / Worldwide</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. SKILLS & STACK MODAL */}
        {activeModal === 'skills' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest text-white/60">
              <span>Capabilities</span>
              <span>·</span>
              <span>Tooling & Craft</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-4">
              My Skills & Stack
            </h2>
            <p className="text-sm text-white/70 mb-6">
              A comprehensive view of the languages, frameworks, graphics pipelines, and workflows I leverage daily.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-2">
                <div className="text-white font-medium text-sm flex items-center justify-between">
                  <span>Frontend & Architecture</span>
                  <span className="text-white/40">Tier 1</span>
                </div>
                <p className="text-white/60 text-[11px]">
                  React 19, TypeScript, Next.js, Vite, Tailwind CSS, State Machines, Web Components.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-2">
                <div className="text-white font-medium text-sm flex items-center justify-between">
                  <span>Motion & Creative Coding</span>
                  <span className="text-white/40">Tier 1</span>
                </div>
                <p className="text-white/60 text-[11px]">
                  Three.js, WebGL, GLSL Shaders, Framer Motion, HTML5 Canvas, Web Audio API.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-2">
                <div className="text-white font-medium text-sm flex items-center justify-between">
                  <span>Product Design & Systems</span>
                  <span className="text-white/40">Tier 1</span>
                </div>
                <p className="text-white/60 text-[11px]">
                  Figma, Design Tokens, Micro-Interactions, Responsive Type Math, WCAG Accessibility.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-2">
                <div className="text-white font-medium text-sm flex items-center justify-between">
                  <span>Performance & Delivery</span>
                  <span className="text-white/40">Tier 1</span>
                </div>
                <p className="text-white/60 text-[11px]">
                  Lighthouse 95+, 60fps compositor optimization, Bundle tuning, Node.js, Git CI/CD.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. CREATIVE PROCESS MODAL */}
        {activeModal === 'process' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest text-white/60">
              <span>Methodology</span>
              <span>·</span>
              <span>How I Work</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-4">
              My Creative Process
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed">
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-white font-medium text-sm mb-1">
                  01. Intent & Architectural Discovery
                </div>
                <p className="text-white/60 text-xs">
                  Understanding the core thesis, audience psychology, and performance requirements before writing a single line of markup.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-white font-medium text-sm mb-1">
                  02. Rapid Interactive Prototyping
                </div>
                <p className="text-white/60 text-xs">
                  Prototyping directly in code to test real physics, frame rate curves, gesture friction, and viewport boundaries.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-white font-medium text-sm mb-1">
                  03. Kinetic Polish & Typographic Hierarchy
                </div>
                <p className="text-white/60 text-xs">
                  Dialing in optical font weights, smooth easing curves (cubic-bezier), micro-interactions, and contrast ratios.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-white font-medium text-sm mb-1">
                  04. Production Hardening & Delivery
                </div>
                <p className="text-white/60 text-xs">
                  Zero memory leaks, rigorous cross-browser testing, SEO and OpenGraph metadata, and seamless hosting setup.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 5. EXPERIMENTS MODAL */}
        {activeModal === 'experiments' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest text-white/60">
              <span>Code Sandbox</span>
              <span>·</span>
              <span>Playground</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">
              Experiments & Lab
            </h2>
            <p className="text-sm text-white/70 mb-5">
              Micro-interactions, shader sketches, and non-traditional UI concepts explored in code.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-white font-medium text-sm mb-1">
                  Exp 01: Bi-directional Video Scrub
                </div>
                <p className="text-white/60 text-xs mb-2">
                  Scrubbing H.264 video frames via pointer delta and target time queues without browser seek flooding (active on this page!).
                </p>
                <span className="text-[10px] text-white/40 uppercase tracking-wider">Canvas & Video API</span>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-white font-medium text-sm mb-1">
                  Exp 02: Variable Font Distortions
                </div>
                <p className="text-white/60 text-xs mb-2">
                  Fluid typography scaling based on cursor distance and scroll momentum curves.
                </p>
                <span className="text-[10px] text-white/40 uppercase tracking-wider">Variable Fonts & Math</span>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-white font-medium text-sm mb-1">
                  Exp 03: Shader Noise Displacement
                </div>
                <p className="text-white/60 text-xs mb-2">
                  Simplex noise applied to geometry vertices for organic liquid wave effects.
                </p>
                <span className="text-[10px] text-white/40 uppercase tracking-wider">Three.js & GLSL</span>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-white font-medium text-sm mb-1">
                  Exp 04: Zero-Latency Search
                </div>
                <p className="text-white/60 text-xs mb-2">
                  In-memory indexing for instantaneous fuzzy matching across documentation sets.
                </p>
                <span className="text-[10px] text-white/40 uppercase tracking-wider">Bitwise Algorithms</span>
              </div>
            </div>
          </div>
        )}

        {/* 6. CONTACT MODAL */}
        {activeModal === 'contact' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest text-white/60">
              <span>Get In Touch</span>
              <span>·</span>
              <span>Say Hello</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">
              Let&apos;s Build Together
            </h2>
            <p className="text-sm text-white/70 mb-6">
              Have a project, role, or collaboration in mind? Drop a note below or reach out directly.
            </p>

            {contactSubmitted ? (
              <div className="bg-white/5 border border-white/20 rounded-xl p-6 text-center py-10">
                <div className="text-3xl mb-3">✳︎</div>
                <h3 className="text-lg font-medium mb-1">Message sent successfully!</h3>
                <p className="text-sm text-white/60 max-w-md mx-auto mb-6">
                  Thank you for reaching out. I will review your note and respond within 24 hours.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs uppercase tracking-wider bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors cursor-pointer"
                >
                  Return to Portfolio
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSubmitted(true);
                }}
                className="space-y-4 text-left"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Alex Morgan"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">
                      Your Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="alex@domain.com"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">
                    Subject / Project Interest
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="New digital flagship / Contract role / Creative collaboration"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me a bit about what you're working on and how I can help..."
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-white/50">
                    Direct email: <a href="mailto:hello@myportfolio.dev" className="text-white underline">hello@myportfolio.dev</a>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs uppercase tracking-wider bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors cursor-pointer"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
