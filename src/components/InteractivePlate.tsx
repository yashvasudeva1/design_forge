import React, { useState } from 'react';
import { FORGE_PROJECTS, FORGE_SERVICES, ForgeProject } from '../data/forgeData';
import { ForgeMark } from './Navbar';
import { PageRoute } from './TroveFooter';
import { ArrowUpRight, Layers } from 'lucide-react';

interface InteractivePlateProps {
  onStartProject?: (service?: string) => void;
  onSelectProject?: (project: ForgeProject) => void;
  onNavigate?: (page: PageRoute) => void;
}

// Pair each of the 6 studio disciplines with a real featured project specimen
const DISCIPLINE_SPECIMEN_IDS: Record<string, number> = {
  '01': 8,  // Logo Design -> Elysium Logo
  '02': 5,  // Brand Identity -> Namespace BPIT Branding
  '03': 2,  // Social Media Design -> Elysium Story Design
  '04': 6,  // UI/UX & Digital -> Opticlick Digital System
  '05': 1,  // Poster & Print -> Chocworks Menu
  '06': 10, // Design Consultancy -> Cirola Brand Direction
};

export const InteractivePlate: React.FC<InteractivePlateProps> = ({
  onStartProject,
  onSelectProject,
  onNavigate,
}) => {
  const [activeNum, setActiveNum] = useState<string>('01');

  const activeService =
    FORGE_SERVICES.find((s) => s.num === activeNum) || FORGE_SERVICES[0];
  const specimenId = DISCIPLINE_SPECIMEN_IDS[activeService.num] || 8;
  const activeProject =
    FORGE_PROJECTS.find((p) => p.id === specimenId) || FORGE_PROJECTS[0];

  return (
    <section
      aria-label="One studio, six disciplines"
      className="pt-20 lg:pt-28 pb-6"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Top Hairline Rule */}
        <div className="mb-10 lg:mb-14 border-t border-[var(--border)]" />

        {/* Section Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10 lg:mb-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[#901a1d]">
              <span className="inline-block h-[1.5px] w-6 bg-[#901a1d]" />
              <span>One Studio · Six Disciplines</span>
            </div>
            <h2 className="mt-3 font-display text-[clamp(40px,5.4vw,84px)] leading-[0.94] tracking-[-0.03em] text-[var(--foreground)]">
              One central forge.{' '}
              <span className="text-[var(--muted-foreground)]">
                Six creative disciplines.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start sm:items-end lg:items-end justify-between gap-4">
            <p className="text-[15px] leading-[1.6] text-[var(--muted-foreground)] max-w-[440px] lg:text-right">
              Rather than fragmenting your brand across separate agencies, Design Forge unites identity, print, and digital craft under a single studio standard.
            </p>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('/services')}
                className="font-nav font-semibold text-[11px] uppercase tracking-[0.14em] text-[#901a1d] hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Explore full service specs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Interactive Dark Architectural Stage */}
        <div className="border border-black bg-[#050505] text-white shadow-[0_26px_64px_rgba(0,0,0,0.22)] overflow-hidden">
          {/* Top Studio Status Bar with Actual Design Forge SVG Mark */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/12 bg-[#0a0a0a] px-6 sm:px-8 py-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 items-center justify-center border border-white/15 bg-black p-1.5">
                <ForgeMark className="h-full w-full" />
              </div>
              <div>
                <div className="font-nav text-xs font-bold uppercase tracking-[0.18em] text-white">
                  Design Forge Studio Matrix
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/55">
                  Delhi, India · 150+ Commissions · 95% Client Retention
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/65">
              <Layers className="w-3.5 h-3.5 text-[#901a1d]" />
              <span>Select a discipline to inspect live output ({activeService.num} / 06)</span>
            </div>
          </div>

          {/* 12-Column Interactive Split: Left 5 Cols Discipline Switcher | Right 7 Cols Live Discipline Specimen */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left 5 Columns: 6 Interactive Discipline Rows (Serial Position + Von Restorff on 02) */}
            <div className="lg:col-span-5 divide-y divide-white/10 border-b lg:border-b-0 lg:border-r border-white/12 flex flex-col justify-between">
              {FORGE_SERVICES.map((service) => {
                const isActive = service.num === activeService.num;
                const isFlagship = service.num === '02'; // Von Restorff isolation on Brand Identity
                return (
                  <button
                    key={service.num}
                    type="button"
                    onClick={() => setActiveNum(service.num)}
                    onMouseEnter={() => setActiveNum(service.num)}
                    className={`w-full min-h-[76px] text-left px-6 sm:px-8 py-5 transition-all duration-150 flex items-center justify-between gap-4 cursor-pointer group ${
                      isActive
                        ? 'bg-[#901a1d] text-white'
                        : isFlagship
                        ? 'bg-white/[0.03] text-white hover:bg-white/[0.06]'
                        : 'bg-transparent text-white/75 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`font-mono text-xs tabular-nums ${
                          isActive ? 'text-white font-semibold' : 'text-[#901a1d]'
                        }`}
                      >
                        {service.num}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="font-display text-2xl sm:text-[28px] leading-none tracking-[-0.02em]">
                            {service.title}
                          </span>
                          {isFlagship && (
                            <span
                              className={`font-mono text-[9px] uppercase tracking-[0.12em] px-1.5 py-0.5 border ${
                                isActive
                                  ? 'border-white bg-white text-[#901a1d] font-bold'
                                  : 'border-[#901a1d] bg-[#901a1d]/20 text-white'
                              }`}
                            >
                              Flagship
                            </span>
                          )}
                        </div>
                        <div
                          className={`mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] ${
                            isActive ? 'text-white/90' : 'text-white/45'
                          }`}
                        >
                          {service.tagline}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 border ${
                          isActive
                            ? 'border-white/35 bg-black/25 text-white'
                            : 'border-white/12 text-white/50'
                        }`}
                      >
                        {service.timeline.replace('–', '-')}
                      </span>
                      <ArrowUpRight
                        className={`w-4 h-4 transition-transform duration-150 ${
                          isActive
                            ? 'translate-x-0.5 -translate-y-0.5 text-white'
                            : 'text-white/30 group-hover:text-white/70'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right 7 Columns: Live Discipline Showcase + Featured Specimen Preview */}
            <div
              className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden"
              style={{
                background:
                  'radial-gradient(circle at 82% 22%, #4a0d0f 0%, #110405 55%, #050505 100%)',
              }}
            >
              {/* Discipline Overview & Deliverables with Smooth Stage Swap Animation */}
              <div
                key={activeService.num}
                className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center animate-stage-swap"
              >
                {/* Specimen Image Card */}
                <div className="sm:col-span-6">
                  <div
                    onClick={() => onSelectProject && onSelectProject(activeProject)}
                    className="group relative aspect-[4/3] w-full overflow-hidden border border-white/15 bg-black cursor-pointer shadow-[0_18px_40px_rgba(0,0,0,0.65)]"
                  >
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3 bg-[#901a1d] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white">
                      {activeProject.specimenCode}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/70">
                          Featured Specimen · {activeProject.client}
                        </div>
                        <div className="font-display text-xl text-white">
                          {activeProject.title}
                        </div>
                      </div>
                      <span className="flex h-8 w-8 items-center justify-center bg-white text-black group-hover:bg-[#901a1d] group-hover:text-white transition-colors duration-150">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Discipline Details & Deliverables */}
                <div className="sm:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-[#901a1d]/25 border border-[#901a1d]/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white">
                      <span>Discipline {activeService.num}</span>
                      <span>·</span>
                      <span>{activeService.timeline.replace('–', '-')}</span>
                    </div>

                    <h3 className="mt-3 font-display text-3xl sm:text-4xl leading-[0.98] text-white">
                      {activeService.title}.
                    </h3>

                    <p className="mt-3 text-sm leading-[1.6] text-white/75">
                      {activeService.desc}
                    </p>
                  </div>

                  {/* 4 Key Deliverables (Miller's Law chunked list) */}
                  <div className="mt-5 pt-4 border-t border-white/12">
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/50 mb-2.5">
                      Included Deliverables ({activeService.deliverables.length})
                    </div>
                    <div className="grid grid-cols-1 gap-1.5">
                      {activeService.deliverables.map((item, idx) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 font-mono text-[11px] text-white/90"
                        >
                          <span className="h-1.5 w-1.5 bg-[#901a1d] shrink-0" />
                          <span>
                            0{idx + 1}. {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar inside Live Stage (Fitts's Law >= 44px buttons) */}
              <div className="mt-8 pt-5 border-t border-white/12 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 font-mono text-[11px] text-white/65">
                  <ForgeMark className="w-5 h-5 shrink-0" />
                  <span>Custom-forged in Delhi · Master vector &amp; print-ready handoff</span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {onSelectProject && (
                    <button
                      type="button"
                      onClick={() => onSelectProject(activeProject)}
                      className="min-h-[44px] border border-white/25 bg-white/5 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white hover:bg-white hover:text-black transition-colors duration-150 cursor-pointer"
                    >
                      Inspect {activeProject.title}
                    </button>
                  )}
                  {onStartProject && (
                    <button
                      type="button"
                      onClick={() => onStartProject(activeService.title)}
                      className="min-h-[44px] bg-[#901a1d] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white hover:bg-white hover:text-black transition-colors duration-150 cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>Start {activeService.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
