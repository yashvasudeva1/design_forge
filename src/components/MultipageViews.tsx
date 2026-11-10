import React, { useState } from 'react';
import {
  CONTACT_INFO,
  FORGE_SERVICES,
  ForgeProject,
  STUDIO_VALUES,
} from '../data/forgeData';
import { validateProjectBrief } from '../utils/archiveLogic';
import { MomentsPortfolioWall } from './MomentsPortfolioWall';
import { FaqSection } from './FaqSection';
import { PageRoute } from './TroveFooter';
import { ForgeMark } from './Navbar';
import { Reveal } from './Reveal';
import { ArrowUpRight, CheckCircle2, Plus } from 'lucide-react';

/* ============================================================================
 * ABOUT PAGE (/about)
 * Updraft Tactile Editorial Layout + Uploaded Studio Portrait
 * ========================================================================== */
export const AboutPage: React.FC<{
  onStartProject: (service?: string) => void;
  onNavigate: (page: PageRoute) => void;
}> = ({ onStartProject }) => {
  return (
    <div className="pb-16">
      {/* ABOUT HERO */}
      <section className="pt-10 pb-12 sm:pt-14 lg:pb-16">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#901a1d] mb-3">
              The Studio · Delhi, India
            </p>
            <h1 className="font-display text-[clamp(48px,7.8vw,116px)] leading-[0.92] tracking-[-0.035em] text-[var(--foreground)] max-w-[1200px]">
              Where Fire{' '}
              <span className="font-editorial italic font-normal text-[#901a1d]">
                Meets Precision.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-8 lg:mt-10 pt-8 border-t border-[var(--border)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <p className="lg:col-span-8 max-w-[720px] text-[18px] sm:text-[21px] leading-[1.52] text-[var(--muted-foreground)]">
                <span className="text-[var(--foreground)] font-semibold">
                  Like skilled blacksmiths transforming raw metal into refined masterpieces,
                </span>{' '}
                Design Forge shapes your brand vision into powerful visual identities. We combine raw creative passion with disciplined precision to craft designs that stand the test of time.
              </p>
              <div className="lg:col-span-4 flex lg:justify-end">
                <button
                  type="button"
                  onClick={() => onStartProject()}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#901a1d] pl-6 pr-2 py-2 text-[14px] font-nav font-semibold text-white hover:bg-[#141413] transition-colors cursor-pointer shadow-[0_12px_28px_rgba(144,26,29,0.22)]"
                >
                  <span>Start a project</span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#141413] text-white group-hover:bg-white group-hover:text-[#141413] transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OUR STORY + UPLOADED STUDIO PORTRAIT + METRICS */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 6 Columns: Our Story Card + 4-Metric Strip */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="rounded-[28px] border border-[var(--border)] updraft-card-surface p-7 sm:p-10 shadow-[var(--elev-2)]">
              <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#901a1d]">
                Our Story
              </p>

              <h2 className="mt-4 font-display text-[clamp(32px,4vw,54px)] leading-[0.98] tracking-[-0.03em] text-[var(--foreground)]">
                Crafting excellence{' '}
                <span className="font-editorial italic font-normal text-[#901a1d]">
                  since day one.
                </span>
              </h2>

              <div className="mt-6 space-y-4 text-[16px] leading-[1.65] text-[var(--muted-foreground)]">
                <p>
                  Founded with a single belief - that{' '}
                  <span className="updraft-marker text-[var(--foreground)] font-medium">
                    great design is forged, not found
                  </span>{' '}
                  - Design Forge has grown into a trusted creative studio serving ambitious brands across industries.
                </p>
                <p>
                  Every project enters our forge raw and leaves refined. We don’t believe in templates or shortcuts. Each brand identity, logo, and campaign is custom-crafted through research, iteration, and relentless attention to detail.
                </p>
                <p className="text-[var(--foreground)] font-medium">
                  Our team brings together graphic design, brand strategy, typography, and digital design under one roof - ensuring cohesive, powerful visual storytelling at every touchpoint.
                </p>
              </div>
            </div>

            {/* 4-Metric Scoreboard in Updraft Rounded Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: '6+', label: 'Years Active' },
                { value: '150+', label: 'Projects' },
                { value: '95%', label: 'Retention' },
                { value: '4.5★', label: 'Client Rating' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[22px] border border-[var(--border)] bg-[var(--panel)] p-5 text-center shadow-[var(--elev-1)]"
                >
                  <div className="font-display text-3xl text-[#901a1d] tabular-nums">
                    {stat.value}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 6 Columns: Uploaded Design Forge Studio Picture */}
          <div className="lg:col-span-6">
            <figure className="rounded-[28px] overflow-hidden border border-[var(--border)] bg-[#0a0a0a] shadow-[var(--elev-4)]">
              <div className="relative overflow-hidden">
                <img
                  src="/assets/aistudio/chatgpt_image_8bcc7940.png"
                  alt="Design Forge Studio - Crafting Brand Identities"
                  className="w-full h-auto object-cover block"
                />
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-white/15 bg-[#0f0f0e] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-white/80">
                <span className="inline-flex items-center gap-2">
                  <ForgeMark className="w-4 h-4" />
                  <span>Design Forge Studio · Delhi, India</span>
                </span>
                <span className="text-[#e15b5e] font-semibold">
                  Forging Ideas Into Reality
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* OUR VALUES: WHAT DRIVES US (01 Mission, 02 Philosophy, 03 Approach, 04 Commitment) */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-t border-[var(--border)] pt-12">
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#901a1d]">
                Our Values
              </p>
              <h2 className="mt-3 font-display text-[clamp(36px,4.8vw,72px)] leading-[0.95] tracking-[-0.03em] text-[var(--foreground)]">
                What{' '}
                <span className="font-editorial italic font-normal text-[#901a1d]">
                  drives
                </span>{' '}
                us.
              </h2>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
              04 Founding Principles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STUDIO_VALUES.map((v, idx) => (
              <Reveal key={v.num} delay={idx * 80}>
                <div className="h-full rounded-[28px] border border-[var(--border)] updraft-card-surface p-8 sm:p-10 flex flex-col justify-between shadow-[var(--elev-2)] forge-hover-lift hover:border-[#901a1d]/60">
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#901a1d] font-semibold">
                      DF · {v.num}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
                      Principle {v.num}
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="font-display text-3xl text-[var(--foreground)]">
                      {v.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.65] text-[var(--muted-foreground)]">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ============================================================================
 * CUSTOM STUDIO INSTRUMENT GRAPHICS FOR THE 6-TILE FORGE BOARD (/services)
 * Inspired by Updraft's Forecast Board (Charts, Calendar Matrix, Radar, Dial, Swatches)
 * Tile 01 embeds the official Design Forge SVG logo (ForgeMark)
 * ========================================================================== */
const ServiceInstrumentGraphic: React.FC<{ num: string }> = ({ num }) => {
  switch (num) {
    case '01':
      // Tile 01: Official Design Forge SVG Logo inside a Precision Vector Construction Grid
      return (
        <div className="relative h-44 w-full rounded-[20px] border border-[var(--border)] bg-[#141413] p-4 flex items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 320 160"
            className="absolute inset-0 h-full w-full opacity-35 pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <pattern id="svc-grid-01" width="20" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="0.4"
                  strokeOpacity="0.25"
                />
              </pattern>
            </defs>
            <rect width="320" height="160" fill="url(#svc-grid-01)" />
            <circle
              cx="160"
              cy="80"
              r="54"
              fill="none"
              stroke="#901a1d"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
            <circle
              cx="160"
              cy="80"
              r="34"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.75"
              strokeOpacity="0.5"
            />
            <line x1="60" y1="80" x2="260" y2="80" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.4" />
            <line x1="160" y1="12" x2="160" y2="148" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.4" />
          </svg>

          <div className="relative z-10 flex flex-col items-center">
            <div className="rounded-2xl border border-white/30 bg-[#f2efe9] p-3 shadow-[0_12px_30px_rgba(144,26,29,0.5)] transition-transform duration-300 group-hover:scale-105">
              <ForgeMark className="w-14 h-14" />
            </div>
          </div>

          <span className="absolute top-3 left-3.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/60">
            R = 1.618 · SVG MASTER
          </span>
          <span className="absolute bottom-3 right-3.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#e15b5e]">
            DESIGN FORGE MARK
          </span>
        </div>
      );

    case '02':
      // Tile 02: Brand Identity Swatch Fan & Typography Scale
      return (
        <div className="relative h-44 w-full rounded-[20px] border border-[var(--border)] bg-[var(--shell)] p-4 flex items-center justify-between overflow-hidden">
          <div className="flex items-end gap-2">
            {[
              { hex: '#901A1D', label: 'Crimson', h: 'h-28' },
              { hex: '#141413', label: 'Obsidian', h: 'h-24' },
              { hex: '#D8D2C5', label: 'Stone', h: 'h-20' },
              { hex: '#F2EFE9', label: 'Paper', h: 'h-16' },
            ].map((swatch) => (
              <div
                key={swatch.hex}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className={`w-11 ${swatch.h} rounded-xl border border-black/15 shadow-sm transition-transform duration-300 group-hover:-translate-y-1`}
                  style={{ backgroundColor: swatch.hex }}
                />
                <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
                  {swatch.hex}
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-4 py-3 text-right shadow-sm">
            <div className="font-display text-3xl leading-none text-[var(--foreground)]">
              Aa<span className="font-editorial italic text-[#901a1d]">Bb</span>
            </div>
            <div className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
              Type &amp; Color System
            </div>
          </div>
        </div>
      );

    case '03':
      // Tile 03: Updraft 7-Day Campaign Cadence Matrix (M T W T F S S)
      return (
        <div className="relative h-44 w-full rounded-[20px] border border-[var(--border)] bg-[var(--shell)] p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
            <span>Campaign Cadence</span>
            <span className="text-[#901a1d] font-semibold">↗ +184% Reach</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 my-auto">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
              const active = i === 1 || i === 3 || i === 4 || i === 6;
              return (
                <div key={`${day}-${i}`} className="flex flex-col items-center gap-1.5">
                  <span className="font-mono text-[9px] text-[var(--muted-foreground)]">
                    {day}
                  </span>
                  <div
                    className={`h-12 w-full rounded-lg border flex items-center justify-center font-mono text-[10px] ${
                      active
                        ? 'border-[#901a1d] bg-[#901a1d] text-white font-semibold shadow-sm'
                        : 'border-[var(--border)] bg-[var(--panel)] text-[var(--muted-foreground)]'
                    }`}
                  >
                    {active ? '✦' : '·'}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
            <span>Reels · Carousels · Stories</span>
            <span>4:5 &amp; 9:16</span>
          </div>
        </div>
      );

    case '04':
      // Tile 04: UI/UX Rising Conversion Bar Telemetry
      return (
        <div className="relative h-44 w-full rounded-[20px] border border-[var(--border)] bg-[var(--shell)] p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
            <span>Interface Flow</span>
            <span className="text-[#901a1d] font-semibold">Figma Prototype</span>
          </div>

          <div className="flex items-end justify-between gap-2.5 h-24 pt-2 px-1">
            {[
              { label: 'W1', h: '38%', active: false },
              { label: 'W2', h: '54%', active: false },
              { label: 'W3', h: '72%', active: false },
              { label: 'W4', h: '88%', active: true },
              { label: 'W5', h: '100%', active: true },
            ].map((bar) => (
              <div
                key={bar.label}
                className="flex-1 h-full flex flex-col justify-end items-center gap-1"
              >
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    bar.active ? 'bg-[#901a1d]' : 'bg-[var(--foreground)]/20'
                  }`}
                  style={{ height: bar.h }}
                />
                <span className="font-mono text-[9px] text-[var(--muted-foreground)]">
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    case '05':
      // Tile 05: Semicircular Print DPI & Bleed Precision Dial
      return (
        <div className="relative h-44 w-full rounded-[20px] border border-[var(--border)] bg-[var(--shell)] p-4 flex flex-col items-center justify-between overflow-hidden">
          <div className="w-full flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
            <span>CMYK + Pantone</span>
            <span className="text-[#901a1d] font-semibold">300 DPI Press</span>
          </div>

          <svg viewBox="0 0 200 100" className="w-44 h-24 overflow-visible">
            <path
              d="M 20 88 A 80 80 0 0 1 180 88"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.15"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M 20 88 A 80 80 0 0 1 168 46"
              fill="none"
              stroke="#901a1d"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <text
              x="100"
              y="82"
              textAnchor="middle"
              className="font-display text-[22px] fill-current"
            >
              ΔE &lt; 1.0
            </text>
          </svg>

          <div className="w-full flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
            <span>3mm Bleed &amp; Crop Marks</span>
            <span>Menus · Banners</span>
          </div>
        </div>
      );

    default:
      // Tile 06: Design Consultancy Brand Positioning Radar
      return (
        <div className="relative h-44 w-full rounded-[20px] border border-[var(--border)] bg-[var(--shell)] p-4 flex items-center justify-between overflow-hidden">
          <svg viewBox="0 0 140 140" className="w-32 h-32 mx-auto">
            <circle cx="70" cy="70" r="56" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />
            <circle cx="70" cy="70" r="36" fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />
            <line x1="70" y1="10" x2="70" y2="130" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />
            <line x1="10" y1="70" x2="130" y2="70" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" />
            <polygon
              points="70,20 118,58 98,114 34,98 28,48"
              fill="rgba(144, 26, 29, 0.20)"
              stroke="#901a1d"
              strokeWidth="2"
            />
            <circle cx="70" cy="20" r="3.5" fill="#901a1d" />
            <circle cx="118" cy="58" r="3.5" fill="#901a1d" />
            <circle cx="98" cy="114" r="3.5" fill="#901a1d" />
            <circle cx="34" cy="98" r="3.5" fill="#901a1d" />
            <circle cx="28" cy="48" r="3.5" fill="#901a1d" />
          </svg>
          <div className="hidden sm:flex flex-col gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted-foreground)] pr-2">
            <span className="text-[var(--foreground)] font-semibold">Audit Axes</span>
            <span>· Positioning</span>
            <span>· Typography</span>
            <span>· Recall</span>
            <span className="text-[#901a1d] font-semibold">· Authority</span>
          </div>
        </div>
      );
  }
};

/* ============================================================================
 * SERVICES PAGE (/services)
 * Updraft's "The Forecast Board" -> "The Forge Board: One Studio, Six Disciplines"
 * ========================================================================== */
export const ServicesPage: React.FC<{
  onStartProject: (service?: string) => void;
  onNavigate: (page: PageRoute) => void;
}> = ({ onStartProject, onNavigate }) => {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  return (
    <div className="pb-20">
      {/* SERVICES HERO */}
      <section className="pt-10 pb-12 sm:pt-14 lg:pb-16">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#901a1d] mb-3">
              One Studio, Six Disciplines
            </p>
            <h1 className="font-display text-[clamp(46px,7.5vw,112px)] leading-[0.92] tracking-[-0.035em] text-[var(--foreground)] max-w-[1240px]">
              One studio,{' '}
              <span className="font-editorial italic font-normal text-[#901a1d]">
                six disciplines.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={90}>
            <div className="mt-8 lg:mt-10 pt-8 border-t border-[var(--border)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <p className="lg:col-span-8 max-w-[700px] text-[18px] sm:text-[21px] leading-[1.52] text-[var(--muted-foreground)]">
                <span className="text-[var(--foreground)] font-semibold">
                  Every discipline is delivered with the same commitment:
                </span>{' '}
                original thinking, meticulous vector craft, and designs built to perform across physical and digital mediums.
              </p>
              <div className="lg:col-span-4 flex lg:justify-end">
                <button
                  type="button"
                  onClick={() => onNavigate('/portfolio')}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--panel)] px-5 py-3 text-[13px] font-nav font-semibold text-[var(--foreground)] hover:border-[#901a1d] hover:text-[#901a1d] transition-colors cursor-pointer"
                >
                  <span>Inspect all completed works</span>
                  <ArrowUpRight className="w-4 h-4 text-[#901a1d]" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6-TILE UPDRAFT FORGE BOARD (3x2 Grid of Equal-Height Rounded-3xl Contour Cards) */}
      <section className="py-6 lg:py-10">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {FORGE_SERVICES.map((service, idx) => {
              const isExpanded = expandedSlug === service.slug;
              return (
                <Reveal key={service.num} delay={idx * 70} className="h-full">
                  <article className="group h-full rounded-[28px] border border-[var(--border)] updraft-card-surface p-6 sm:p-7 flex flex-col justify-between shadow-[var(--elev-2)] transition-all duration-300 hover:shadow-[var(--elev-4)] hover:border-[#901a1d]/60">
                    {/* Card Top Content */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border)] font-mono text-[11px] uppercase tracking-[0.12em]">
                        <span className="text-[#901a1d] font-semibold">
                          DF {service.num} · {service.title}
                        </span>
                        <span className="text-[var(--muted-foreground)] tabular-nums">
                          {service.timeline}
                        </span>
                      </div>

                      {/* Fixed-Height Stage: Toggles Between Studio Instrument & Deliverables List */}
                      {isExpanded ? (
                        <div className="h-44 w-full rounded-[20px] border border-[#901a1d]/35 bg-[var(--shell)] p-4 flex flex-col justify-between">
                          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-[#901a1d] pb-2 border-b border-[var(--border)]">
                            <span className="font-semibold">Included Deliverables</span>
                            <span>{service.timeline}</span>
                          </div>
                          <div className="space-y-1.5 my-auto">
                            {service.deliverables.map((item, dIdx) => (
                              <div
                                key={item}
                                className="flex items-center justify-between text-[13px] text-[var(--foreground)]"
                              >
                                <span className="font-medium truncate pr-2">{item}</span>
                                <span className="font-mono text-[10px] text-[#901a1d] font-semibold shrink-0">
                                  0{dIdx + 1}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <ServiceInstrumentGraphic num={service.num} />
                      )}

                      {/* Title & Uniform-Height Description */}
                      <div className="mt-6 flex-1 flex flex-col">
                        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#901a1d]">
                          {service.tagline}
                        </div>
                        <h2 className="mt-1 font-display text-[28px] sm:text-[32px] leading-[1.04] tracking-[-0.025em] text-[var(--foreground)]">
                          {service.title}
                        </h2>
                        <p className="mt-3 text-[15px] leading-[1.6] text-[var(--muted-foreground)] min-h-[96px]">
                          {service.desc}
                        </p>
                      </div>
                    </div>

                    {/* Equal-Height Footer */}
                    <div className="mt-6 pt-4 border-t border-[var(--border)]">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedSlug(isExpanded ? null : service.slug)
                        }
                        aria-expanded={isExpanded}
                        className="w-full flex items-center justify-between text-left font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--foreground)] hover:text-[#901a1d] transition-colors py-1 cursor-pointer"
                      >
                        <span>
                          {isExpanded ? '- Hide deliverables' : '+ Deliverables & specs'}
                        </span>
                        <Plus
                          className={`w-4 h-4 text-[#901a1d] transition-transform duration-200 ${
                            isExpanded ? 'rotate-45' : ''
                          }`}
                        />
                      </button>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => onStartProject(service.title)}
                          className="w-full inline-flex items-center justify-between rounded-full bg-[#141413] dark:bg-white pl-5 pr-2 py-2 text-[13px] font-nav font-semibold text-white dark:text-[#141413] hover:bg-[#901a1d] dark:hover:bg-[#901a1d] dark:hover:text-white transition-colors cursor-pointer"
                        >
                          <span>Commission {service.title}</span>
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#901a1d] text-white">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ============================================================================
 * PORTFOLIO PAGE (/portfolio)
 * Interactive Parting Wall of all 25 projects
 * ========================================================================== */
export const PortfolioPage: React.FC<{
  onSelectProject: (project: ForgeProject) => void;
  onStartProject: (service?: string) => void;
}> = ({ onSelectProject, onStartProject }) => {
  return (
    <div>
      <MomentsPortfolioWall
        onSelectProject={onSelectProject}
        onStartProject={onStartProject}
      />
    </div>
  );
};

/* ============================================================================
 * CONTACT PAGE (/contact)
 * Updraft Rounded-3xl Studio Intake Form + Interactive "Ask Us Anything" DM Inbox
 * ========================================================================== */
export const ContactPage: React.FC<{
  initialService?: string;
}> = ({ initialService = 'Logo Design' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(initialService);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<
    Partial<Record<'name' | 'email' | 'service' | 'message', string>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateProjectBrief({ name, email, service, message });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('https://formspree.io/f/mgozjwpg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          company: company || 'Not specified',
          service,
          message,
          _subject: `New Design Forge Intake: ${service} from ${name}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Formspree submission failed');
      }
    } catch {
      setSubmitError(
        'Unable to send message right now. Please email us directly at designforge250@gmail.com or WhatsApp +91 93183 78900.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pb-16">
      {/* CONTACT HERO */}
      <section className="pt-10 pb-12 sm:pt-14 lg:pb-16">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#901a1d] mb-3">
              Direct Studio Intake · Delhi &amp; Worldwide
            </p>
            <h1 className="font-display text-[clamp(48px,7.8vw,116px)] leading-[0.92] tracking-[-0.035em] text-[var(--foreground)] max-w-[1200px]">
              Let’s forge{' '}
              <span className="font-editorial italic font-normal text-[#901a1d]">
                your brand.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-8 lg:mt-10 pt-8 border-t border-[var(--border)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <p className="lg:col-span-8 max-w-[680px] text-[18px] sm:text-[21px] leading-[1.52] text-[var(--muted-foreground)]">
                Have a project in mind? Share your brief below and our Delhi studio team will respond within 24-48 hours with a tailored scope and timeline.
              </p>
              <div className="lg:col-span-4 flex lg:justify-end">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#901a1d]">
                  {CONTACT_INFO.email}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 12-COLUMN SPLIT: PROJECT BRIEF FORM (LEFT 7) + DIRECT STUDIO LINES (RIGHT 5) */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left 7 Columns: Validated Project Brief Form in Rounded-3xl Contour Card */}
          <div className="lg:col-span-7 rounded-[28px] border border-[var(--border)] updraft-card-surface p-7 sm:p-10 shadow-[var(--elev-2)]">
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#901a1d]">
              Commission Intake
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl text-[var(--foreground)]">
              Tell us what you’re building.
            </h2>

            {submitted ? (
              <div className="mt-8 rounded-[22px] border border-[#901a1d] bg-[var(--secondary)] p-8">
                <div className="flex items-center gap-3 text-[#901a1d]">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <h3 className="font-display text-2xl text-[var(--foreground)]">
                    Message Sent! We’ll get back to you within 24-48 hours.
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  Thank you, <span className="text-[var(--foreground)] font-medium">{name}</span>. Your{' '}
                  <span className="text-[var(--foreground)] font-medium">{service}</span> brief has been logged for our Delhi studio team ({CONTACT_INFO.email}).
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setCompany('');
                    setMessage('');
                  }}
                  className="mt-6 rounded-full bg-[#901a1d] text-white font-nav font-semibold text-[13px] px-6 py-3 cursor-pointer"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted-foreground)]"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--shell)] px-4 py-3 text-base sm:text-sm text-[var(--foreground)] focus:border-[#901a1d] focus:outline-none"
                    />
                    {errors.name && (
                      <p className="mt-1 font-mono text-[11px] text-[#901a1d]">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted-foreground)]"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@company.com"
                      className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--shell)] px-4 py-3 text-base sm:text-sm text-[var(--foreground)] focus:border-[#901a1d] focus:outline-none"
                    />
                    {errors.email && (
                      <p className="mt-1 font-mono text-[11px] text-[#901a1d]">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted-foreground)]"
                    >
                      Company / Brand Name
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Your Company Ltd."
                      className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--shell)] px-4 py-3 text-base sm:text-sm text-[var(--foreground)] focus:border-[#901a1d] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted-foreground)]"
                    >
                      Discipline *
                    </label>
                    <select
                      id="contact-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--shell)] px-4 py-3 text-base sm:text-sm text-[var(--foreground)] focus:border-[#901a1d] focus:outline-none"
                    >
                      {FORGE_SERVICES.map((s) => (
                        <option key={s.num} value={s.title}>
                          {s.num}. {s.title} ({s.timeline})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted-foreground)]"
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project, goals, timeline, and budget..."
                    className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--shell)] p-4 text-base sm:text-sm text-[var(--foreground)] focus:border-[#901a1d] focus:outline-none"
                  />
                  {errors.message && (
                    <p className="mt-1 font-mono text-[11px] text-[#901a1d]">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full inline-flex items-center justify-between rounded-full bg-[#901a1d] pl-6 pr-2 py-2.5 text-[14px] font-nav font-semibold text-white hover:bg-[#141413] disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-[0_12px_28px_rgba(144,26,29,0.22)]"
                >
                  <span>{submitting ? 'Transmitting to Studio...' : 'Send Message'}</span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#141413] text-white group-hover:bg-white group-hover:text-[#141413] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
                {submitError && (
                  <p className="mt-2 font-mono text-[12px] text-[#901a1d] text-center leading-relaxed">
                    {submitError}
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Right 5 Columns: Direct Contact, Working Hours, 24-48h Response */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-[28px] border border-[var(--border)] updraft-card-surface p-7 sm:p-8 shadow-[var(--elev-2)]">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#901a1d]">
                Direct Contact
              </h3>
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
                    Studio Email
                  </span>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="mt-1 inline-block font-mono text-sm text-[var(--foreground)] hover:text-[#901a1d] transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
                    Direct Studio Lines
                  </span>
                  <div className="mt-1.5 space-y-1 font-mono text-xs text-[var(--foreground)]">
                    {CONTACT_INFO.phones.map((phone) => (
                      <div key={phone}>{phone}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-[var(--border)] updraft-card-surface p-7 sm:p-8 shadow-[var(--elev-2)]">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#901a1d]">
                Working Hours
              </h3>
              <div className="mt-4 space-y-2.5 font-mono text-xs">
                {CONTACT_INFO.workingHours.map((row) => (
                  <div
                    key={row.day}
                    className="flex items-center justify-between border-b border-[var(--border)] pb-2.5 last:border-0 last:pb-0"
                  >
                    <span className="text-[var(--muted-foreground)]">{row.day}</span>
                    <span
                      className={
                        row.hours === 'Closed'
                          ? 'text-[#901a1d] font-medium'
                          : 'text-[var(--foreground)]'
                      }
                    >
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[24px] bg-[#901a1d] text-white p-6 shadow-[var(--elev-2)]">
                <div className="font-display text-3xl">24-48h</div>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-white/85">
                  Average Response Time
                </p>
              </div>
              <div className="rounded-[24px] border border-[var(--border)] bg-[var(--panel)] p-6 shadow-[var(--elev-2)]">
                <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted-foreground)]">
                  Based In
                </div>
                <div className="mt-1 font-display text-2xl text-[var(--foreground)]">
                  Delhi, India
                </div>
                <p className="mt-1 font-mono text-[10px] text-[var(--muted-foreground)]">
                  Working Worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPDRAFT "ASK US ANYTHING" STUDIO Q&A INBOX */}
      <FaqSection />
    </div>
  );
};

/* ============================================================================
 * LEGAL PAGES (/terms & /privacy)
 * ========================================================================== */
export const LegalPage: React.FC<{
  type: 'terms' | 'privacy';
  onNavigate: (page: PageRoute) => void;
}> = ({ type, onNavigate }) => {
  const isTerms = type === 'terms';
  return (
    <section className="pt-12 pb-24">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 rounded-[28px] border border-[var(--border)] updraft-card-surface p-8 sm:p-12 shadow-[var(--elev-2)]">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#901a1d]">
            Design Forge Studio · Legal Colophon
          </span>
          <h1 className="mt-4 font-display text-[clamp(40px,5.5vw,76px)] leading-[0.94] tracking-[-0.03em] text-[var(--foreground)]">
            {isTerms ? 'Terms of Service.' : 'Privacy Policy.'}
          </h1>
          <div className="mt-8 space-y-5 text-[16px] leading-[1.65] text-[var(--muted-foreground)]">
            {isTerms ? (
              <>
                <p>
                  All design commissions undertaken by Design Forge (Delhi, India) are governed by a written project scope specifying deliverables, timeline, and revision rounds prior to commencement.
                </p>
                <p>
                  Upon final settlement, full master vector and production rights (AI, EPS, SVG, PDF, PNG) transfer to the client for the commissioned brand identity, print, or digital system.
                </p>
              </>
            ) : (
              <>
                <p>
                  Design Forge respects client confidentiality. Project briefs, contact details, and proprietary brand materials submitted via our intake forms or direct studio email ({CONTACT_INFO.email}) are used strictly to scope and deliver your commission.
                </p>
                <p>
                  We never sell or distribute client contact records to third parties.
                </p>
              </>
            )}
          </div>
          <div className="mt-10">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="rounded-full bg-[#901a1d] text-white font-nav font-semibold text-[13px] px-6 py-3 cursor-pointer"
            >
              ← Return to Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
