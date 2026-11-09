import React, { useState } from 'react';
import {
  CLIENT_TESTIMONIALS,
  FORGE_SERVICES,
  STUDIO_METRICS,
  STUDIO_VALUES,
} from '../data/forgeData';
import { ArrowUpRight } from 'lucide-react';

interface ServicesAndValuesProps {
  onStartProject: (serviceTitle?: string) => void;
}

export const ServicesAndValues: React.FC<ServicesAndValuesProps> = ({
  onStartProject,
}) => {
  const [activeLens, setActiveLens] = useState<'services' | 'values'>('services');

  return (
    <section
      id="services"
      aria-label="Services and studio philosophy"
      className="scroll-mt-20 pt-20 lg:pt-28 pb-8 lg:pb-12"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 grid grid-cols-4 gap-x-4 sm:grid-cols-6 sm:gap-x-6 lg:grid-cols-12">
        {/* Top Hairline Rule */}
        <div className="col-span-full mb-10 lg:mb-14 border-t border-[var(--border)]" />

        {/* Trove Split-Tone Display Heading */}
        <h2 className="font-display text-[clamp(40px,5.6vw,88px)] leading-[0.95] tracking-[-0.03em] col-span-full text-[var(--foreground)] lg:col-span-10">
          Where fire meets precision,{' '}
          <span className="text-[var(--muted-foreground)]">
            <br className="max-lg:hidden" />
            forged to stand the test of time.
          </span>
        </h2>

        {/* Trove Lead Manifesto Paragraph */}
        <p className="text-[19px] leading-[1.45] tracking-[-0.01em] text-[var(--muted-foreground)] sm:text-[22px] col-span-full mt-8 lg:mt-10 lg:max-w-[880px] text-balance">
          Anyone can generate forty generic directions before lunch. Knowing which mark commands authority, and why, didn’t get cheaper.{' '}
          <span className="text-[var(--foreground)]">
            Like skilled blacksmiths transforming raw metal into refined masterpieces, we shape your vision into enduring identities.
          </span>
        </p>

        {/* Full-Width 4-Column Quantitative Proof Strip (Claim-to-Proof Adjacency) */}
        <div
          id="studio"
          className="col-span-full mt-12 grid grid-cols-2 lg:grid-cols-4 border-t border-b border-[var(--border)] divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]"
        >
          {STUDIO_METRICS.map((metric) => (
            <div key={metric.label} className="py-6 sm:px-6 first:pl-0 last:pr-0">
              <div className="font-display text-[clamp(32px,4vw,52px)] leading-none tracking-[-0.03em] text-[var(--foreground)] tabular-nums">
                {metric.value}
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Segmented Control to Inspect Services (6) vs Studio Principles (4) */}
        <div className="col-span-full mt-14 lg:mt-16 flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Switch between Services and Studio Principles"
            className="inline-flex border border-[var(--border)] bg-[var(--panel)] p-1"
          >
            <button
              type="button"
              onClick={() => setActiveLens('services')}
              className={`px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeLens === 'services'
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
            >
              Services We Forge (06)
            </button>
            <button
              type="button"
              onClick={() => setActiveLens('values')}
              className={`px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeLens === 'values'
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
            >
              Studio Principles (04)
            </button>
          </div>

          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
            {activeLens === 'services'
              ? 'From concept to creation · Delhi & Worldwide'
              : '6+ years crafting excellence since day one'}
          </span>
        </div>

        {/* Trove Editorial Subgrid Rows (Exact replica of Trove's "It answers back." / "Nothing to file." rows) */}
        <div className="col-span-full mt-8">
          {activeLens === 'services'
            ? FORGE_SERVICES.map((service) => (
                <div
                  key={service.num}
                  className="grid grid-cols-1 lg:grid-cols-12 items-baseline gap-y-4 border-t border-[var(--border)] py-8 lg:py-10 group"
                >
                  {/* Left 7 Columns: Editorial Number + Display Serif Heading */}
                  <div className="lg:col-span-7 flex items-baseline gap-4">
                    <span className="font-mono text-[12px] text-[var(--muted-foreground)] tabular-nums shrink-0">
                      {service.num}.
                    </span>
                    <div>
                      <h3 className="font-display text-[clamp(28px,3.4vw,52px)] leading-[1] tracking-[-0.03em] text-[var(--foreground)]">
                        {service.title}.
                      </h3>
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--command)]">
                        {service.tagline} · Timeline: {service.timeline}
                      </p>
                    </div>
                  </div>

                  {/* Right 5 Columns: Description + Unboxed Metadata Deliverables + Action */}
                  <div className="lg:col-span-5 lg:col-start-8">
                    <p className="text-[16px] leading-[1.55] text-[var(--muted-foreground)]">
                      <span className="text-[var(--foreground)] font-medium">
                        {service.shortDesc}
                      </span>{' '}
                      {service.desc}
                    </p>

                    {/* Zero-Pill Unboxed Deliverables Metadata with `·` Separators */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-[var(--muted-foreground)]">
                      {service.deliverables.map((item, idx) => (
                        <React.Fragment key={item}>
                          {idx > 0 && <span aria-hidden="true">·</span>}
                          <span>{item}</span>
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="mt-5">
                      <button
                        type="button"
                        onClick={() => onStartProject(service.title)}
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--foreground)] hover:text-[var(--command)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>Start {service.title} project</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : STUDIO_VALUES.map((val) => (
                <div
                  key={val.num}
                  className="grid grid-cols-1 lg:grid-cols-12 items-baseline gap-y-4 border-t border-[var(--border)] py-8 lg:py-10"
                >
                  <div className="lg:col-span-7 flex items-baseline gap-4">
                    <span className="font-mono text-[12px] text-[var(--muted-foreground)] tabular-nums shrink-0">
                      {val.num}.
                    </span>
                    <h3 className="font-display text-[clamp(28px,3.4vw,52px)] leading-[1] tracking-[-0.03em] text-[var(--foreground)]">
                      {val.title}.
                    </h3>
                  </div>
                  <div className="lg:col-span-5 lg:col-start-8">
                    <p className="text-[16px] leading-[1.55] text-[var(--muted-foreground)]">
                      {val.desc}
                    </p>
                  </div>
                </div>
              ))}
        </div>

        {/* Client Voices (3 Testimonials from Design Forge placed adjacent to capability claims) */}
        <div className="col-span-full mt-12 border-t border-[var(--border)] pt-12">
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
              Client voices · 5.0★ verified project feedback
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLIENT_TESTIMONIALS.map((item) => (
              <blockquote
                key={item.id}
                className="flex flex-col justify-between border border-[var(--border)] bg-[var(--panel)] p-6 sm:p-8"
              >
                <div>
                  <div
                    aria-label={`${item.rating} out of 5 stars`}
                    className="font-mono text-xs tracking-widest text-[var(--command)] mb-4"
                  >
                    ★★★★★
                  </div>
                  <p className="font-display text-[19px] leading-[1.38] tracking-[-0.01em] text-[var(--foreground)]">
                    “{item.quote}”
                  </p>
                </div>
                <footer className="mt-6 pt-4 border-t border-[var(--border)]/60 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
                  {item.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
