/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar, ForgeMark } from './components/Navbar';
import { ProcessDeck } from './components/ProcessDeck';
import { ClientLogosMarquee } from './components/ClientLogosMarquee';
import { ProjectModal } from './components/ProjectModal';
import { BriefModal } from './components/BriefModal';
import { TroveFooter, PageRoute } from './components/TroveFooter';
import { Reveal } from './components/Reveal';
import {
  AboutPage,
  ServicesPage,
  PortfolioPage,
  ContactPage,
  LegalPage,
} from './components/MultipageViews';
import {
  CLIENT_TESTIMONIALS,
  FORGE_PROJECTS,
  ForgeProject,
} from './data/forgeData';
import { ArrowUpRight } from 'lucide-react';

function resolvePathToRoute(pathname: string): PageRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (
    clean === '/' ||
    clean === '/about' ||
    clean === '/services' ||
    clean === '/portfolio' ||
    clean === '/contact' ||
    clean === '/terms' ||
    clean === '/privacy'
  ) {
    return clean;
  }
  return '/';
}

const CURATED_COLUMN_IDS: number[][] = [
  [8, 7],    // Col 1: Elysium Logo, Personalised Gifts Mockup
  [6, 9],    // Col 2: Safdurjung Photowalk, Research Poster
  [10, 20],  // Col 3: Cirola Pamphlet, Education Poster
  [11, 15],  // Col 4: Aggarwal PG, Oh Wow Gifts Logo
  [5, 12],   // Col 5: Namespace T-Shirt Designs, Darima Cheese
];

const COLUMN_OFFSETS = [
  'lg:mt-20',
  'lg:mt-10',
  'lg:mt-0',
  'lg:-mt-24',
  'lg:-mt-52',
];

const CARD_HEIGHTS: Record<number, string> = {
  8: 'h-[340px] sm:h-[370px]',
  7: 'h-[290px] sm:h-[310px]',
  6: 'h-[350px] sm:h-[380px]',
  9: 'h-[300px] sm:h-[320px]',
  10: 'h-[350px] sm:h-[380px]',
  20: 'h-[310px] sm:h-[330px]',
  11: 'h-[300px] sm:h-[320px]',
  15: 'h-[320px] sm:h-[350px]',
  5: 'h-[340px] sm:h-[370px]',
  12: 'h-[340px] sm:h-[370px]',
  2: 'h-[310px] sm:h-[330px]',
  3: 'h-[310px] sm:h-[330px]',
  26: 'h-[320px] sm:h-[350px]',
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() =>
    resolvePathToRoute(window.location.pathname)
  );
  const [selectedProject, setSelectedProject] = useState<ForgeProject | null>(null);
  const [briefModalOpen, setBriefModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>('Logo Design');
  const [initialBriefNote, setInitialBriefNote] = useState<string>('');
  const [isDark, setIsDark] = useState(false);

  const curatedColumns = useMemo(() => {
    return CURATED_COLUMN_IDS.map((colIds) =>
      colIds
        .map((id) => FORGE_PROJECTS.find((p) => p.id === id))
        .filter((p): p is ForgeProject => Boolean(p))
    );
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const titles: Record<PageRoute, string> = {
      '/': 'Design Forge: Visual Identity & Logo Design Studio',
      '/about': 'About Studio · Philosophy & Vector Craft | Design Forge',
      '/services': 'Design Services: Logos, Brand Identity, UI/UX & Print | Design Forge',
      '/portfolio': 'Portfolio Archive · Curated Works & Real-World Mockups | Design Forge',
      '/contact': 'Start a Project · Commission Custom Brand Identity | Design Forge',
      '/terms': 'Terms of Service | Design Forge',
      '/privacy': 'Privacy Policy | Design Forge',
    };
    document.title = titles[currentPage] || 'Design Forge: Visual Identity & Logo Design Studio';
  }, [currentPage]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(resolvePathToRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: PageRoute) => {
    if (window.location.pathname !== page) {
      window.history.pushState({}, '', page);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartProject = (service?: string, note?: string) => {
    if (service) setPreselectedService(service);
    setInitialBriefNote(note || '');
    setBriefModalOpen(true);
  };

  const handleCommissionSimilar = (category: string, projectTitle: string) => {
    const categoryToService: Record<string, string> = {
      Logos: 'Logo Design',
      Branding: 'Brand Identity',
      Digital: 'Social Media Design',
      Print: 'Poster & Print',
      Certificates: 'Poster & Print',
    };
    const mappedService = categoryToService[category] || 'Brand Identity';
    handleStartProject(
      mappedService,
      `Interested in commissioning a ${category.toLowerCase()} project similar to "${projectTitle}".`
    );
  };

  return (
    <div className="min-h-screen bg-[var(--shell)] text-[var(--foreground)] transition-colors duration-200 flex flex-col justify-between">
      <div>
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onStartProject={(service) => handleStartProject(service)}
        />

        <main key={currentPage} className="animate-page-enter">
          {currentPage === '/' && (
            <>
              {/* ================================================================
               * SECTION 1: UPDRAFT HERO + RISING 5-COLUMN CURATED WORKS GRID
               * (No Eyebrow Above Headline; Rising Staggered Cards Alongside Hero)
               * ================================================================ */}
              <section
                aria-label="Design Forge Studio Hero and Selected Works"
                className="pt-8 sm:pt-12 lg:pt-16 pb-20 lg:pb-28 overflow-hidden"
              >
                <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
                  {/* Top-Left Hero Proposition (Columns 1-3 width on Desktop so Columns 4-5 can rise beside it) */}
                  <div className="relative z-10 max-w-[760px]">
                    <Reveal>
                      <h1 className="font-display text-[clamp(46px,6.4vw,92px)] leading-[0.94] tracking-[-0.035em] text-[var(--foreground)]">
                        We forge brands that{' '}
                        <span className="font-editorial italic font-normal text-[#901a1d]">
                          ignite
                        </span>{' '}
                        and endure.
                      </h1>
                    </Reveal>

                    <Reveal delay={90}>
                      <p className="mt-6 max-w-[540px] text-[17px] sm:text-[19px] leading-[1.55] text-[var(--muted-foreground)]">
                        <span className="text-[var(--foreground)] font-semibold">
                          Visual identity, tempered with creative fire and precision.
                        </span>{' '}
                        Design Forge is a Delhi graphic design studio shaping unmistakable logos, cohesive brand systems, tactile print collateral, and digital experiences built to last.
                      </p>

                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        <button
                          type="button"
                          onClick={() => handleStartProject('Brand Identity')}
                          className="group inline-flex items-center gap-3 rounded-full bg-[#141413] dark:bg-white pl-6 pr-2 py-2 text-[14px] font-nav font-semibold text-white dark:text-[#141413] hover:bg-[#901a1d] dark:hover:bg-[#901a1d] dark:hover:text-white transition-colors duration-200 cursor-pointer shadow-[0_12px_28px_rgba(20,20,19,0.16)]"
                        >
                          <span>Start a project</span>
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#901a1d] text-white group-hover:bg-white group-hover:text-[#141413] transition-transform duration-200 group-hover:translate-x-0.5">
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleNavigate('/portfolio')}
                          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--panel)]/80 px-6 py-3.5 text-[14px] font-nav font-semibold text-[var(--foreground)] hover:border-[#901a1d] hover:text-[#901a1d] transition-colors duration-200 cursor-pointer"
                        >
                          <span>Explore Portfolio</span>
                          <ArrowUpRight className="w-4 h-4 text-[#901a1d]" />
                        </button>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
                        <span className="inline-flex items-center gap-2 text-[var(--foreground)] font-medium">
                          <ForgeMark className="w-4 h-4" />
                          <span>Delhi, India</span>
                        </span>
                        <span>·</span>
                        <span>No templates. Just craft.</span>
                        <span>·</span>
                        <span className="text-[#901a1d] font-semibold">10 Curated Works Below</span>
                      </div>

                      {/* Prominent Tip of the Iceberg Callout */}
                      <div className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-[#901a1d]/30 bg-[#901a1d]/[0.07] px-4 py-2 font-mono text-[11px] text-[var(--foreground)] shadow-sm">
                        <span className="h-2 w-2 rounded-full bg-[#901a1d] animate-pulse" />
                        <span className="font-semibold text-[#901a1d] uppercase tracking-[0.12em]">
                          Tip of the iceberg:
                        </span>
                        <span className="text-[var(--muted-foreground)]">
                          This curated exhibition is just the tip of the iceberg — 150+ bespoke brand systems &amp; marks delivered.
                        </span>
                      </div>
                    </Reveal>
                  </div>

                  {/* Rising 5-Column Staggered Curated Showcase Grid (Updraft Layout) */}
                  <div className="mt-12 sm:mt-14 lg:mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 items-start">
                    {curatedColumns.map((colProjects, colIdx) => (
                      <div
                        key={`col-${colIdx}`}
                        className={`flex flex-col gap-4 sm:gap-5 ${COLUMN_OFFSETS[colIdx] || ''}`}
                      >
                        {colProjects.map((project, cardIdx) => {
                          const heightClass =
                            CARD_HEIGHTS[project.id] || 'h-[320px] sm:h-[350px]';
                          return (
                            <Reveal
                              key={project.id}
                              delay={colIdx * 70 + cardIdx * 90}
                            >
                              <article
                                onClick={() => setSelectedProject(project)}
                                className={`group relative w-full ${heightClass} rounded-[26px] overflow-hidden border border-[var(--border)] bg-[#141413] shadow-[var(--elev-3)] cursor-pointer select-none transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--elev-5)] hover:border-[#901a1d]/60`}
                              >
                                <img
                                  src={project.image}
                                  alt={`${project.title} - ${project.client}`}
                                  loading="lazy"
                                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />

                                {/* Warm Studio Gradient Scrim */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 transition-opacity duration-300 group-hover:from-black/90" />

                                {/* Top Metadata Row & Action Circle */}
                                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/85 drop-shadow">
                                    {project.specimenCode}
                                  </span>
                                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#141413] shadow-md transition-all duration-300 group-hover:bg-[#901a1d] group-hover:text-white group-hover:scale-105">
                                    <ArrowUpRight className="w-4 h-4" />
                                  </span>
                                </div>

                                {/* Bottom Editorial Overlay Title */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/75">
                                    {project.category} · {project.client}
                                  </div>
                                  <h2 className="mt-1 font-display text-[22px] sm:text-[24px] leading-[1.08] tracking-[-0.025em] text-white">
                                    {project.title}
                                  </h2>
                                  <p className="mt-1.5 text-[12px] leading-[1.45] text-white/75 line-clamp-2">
                                    {project.desc}
                                  </p>
                                </div>
                              </article>
                            </Reveal>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ================================================================
               * SECTION 2: STUDIO INDEX BAR & CLIENT LOGOS ON BLACK OBSIDIAN
               * ================================================================ */}
              <Reveal>
                <ClientLogosMarquee />
              </Reveal>

              {/* ================================================================
               * SECTION 3: THE EDITORIAL ("WHAT WE BELIEVE" MANIFESTO)
               * ================================================================ */}
              <section
                aria-label="What we believe"
                className="py-16 lg:py-24 border-b border-[var(--border)]"
              >
                <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
                  <Reveal>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                      {/* Left 3 Columns: Editorial Kicker */}
                      <div className="lg:col-span-3">
                        <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#901a1d]">
                          The Editorial
                        </p>
                        <p className="mt-1.5 font-editorial italic text-[18px] text-[var(--muted-foreground)]">
                          What we believe
                        </p>
                      </div>

                      {/* Right 9 Columns: Highlighted Editorial Manifesto */}
                      <div className="lg:col-span-9">
                        <p className="font-display text-[clamp(26px,3.3vw,46px)] leading-[1.22] tracking-[-0.025em] text-[var(--foreground)]">
                          Template marketplaces hand you generic logos anyone can generate before lunch. We believe{' '}
                          <span className="updraft-marker font-editorial italic font-normal">
                            great design is forged, not found.
                          </span>{' '}
                          Like skilled blacksmiths transforming raw metal into refined marks, we combine{' '}
                          <span className="updraft-marker">
                            creative fire and Swiss precision
                          </span>{' '}
                          to build custom vector geometry, tactile print collateral, and cohesive brand systems that{' '}
                          <span className="font-editorial italic font-normal text-[#901a1d]">
                            command authority
                          </span>{' '}
                          in the real world.
                        </p>

                        {/* Studio Signature Footer with Actual Uploaded Brand Logo Lockup */}
                        <div className="mt-10 pt-8 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-6">
                          <div className="flex items-center gap-4">
                            <div className="rounded-2xl bg-white border border-black/10 px-4 py-2.5 shadow-sm">
                              <img
                                src="/assets/aistudio/Design_Forge_Brand_Kit_fb5ce520.png"
                                alt="Design Forge - Forging Ideas Into Reality"
                                className="h-8 sm:h-9 w-auto object-contain"
                                draggable={false}
                              />
                            </div>
                            <div className="hidden sm:block">
                              <div className="font-editorial italic text-[18px] leading-none text-[var(--foreground)]">
                                Signed, Design Forge
                              </div>
                              <div className="mt-1 text-[12px] text-[var(--muted-foreground)]">
                                Delhi, India · Independent Brand Studio
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleNavigate('/services')}
                              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--panel)] px-5 py-2.5 text-[13px] font-nav font-semibold text-[var(--foreground)] hover:border-[#901a1d] hover:text-[#901a1d] transition-colors cursor-pointer"
                            >
                              <span>Explore six studio disciplines</span>
                              <ArrowUpRight className="w-4 h-4 text-[#901a1d]" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleNavigate('/about')}
                              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-nav font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                            >
                              <span>Read our story →</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </section>

              {/* ================================================================
               * SECTION 4: HOW IT WORKS (SCROLL MORPH DECK)
               * ================================================================ */}
              <ProcessDeck
                onStartProject={(service) => handleStartProject(service)}
              />

              {/* ================================================================
               * SECTION 5: CLIENT VOICES (UPDRAFT CONTOUR CARDS)
               * ================================================================ */}
              <section
                aria-label="Client testimonials"
                className="pt-16 lg:pt-24 pb-20 lg:pb-28 border-t border-[var(--border)]"
              >
                <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
                  <Reveal>
                    <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
                      <div>
                        <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#901a1d]">
                          Client Voices
                        </p>
                        <h2 className="mt-2 font-display text-[clamp(36px,4.6vw,68px)] leading-[0.95] tracking-[-0.03em] text-[var(--foreground)]">
                          Enduring partnerships,{' '}
                          <span className="font-editorial italic font-normal text-[#901a1d]">
                            measured
                          </span>{' '}
                          in impact.
                        </h2>
                      </div>
                      <span className="text-[13px] font-medium text-[var(--muted-foreground)]">
                        95% Client Retention · 5.0★ Verified Reviews
                      </span>
                    </div>
                  </Reveal>

                  {/* 3-Column Updraft Contour Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {CLIENT_TESTIMONIALS.map((item, idx) => (
                      <Reveal key={item.id} delay={idx * 90}>
                        <blockquote className="h-full rounded-[28px] border border-[var(--border)] updraft-card-surface p-7 sm:p-9 flex flex-col justify-between shadow-[var(--elev-2)] forge-hover-lift hover:border-[#901a1d]/50">
                          <div>
                            <div className="flex items-center justify-between pb-5 mb-6 border-b border-[var(--border)] text-[12px] font-medium">
                              <span className="text-[var(--muted-foreground)]">
                                Verified Commission 0{idx + 1}
                              </span>
                              <span
                                aria-label={`${item.rating} out of 5 stars`}
                                className="tracking-widest text-[#901a1d]"
                              >
                                ★★★★★
                              </span>
                            </div>
                            <p className="font-display text-[21px] sm:text-[23px] leading-[1.35] tracking-[-0.02em] text-[var(--foreground)]">
                              “{item.quote}”
                            </p>
                          </div>
                          <footer className="mt-8 pt-4 border-t border-[var(--border)] flex items-center justify-between text-[13px] text-[var(--muted-foreground)]">
                            <span className="text-[var(--foreground)] font-semibold">{item.role}</span>
                            <span className="font-editorial italic text-[#901a1d]">Delhi Studio</span>
                          </footer>
                        </blockquote>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          {currentPage === '/about' && (
            <AboutPage
              onStartProject={(service) => handleStartProject(service)}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === '/services' && (
            <ServicesPage
              onStartProject={(service) => handleStartProject(service)}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === '/portfolio' && (
            <PortfolioPage
              onSelectProject={(project) => setSelectedProject(project)}
              onStartProject={(service) => handleStartProject(service)}
            />
          )}

          {currentPage === '/contact' && (
            <ContactPage initialService={preselectedService} />
          )}

          {currentPage === '/terms' && (
            <LegalPage type="terms" onNavigate={handleNavigate} />
          )}

          {currentPage === '/privacy' && (
            <LegalPage type="privacy" onNavigate={handleNavigate} />
          )}
        </main>
      </div>

      {/* DESIGN FORGE BLIND-DEBOSSED FULL-BLEED FOOTER */}
      <TroveFooter
        isDark={isDark}
        onToggleDark={() => setIsDark((prev) => !prev)}
        onNavigate={handleNavigate}
        onStartProject={() => handleStartProject()}
      />

      {/* MODALS */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onCommissionSimilar={handleCommissionSimilar}
      />

      <BriefModal
        isOpen={briefModalOpen}
        initialService={preselectedService}
        initialNote={initialBriefNote}
        onClose={() => setBriefModalOpen(false)}
      />
    </div>
  );
}
