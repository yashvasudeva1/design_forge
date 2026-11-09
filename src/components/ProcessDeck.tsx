import React, { useEffect, useRef, useState } from 'react';
import { ForgeMark } from './Navbar';
import { Check, RotateCcw } from 'lucide-react';

interface ProcessDeckProps {
  onStartProject: (service?: string) => void;
}

const DISCOVERY_LENSES = [
  {
    id: 'audit',
    index: '01',
    title: 'Brand & Visual Audit',
    timeline: 'Days 1-2',
    metric: 'Optical & Chromatic Review',
    axisLabel: 'OPTICAL LEGIBILITY · 16PX TO BILLBOARD',
    glyphPair: 'Aa',
    typeSpec: 'Bricolage Grotesque · Fraunces · Plus Jakarta Sans',
    summary:
      'Evaluates existing marks, typographic hierarchy, and substrate legibility across print and digital touchpoints.',
    findings: [
      'Primary mark scalability down to 16px',
      'Contrast calibration across light & obsidian surfaces',
      'Typographic voice & pairing architecture',
    ],
  },
  {
    id: 'whitespace',
    index: '02',
    title: 'Competitor Whitespace Map',
    timeline: 'Days 2-3',
    metric: 'Sector Positioning Matrix',
    axisLabel: 'TERRITORY MAPPING · DISTINCTIVE AUTHORITY',
    glyphPair: 'Ø1',
    typeSpec: 'Chromatic Separation · High-Contrast Editorial Grid',
    summary:
      'Maps visual clichés across your category so your new identity claims unmistakable typographic and chromatic territory.',
    findings: [
      'Category color saturation & differentiation study',
      'Verbal & visual tone-of-voice positioning',
      'Audience recall benchmarks across Delhi & global markets',
    ],
  },
  {
    id: 'sketch',
    index: '03',
    title: 'Geometric Grid & Ideation',
    timeline: 'Days 4-6',
    metric: 'Vector Construction Studies',
    axisLabel: 'GOLDEN RATIO · BEZIER TERMINAL ANGLES',
    glyphPair: 'Δx',
    typeSpec: '12-Column Swiss Grid · Custom Monogram Construction',
    summary:
      'Explores structural mark constructions, custom letterform rules, and tactile mood boards before digital vectorization.',
    findings: [
      '3 distinct conceptual territories presented',
      'Custom grid geometry & terminal angle rules',
      'Material & print finish direction boards',
    ],
  },
];

const FORGE_CONCEPT_STUDIES = [
  {
    id: 'study-1',
    code: 'STUDY I · PRIMARY ANVIL & FLAME LOCKUP',
    title: 'Vertical Emblem Construction',
    ratio: '1 : 1.618 Golden Proportion',
    tolerance: 'ΔE < 1.0 Print Tolerance · 0.25pt Minimum Stroke',
    notes:
      'Balanced vertical weight between the #901A1D triple-tongued ember and the horned blacksmith anvil base.',
    palette: ['#901A1D', '#000000', '#FFFFFF'],
  },
  {
    id: 'study-2',
    code: 'STUDY II · MONOCHROME & FOIL STAMP',
    title: 'Single-Ink & Blind Deboss Lockup',
    ratio: '100% K Overprint & Die-Strike Ready',
    tolerance: 'Verified at 12mm Micro-Stamp & 20ft Signage',
    notes:
      'Engineered to retain crisp negative-space separation when foil-stamped, blind-debossed, or screen-printed on dark substrates.',
    palette: ['#000000', '#E2E2E2', '#901A1D'],
  },
  {
    id: 'study-3',
    code: 'STUDY III · HORIZONTAL WORDMARK SYSTEM',
    title: 'Editorial Wordmark & Grid Lockup',
    ratio: 'Optical Kerning · +0.14em Tracking',
    tolerance: 'Responsive Digital Header & Print Spine Ready',
    notes:
      'Pairs the sculptural symbol with geometric letterforms for mastheads, packaging spines, and digital headers.',
    palette: ['#FFFFFF', '#901A1D', '#080808'],
  },
];

const DELIVER_BUNDLES = [
  {
    id: 'identity-master',
    index: '01',
    label: 'Brand Identity Master Suite',
    formats: 'AI · EPS · SVG · PDF · PNG',
    timeline: 'Full Vector Handoff',
    code: 'ARCHIVE-01 · VECTOR MASTER',
    specs:
      'Primary & secondary marks, monochrome lockups, color system tokens, and a comprehensive Brand Usage Guidelines book.',
    checklist: [
      'Master Vector Source Files',
      'Color & Type Specimen Book',
      'Clearspace & Misuse Rules',
      'Social & Favicon Kit',
    ],
    formatBadges: ['MASTER .AI', 'VECTOR .SVG', 'PRINT .EPS', 'GUIDE .PDF'],
  },
  {
    id: 'print-press',
    index: '02',
    label: 'CMYK Press & Signage Package',
    formats: 'PDF/X-4 · 300 DPI · 3mm Bleed',
    timeline: 'Pre-Flight Verified',
    code: 'ARCHIVE-02 · PRESS & PACKAGING',
    specs:
      'Press-ready menus, artisanal pamphlets, posters, and large-format banners with crop, fold, and die-line layers.',
    checklist: [
      'CMYK & Spot Pantone Separation',
      '3mm Bleed & Trim Marks',
      'Paper Stock & Foil Specs',
      'Large-Format Signage Masters',
    ],
    formatBadges: ['PDF/X-4 CMYK', '300 DPI TIFF', 'PANTONE SPOT', 'DIE-LINE .AI'],
  },
  {
    id: 'digital-system',
    index: '03',
    label: 'UI/UX & Social Design System',
    formats: 'Figma Library · Design Tokens · SVG',
    timeline: 'Production Ready',
    code: 'ARCHIVE-03 · DIGITAL PRODUCT',
    specs:
      'Interactive web and mobile prototypes, reusable component systems, and high-retention social media templates.',
    checklist: [
      'Responsive Grid & Token Library',
      'Interactive Prototype Flows',
      'Instagram Carousel & Story Kits',
      'Developer Handoff Specs',
    ],
    formatBadges: ['FIGMA SYSTEM', 'CSS TOKENS', 'RETINA .PNG', 'SOCIAL KIT'],
  },
];

const clamp = (v: number, min: number, max: number) =>
  v < min ? min : v > max ? max : v;

export const ProcessDeck: React.FC<ProcessDeckProps> = ({ onStartProject }) => {
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);
  const [scrollPhase, setScrollPhase] = useState(0);

  const [selectedLens, setSelectedLens] = useState(DISCOVERY_LENSES[0]);
  const [studyIdx, setStudyIdx] = useState(0);
  const [approvedCount, setApprovedCount] = useState(1);
  const [refinedCount, setRefinedCount] = useState(0);
  const [selectedBundle, setSelectedBundle] = useState(DELIVER_BUNDLES[0]);

  const currentStudy =
    FORGE_CONCEPT_STUDIES[studyIdx] || FORGE_CONCEPT_STUDIES[0];

  const handleStudyAction = (decision: 'keep' | 'iterate') => {
    if (decision === 'keep') {
      setApprovedCount((c) => c + 1);
    } else {
      setRefinedCount((c) => c + 1);
    }
    setStudyIdx((prev) => (prev + 1) % FORGE_CONCEPT_STUDIES.length);
  };

  useEffect(() => {
    let rafId = 0;

    const updateScrollMorph = () => {
      const trackEl = scrollTrackRef.current;
      if (!trackEl) return;

      const rect = trackEl.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollableDistance = Math.max(1, rect.height - viewportH * 0.85);
      const scrolled = -rect.top + viewportH * 0.18;
      const rawNorm = clamp(scrolled / scrollableDistance, 0, 1);

      const targetPhase = rawNorm * 2;
      setScrollPhase(targetPhase);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScrollMorph);
    };

    updateScrollMorph();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const getMorphCardStyle = (cardIndex: number): React.CSSProperties => {
    const rawDelta = cardIndex - scrollPhase;
    const absRaw = Math.abs(rawDelta);

    const morphDelta =
      absRaw <= 0.26
        ? 0
        : Math.sign(rawDelta) * ((absRaw - 0.26) / 0.74);
    const absDelta = Math.abs(morphDelta);

    const opacity = clamp(1 - Math.pow(absDelta * 1.08, 1.65), 0, 1);
    const scale =
      morphDelta > 0
        ? 1 - clamp(morphDelta, 0, 1.5) * 0.075
        : 1 + clamp(-morphDelta, 0, 1.5) * 0.045;
    const translateY = morphDelta * 48;
    const rotateX = clamp(-morphDelta * 9, -11, 11);
    const blurPx = clamp(Math.pow(absDelta, 1.4) * 8, 0, 10);

    return {
      opacity,
      transform: `perspective(1400px) translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(4)}) rotateX(${rotateX.toFixed(2)}deg)`,
      filter: blurPx > 0.2 ? `blur(${blurPx.toFixed(2)}px)` : 'none',
      pointerEvents: absRaw < 0.5 ? 'auto' : 'none',
      zIndex: absRaw < 0.5 ? 30 : 20 - Math.round(absRaw * 5),
    };
  };

  const scrollToStage = (stageIdx: number) => {
    const trackEl = scrollTrackRef.current;
    if (!trackEl) return;
    const rect = trackEl.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const viewportH = window.innerHeight;
    const scrollableDistance = Math.max(1, rect.height - viewportH * 0.85);
    const targetScrollY =
      absoluteTop - viewportH * 0.18 + (stageIdx / 2) * scrollableDistance;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  const activeStageIndex = Math.round(clamp(scrollPhase, 0, 2));
  const stageTitles = [
    '01. Research & Sketch',
    '02. Forge & Polish',
    '03. Deliver & Endure',
  ];

  return (
    <section
      id="process"
      aria-label="How a brief becomes an identity"
      className="scroll-mt-20 py-16 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-10">
        {/* Scroll-Driven Morph Track */}
        <div ref={scrollTrackRef} className="relative min-h-[235vh]">
          <div className="sticky top-22 pb-8">
            {/* Updraft-Style Section Header: [02] · HOW IT WORKS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-8 lg:mb-10">
              <div className="lg:col-span-7">
                <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#901a1d] mb-2">
                  How It Works
                </p>
                <h2 className="font-display text-[clamp(38px,5vw,76px)] leading-[0.94] tracking-[-0.035em] text-[var(--foreground)]">
                  How a brief{' '}
                  <span className="font-editorial italic font-normal text-[#901a1d]">
                    becomes
                  </span>{' '}
                  an identity.
                </h2>
              </div>

              <div className="lg:col-span-5 flex flex-col lg:items-end justify-between gap-4">
                <p className="max-w-[420px] text-[15px] leading-[1.55] text-[var(--muted-foreground)] lg:text-right">
                  Three acts, zero mystery. Scroll and watch a raw idea move from studio research to a timeless brand identity.
                </p>
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none max-w-full pb-1 touch-scroll">
                  {stageTitles.map((label, idx) => {
                    const active = activeStageIndex === idx;
                    return (
                      <button
                        key={label}
                        type="button"
                        aria-label={`Jump to ${label}`}
                        onClick={() => scrollToStage(idx)}
                        className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] transition-all duration-200 cursor-pointer whitespace-nowrap ${
                          active
                            ? 'bg-[#901a1d] text-white font-semibold shadow-sm'
                            : 'bg-[var(--panel)] text-[var(--muted-foreground)] border border-[var(--border)] hover:text-[var(--foreground)]'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Morphing Tactile Updraft Card Deck Container */}
            <div className="relative">
              <div className="relative min-h-[550px] sm:min-h-[500px] lg:min-h-[480px]">
                {/* ============================================================
                 * CARD 01: RESEARCH & SKETCH (TYPOGRAPHIC & WHITESPACE AUDIT BOARD)
                 * ============================================================ */}
                <div
                  style={getMorphCardStyle(0)}
                  className="inset-0 rounded-[28px] border border-[var(--border)] updraft-card-surface p-6 sm:p-10 lg:p-12 shadow-[var(--elev-4)] will-change-[transform,opacity,filter]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                    {/* Left 5 Columns */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#901a1d]">
                          <span>01 · DAYS 1-6</span>
                          <span>·</span>
                          <span>RESEARCH &amp; SKETCH</span>
                        </div>

                        <h3 className="mt-3 font-display text-[clamp(30px,3.2vw,44px)] leading-[1.02] tracking-[-0.03em] text-[var(--foreground)] text-balance">
                          Dive deep before drawing a single line.
                        </h3>

                        <p className="mt-4 text-[15px] leading-[1.62] text-[var(--muted-foreground)]">
                          Great design is forged, not found. Every commission begins with a structured brand audit, sector whitespace study, and geometric concept sketching before digital vectorization begins.
                        </p>
                      </div>

                      {/* 3 Interactive Discovery Lenses */}
                      <div className="mt-6 pt-5 border-t border-[var(--border)]">
                        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)] mb-3">
                          Select Discovery Phase to Inspect Dossier
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {DISCOVERY_LENSES.map((lens) => {
                            const isSelected = selectedLens.id === lens.id;
                            return (
                              <button
                                key={lens.id}
                                type="button"
                                onClick={() => setSelectedLens(lens)}
                                className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                                  isSelected
                                    ? 'border-[#901a1d] bg-[#901a1d] text-white'
                                    : 'border-[var(--border)] bg-[var(--shell)] text-[var(--foreground)] hover:border-[#901a1d]'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span
                                    className={`font-mono text-xs tabular-nums ${
                                      isSelected ? 'text-white' : 'text-[#901a1d]'
                                    }`}
                                  >
                                    {lens.index}
                                  </span>
                                  <span className="font-nav text-xs font-bold tracking-[-0.01em]">
                                    {lens.title}
                                  </span>
                                </div>
                                <span
                                  className={`font-mono text-[10px] uppercase tracking-[0.08em] ${
                                    isSelected
                                      ? 'text-white/85'
                                      : 'text-[var(--muted-foreground)]'
                                  }`}
                                >
                                  {lens.timeline}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Right 7 Columns: Tactile Ruled Studio Brief & Audit Pad */}
                    <div className="lg:col-span-7">
                      <div className="h-full rounded-[22px] border border-[var(--border)] updraft-ruled-pad text-[var(--foreground)] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-[var(--elev-2)]">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[var(--border)]">
                          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                            Dossier {selectedLens.index} · {selectedLens.metric}
                          </div>
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#901a1d] font-semibold">
                            Scoped in 24-48 Hours
                          </span>
                        </div>

                        <div className="my-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                          {/* Architectural Typography & Grid Plate */}
                          <div className="sm:col-span-5">
                            <div className="relative aspect-square w-full rounded-2xl border border-white/15 bg-[#0c0c0c] p-5 flex flex-col justify-between overflow-hidden text-white">
                              <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 opacity-20"
                                style={{
                                  backgroundImage:
                                    'linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)',
                                  backgroundSize: '32px 32px',
                                }}
                              />
                              <div className="relative z-10 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-white/55">
                                <span>SCALE · 1:1</span>
                                <span className="text-[#901a1d]">GRID {selectedLens.index}</span>
                              </div>
                              <div className="relative z-10 my-auto text-center">
                                <span className="font-editorial italic text-7xl sm:text-8xl leading-none tracking-[-0.04em] text-white select-none">
                                  {selectedLens.glyphPair}
                                </span>
                                <div className="mt-2 h-[1.5px] w-12 bg-[#901a1d] mx-auto" />
                              </div>
                              <div className="relative z-10 font-mono text-[9px] uppercase tracking-[0.12em] text-white/70 truncate">
                                {selectedLens.axisLabel}
                              </div>
                            </div>
                          </div>

                          {/* Audit Findings */}
                          <div className="sm:col-span-7">
                            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#901a1d]">
                              {selectedLens.typeSpec}
                            </div>
                            <div className="mt-1 font-display text-2xl sm:text-3xl text-[var(--foreground)] leading-tight">
                              {selectedLens.title}
                            </div>
                            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--muted-foreground)]">
                              {selectedLens.summary}
                            </p>
                            <div className="mt-4 pt-3 border-t border-[var(--border)] space-y-2">
                              {selectedLens.findings.map((f, i) => (
                                <div
                                  key={f}
                                  className="flex items-center gap-2.5 font-mono text-[11px] text-[var(--foreground)]"
                                >
                                  <span className="text-[#901a1d] font-semibold">
                                    0{i + 1}
                                  </span>
                                  <span>{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                          <span>Deliverable: Strategic Audit &amp; Concept Moodboards</span>
                          <span className="text-[#901a1d] font-semibold">{selectedLens.timeline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ============================================================
                 * CARD 02: FORGE & POLISH (FORGEMARK VECTOR CONSTRUCTION BLUEPRINT)
                 * ============================================================ */}
                <div
                  style={getMorphCardStyle(1)}
                  className="absolute inset-0 rounded-[28px] border border-[var(--border)] updraft-card-surface p-6 sm:p-10 lg:p-12 shadow-[var(--elev-4)] will-change-[transform,opacity,filter]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                    <div className="lg:col-span-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#901a1d]">
                          <span>02 · DAYS 7-14</span>
                          <span>·</span>
                          <span>FORGE &amp; POLISH</span>
                        </div>

                        <h3 className="mt-3 font-display text-[clamp(30px,3.2vw,44px)] leading-[1.02] tracking-[-0.03em] text-[var(--foreground)] text-balance">
                          Tempering raw vectors into authority.
                        </h3>

                        <p className="mt-4 text-[15px] leading-[1.62] text-[var(--muted-foreground)]">
                          Sketching captures possibilities; forging is a discipline of optical judgement. We deal refined identity constructions side by side, stress-testing kerning pairs, bezier tension, and chromatic balance across real substrates.
                        </p>
                      </div>

                      <div className="mt-6 pt-5 border-t border-[var(--border)]">
                        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--foreground)] mb-4">
                          <span className="tabular-nums">
                            Approved Studies: <strong>{approvedCount}</strong>
                          </span>
                          <span className="text-[#901a1d]">·</span>
                          <span className="tabular-nums">
                            Iterations Logged: <strong>{refinedCount}</strong>
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => handleStudyAction('iterate')}
                            className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--shell)] py-3 font-nav font-semibold text-[12px] text-[var(--foreground)] hover:border-[#901a1d] transition-colors cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Next Study</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStudyAction('keep')}
                            className="flex items-center justify-center gap-2 rounded-xl bg-[#901a1d] py-3 font-nav font-semibold text-[12px] text-white hover:bg-black transition-colors cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve Geometry</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right 7 Columns: Official ForgeMark Vector Blueprint & Chromatic Calibration */}
                    <div className="lg:col-span-7">
                      <div className="h-full rounded-[22px] border border-black bg-[#090909] text-white p-6 sm:p-8 flex flex-col justify-between">
                        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 pb-4 border-b border-white/12">
                          <span>{currentStudy.code}</span>
                          <span className="tabular-nums text-[#901a1d] font-semibold">
                            Study 0{studyIdx + 1} / 0{FORGE_CONCEPT_STUDIES.length}
                          </span>
                        </div>

                        <div className="my-5 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                          {/* Official Design Forge SVG Vector Construction Plate */}
                          <div className="sm:col-span-5">
                            <div className="relative aspect-square w-full rounded-2xl border border-white/15 bg-[#0e0e0e] flex items-center justify-center p-6 overflow-hidden">
                              <svg
                                viewBox="0 0 200 200"
                                className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
                                aria-hidden="true"
                              >
                                <circle
                                  cx="100"
                                  cy="100"
                                  r="72"
                                  fill="none"
                                  stroke="#901a1d"
                                  strokeWidth="1"
                                  strokeDasharray="3 3"
                                />
                                <circle
                                  cx="100"
                                  cy="100"
                                  r="44"
                                  fill="none"
                                  stroke="rgba(255,255,255,0.35)"
                                  strokeWidth="0.75"
                                />
                                <line
                                  x1="0"
                                  y1="100"
                                  x2="200"
                                  y2="100"
                                  stroke="rgba(255,255,255,0.2)"
                                  strokeWidth="0.75"
                                />
                                <line
                                  x1="100"
                                  y1="0"
                                  x2="100"
                                  y2="200"
                                  stroke="rgba(255,255,255,0.2)"
                                  strokeWidth="0.75"
                                />
                              </svg>
                              <div className="relative z-10 rounded-2xl bg-[#f2efe9] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.65)]">
                                <ForgeMark className="w-24 h-24 sm:w-28 sm:h-28" />
                              </div>
                            </div>
                          </div>

                          <div className="sm:col-span-7">
                            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#901a1d]">
                              {currentStudy.ratio}
                            </div>
                            <div className="mt-1 font-display text-2xl sm:text-3xl text-white">
                              {currentStudy.title}
                            </div>
                            <p className="mt-2 text-xs leading-relaxed text-white/70">
                              {currentStudy.notes}
                            </p>

                            {/* Palette Swatches */}
                            <div className="mt-4 pt-3 border-t border-white/12">
                              <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/50 mb-2">
                                Verified Chromatic Tokens
                              </div>
                              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none max-w-full pb-1 touch-scroll">
                                {currentStudy.palette.map((hex, i) => (
                                  <div
                                    key={`${hex}-${i}`}
                                    className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1"
                                  >
                                    <span
                                      className="inline-block w-3 h-3 rounded-full border border-white/30"
                                      style={{ backgroundColor: hex }}
                                    />
                                    <span className="font-mono text-[10px] text-white/85">
                                      {hex}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/12 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/55">
                          <span>{currentStudy.tolerance}</span>
                          <span>Vector Geometry Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ============================================================
                 * CARD 03: DELIVER & ENDURE (PRODUCTION HANDOFF DOSSIER)
                 * ============================================================ */}
                <div
                  style={getMorphCardStyle(2)}
                  className="absolute inset-0 rounded-[28px] border border-[var(--border)] updraft-card-surface p-6 sm:p-10 lg:p-12 shadow-[var(--elev-4)] will-change-[transform,opacity,filter]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                    <div className="lg:col-span-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#901a1d]">
                          <span>03 · MASTER ARCHIVE</span>
                          <span>·</span>
                          <span>DELIVER &amp; ENDURE</span>
                        </div>

                        <h3 className="mt-3 font-display text-[clamp(30px,3.2vw,44px)] leading-[1.02] tracking-[-0.03em] text-[var(--foreground)] text-balance">
                          Master files built for every medium.
                        </h3>

                        <p className="mt-4 text-[15px] leading-[1.62] text-[var(--muted-foreground)]">
                          Final handoff delivers a complete, pre-flighted production archive. Whether embossing a luxury menu, printing a 20-foot architectural banner, or launching a digital product, every asset ships ready to deploy.
                        </p>
                      </div>

                      <div className="mt-6 pt-5 border-t border-[var(--border)]">
                        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)] mb-3">
                          Inspect Production Handoff Archive
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {DELIVER_BUNDLES.map((b) => {
                            const isSelected = selectedBundle.id === b.id;
                            return (
                              <button
                                key={b.id}
                                type="button"
                                onClick={() => setSelectedBundle(b)}
                                className={`w-full text-left px-4 py-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                                  isSelected
                                    ? 'border-[#901a1d] bg-[#901a1d] text-white'
                                    : 'border-[var(--border)] bg-[var(--shell)] text-[var(--foreground)] hover:border-[#901a1d]'
                                }`}
                              >
                                <span className="font-nav text-xs font-bold tracking-[-0.01em]">
                                  {b.index}. {b.label}
                                </span>
                                <span
                                  className={`font-mono text-[10px] ${
                                    isSelected
                                      ? 'text-white/85'
                                      : 'text-[var(--muted-foreground)]'
                                  }`}
                                >
                                  {b.timeline}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Right 7 Columns: Master Handoff Specification Blueprint */}
                    <div className="lg:col-span-7">
                      <div className="h-full rounded-[22px] border border-black bg-[#090909] text-white p-6 sm:p-8 flex flex-col justify-between">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/12">
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                            {selectedBundle.code}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#901a1d] font-semibold">
                            {selectedBundle.formats}
                          </span>
                        </div>

                        <div className="my-5 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                          {/* Format Architecture Matrix */}
                          <div className="sm:col-span-5">
                            <div className="aspect-square w-full rounded-2xl border border-white/15 bg-[#0e0e0e] p-4 grid grid-cols-2 gap-2">
                              {selectedBundle.formatBadges.map((badge, idx) => (
                                <div
                                  key={badge}
                                  className="rounded-xl border border-white/12 bg-black p-3 flex flex-col justify-between"
                                >
                                  <span className="font-mono text-[9px] text-[#901a1d]">
                                    0{idx + 1}
                                  </span>
                                  <span className="font-mono text-[11px] font-semibold text-white tracking-wider">
                                    {badge}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="sm:col-span-7">
                            <div className="font-display text-2xl sm:text-3xl text-white">
                              {selectedBundle.label}
                            </div>
                            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/70">
                              {selectedBundle.specs}
                            </p>
                            <div className="mt-4 pt-3 border-t border-white/12 grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {selectedBundle.checklist.map((item) => (
                                <div
                                  key={item}
                                  className="flex items-center gap-2 font-mono text-[10px] text-white/90"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#901a1d] shrink-0" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/12 flex flex-wrap items-center justify-between gap-4">
                          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/60">
                            Master Vector &amp; Print-Ready Handoff
                          </span>
                          <button
                            type="button"
                            onClick={() => onStartProject('Brand Identity')}
                            className="rounded-full bg-[#901a1d] text-white font-nav font-semibold text-[12px] px-5 py-2.5 hover:bg-white hover:text-black transition-colors cursor-pointer"
                          >
                            Commission a System →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
