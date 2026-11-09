import React, { useState, useMemo } from 'react';
import {
  FORGE_PROJECTS,
  ForgeProject,
  PROJECT_CATEGORIES,
  ProjectCategory,
} from '../data/forgeData';
import {
  distributeIntoMasonryLanes,
  filterProjects,
  getCategoryCounts,
} from '../utils/archiveLogic';
import { RotateCcw } from 'lucide-react';

interface MasonryArchiveProps {
  onSelectProject: (project: ForgeProject) => void;
  defaultExpanded?: boolean;
  hideSectionHeading?: boolean;
  onViewFullPortfolio?: () => void;
}

const ASPECT_HEIGHT_CLASSES: Record<ForgeProject['aspect'], string> = {
  tall: 'aspect-[3/4]',
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  wide: 'aspect-[5/4]',
};

const ProjectTile: React.FC<{
  project: ForgeProject;
  onSelect: (project: ForgeProject) => void;
}> = ({ project, onSelect }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative flex flex-col bg-transparent p-0">
      <div
        className={`relative w-full overflow-hidden bg-[var(--muted)] border border-[var(--border)]/60 ${
          ASPECT_HEIGHT_CLASSES[project.aspect]
        }`}
        style={{ backgroundColor: project.palette.bg }}
      >
        {!imgError ? (
          <img
            src={project.image}
            alt={`${project.title} - ${project.desc}`}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          /* Zero-Broken-Image Policy: Bespoke architectural specimen fallback */
          <div
            className="flex h-full w-full flex-col justify-between p-5 select-none"
            style={{
              backgroundColor: project.palette.bg,
              color: project.palette.fg,
            }}
          >
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.08em] opacity-70">
              <span>{project.specimenCode}</span>
              <span>{project.duration}</span>
            </div>
            <div className="my-auto py-4">
              <div
                className="mb-3 h-0.5 w-8"
                style={{ backgroundColor: project.palette.accent }}
              />
              <p className="font-display text-2xl leading-tight tracking-[-0.02em]">
                {project.title}
              </p>
              <p className="mt-2 text-xs leading-relaxed opacity-75 line-clamp-3">
                {project.desc}
              </p>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] opacity-60">
              {project.client} · {project.category}
            </div>
          </div>
        )}

        {/* Subtle bottom-left source/client tag */}
        <span className="pointer-events-none absolute bottom-2 left-2 z-20 inline-flex max-w-[calc(100%-1rem)] items-center gap-1.5 bg-black/75 px-2 py-1 font-mono text-[10px] leading-none text-white/90 backdrop-blur-[2px] opacity-90 group-hover:opacity-100 transition-opacity truncate">
          {project.client.toLowerCase().replace(/\s+/g, '')} · {project.category.toLowerCase()}
        </span>

        {/* Full-card accessible interactive trigger */}
        <button
          type="button"
          onClick={() => onSelect(project)}
          aria-label={`Inspect ${project.title} (${project.category} for ${project.client}): ${project.desc}`}
          className="absolute inset-0 z-10 cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--foreground)] focus-visible:outline-none"
        />
      </div>
    </div>
  );
};

export const MasonryArchive: React.FC<MasonryArchiveProps> = ({
  onSelectProject,
  defaultExpanded = false,
  hideSectionHeading = false,
  onViewFullPortfolio,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const counts = useMemo(() => getCategoryCounts(FORGE_PROJECTS), []);

  const filteredProjects = useMemo(
    () =>
      filterProjects(FORGE_PROJECTS, {
        category: selectedCategory,
        query: '',
        activeQuestId: null,
      }),
    [selectedCategory]
  );

  // Distribute into 5 lanes for desktop (matching Trove's 5-lane masonry)
  const lanes5 = useMemo(
    () => distributeIntoMasonryLanes(filteredProjects, 5),
    [filteredProjects]
  );

  // Distribute into 2 lanes for mobile/tablet
  const lanes2 = useMemo(
    () => distributeIntoMasonryLanes(filteredProjects, 2),
    [filteredProjects]
  );

  const handleResetFilters = () => {
    setSelectedCategory('All');
  };

  const hasActiveFilter = selectedCategory !== 'All';

  return (
    <section
      id="archive"
      aria-label="Selected work archive"
      className={`scroll-mt-20 ${hideSectionHeading ? 'pt-6 lg:pt-8' : 'pt-16 lg:pt-24'} pb-8 lg:pb-12`}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 grid grid-cols-4 gap-x-4 sm:grid-cols-6 sm:gap-x-6 lg:grid-cols-12">
        {/* Top Hairline Rule */}
        <div className="col-span-full mb-10 lg:mb-14 border-t border-[var(--border)]" />

        {!hideSectionHeading && (
          <>
            {/* Trove Split-Tone Display Heading */}
            <div className="col-span-full lg:col-span-8">
              <h2 className="font-display text-[clamp(40px,5.6vw,88px)] leading-[0.95] tracking-[-0.03em] text-[var(--foreground)] text-balance">
                Say what you’re forging.{' '}
                <span className="text-[#901a1d]">The archive answers.</span>
              </h2>
            </div>

            {/* Right-aligned Archive Counter & Expand Toggle */}
            <div className="col-span-full mt-6 lg:col-span-4 lg:mt-0 lg:self-end flex lg:justify-end">
              <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--muted-foreground)] whitespace-nowrap">
                <span className="tabular-nums whitespace-nowrap shrink-0">
                  Showing {filteredProjects.length} of {FORGE_PROJECTS.length} works
                </span>
                <button
                  type="button"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="underline underline-offset-4 hover:text-[var(--foreground)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {isExpanded ? 'Collapse view' : 'Expand full archive'}
                </button>
                {onViewFullPortfolio && (
                  <button
                    type="button"
                    onClick={onViewFullPortfolio}
                    className="text-[#901a1d] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Interactive Portfolio Wall →
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {/* Category Filter Bar */}
        <div className="col-span-full mt-8 flex flex-wrap items-center justify-between gap-3">
          <div
            role="group"
            aria-label="Filter projects by discipline"
            className="flex flex-wrap items-center gap-1.5"
          >
            {PROJECT_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                    active
                      ? 'bg-[#901a1d] text-white border-[#901a1d]'
                      : 'bg-[var(--panel)] text-[var(--muted-foreground)] border-[var(--border)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {category}{' '}
                  <span className="opacity-60 tabular-nums">{counts[category]}</span>
                </button>
              );
            })}
          </div>

          {hasActiveFilter && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#901a1d] bg-[var(--command-bg)] hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filter</span>
            </button>
          )}
        </div>

        {/* Masonry Container */}
        <div className="col-span-full mt-8 lg:mt-10">
          <div
            className={`relative overflow-hidden transition-all duration-500 ${
              isExpanded || filteredProjects.length <= 10
                ? 'max-h-[4200px]'
                : 'max-h-[860px] masonry-fade-mask'
            }`}
          >
            {/* Desktop 5-Lane Masonry Grid */}
            <div
              data-testid="masonry-grid-desktop"
              className="hidden lg:flex gap-3.5"
            >
              {lanes5.map((lane, laneIdx) => (
                <div
                  key={laneIdx}
                  className="flex min-w-0 flex-1 flex-col gap-3.5"
                >
                  {lane.map((project) => (
                    <ProjectTile
                      key={project.id}
                      project={project}
                      onSelect={onSelectProject}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Mobile / Tablet 2-Lane Masonry Grid */}
            <div className="flex lg:hidden gap-2.5 sm:gap-3.5">
              {lanes2.map((lane, laneIdx) => (
                <div
                  key={laneIdx}
                  className="flex min-w-0 flex-1 flex-col gap-2.5 sm:gap-3.5"
                >
                  {lane.map((project) => (
                    <ProjectTile
                      key={project.id}
                      project={project}
                      onSelect={onSelectProject}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {onViewFullPortfolio && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={onViewFullPortfolio}
                className="bg-[#901a1d] text-white font-mono text-[11px] uppercase tracking-[0.08em] px-6 py-3 hover:bg-black dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
              >
                Explore Interactive Portfolio Wall (25 Works) →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
