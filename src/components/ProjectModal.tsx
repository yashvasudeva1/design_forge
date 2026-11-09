import React, { useEffect, useState } from 'react';
import { FORGE_PROJECTS, ForgeProject } from '../data/forgeData';
import { X, ArrowUpRight, ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';

interface ProjectModalProps {
  project: ForgeProject | null;
  onClose: () => void;
  onSelectProject?: (project: ForgeProject) => void;
  onCommissionSimilar: (serviceCategory: string, projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject,
  onCommissionSimilar,
}) => {
  const [imgError, setImgError] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  useEffect(() => {
    setImgError(false);
    setCopiedHex(null);
  }, [project]);

  const currentIdx = project
    ? FORGE_PROJECTS.findIndex((p) => p.id === project.id)
    : -1;

  const handleStep = (delta: number) => {
    if (!onSelectProject || currentIdx === -1) return;
    const nextIdx =
      (currentIdx + delta + FORGE_PROJECTS.length) % FORGE_PROJECTS.length;
    onSelectProject(FORGE_PROJECTS[nextIdx]);
  };

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onSelectProject) handleStep(1);
      if (e.key === 'ArrowLeft' && onSelectProject) handleStep(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!project) return null;

  const handleCopyToken = (hex: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hex).catch(() => {});
    }
    setCopiedHex(hex);
    window.setTimeout(() => setCopiedHex(null), 1600);
  };

  const paletteTokens = [
    project.palette.bg,
    project.palette.fg,
    project.palette.accent,
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-[var(--border)] bg-[var(--panel)] shadow-[var(--elev-5)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar inside Modal (Jakob's Law + Fitts's Law 44px Controls) */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-3.5">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
            <span className="bg-[#901a1d] px-2 py-0.5 text-white font-semibold">
              Specimen
            </span>
            <span>{project.specimenCode}</span>
            {currentIdx !== -1 && (
              <span className="hidden sm:inline text-[var(--muted-foreground)]/70 tabular-nums">
                · {currentIdx + 1} of {FORGE_PROJECTS.length}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onSelectProject && (
              <>
                <button
                  type="button"
                  onClick={() => handleStep(-1)}
                  aria-label="Previous project specimen"
                  className="flex h-11 w-11 items-center justify-center border border-[var(--border)] text-[var(--foreground)] hover:border-[#901a1d] hover:text-[#901a1d] transition-colors duration-150 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleStep(1)}
                  aria-label="Next project specimen"
                  className="flex h-11 w-11 items-center justify-center border border-[var(--border)] text-[var(--foreground)] hover:border-[#901a1d] hover:text-[#901a1d] transition-colors duration-150 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="flex h-11 w-11 items-center justify-center border border-[var(--border)] text-[var(--foreground)] hover:border-[#901a1d] hover:bg-[#901a1d] hover:text-white transition-colors duration-150 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: 2-Column Split */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left 7 Columns: Artwork Container + Interactive Color Token Bar */}
          <div className="md:col-span-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[var(--border)] bg-[#070707]">
            <div
              className="flex-1 flex items-center justify-center p-6 sm:p-10 min-h-[280px] md:min-h-[400px]"
              style={{ backgroundColor: project.palette.bg }}
            >
              {!imgError ? (
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="max-h-[400px] w-auto object-contain shadow-xl"
                />
              ) : (
                <div
                  className="w-full p-8 border border-white/15"
                  style={{ color: project.palette.fg }}
                >
                  <p className="font-mono text-xs uppercase tracking-widest opacity-70">
                    {project.specimenCode}
                  </p>
                  <p className="mt-3 font-display text-4xl">{project.title}</p>
                  <p className="mt-2 text-sm opacity-80">{project.desc}</p>
                </div>
              )}
            </div>

            {/* Feedback Loop: Interactive Click-to-Copy Chromatic Palette Strip */}
            <div className="border-t border-white/15 bg-[#0a0a0a] px-5 py-3 flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                Chromatic Tokens · Click to copy
              </span>
              <div className="flex items-center gap-2">
                {paletteTokens.map((hex, i) => {
                  const isCopied = copiedHex === hex;
                  return (
                    <button
                      key={`${hex}-${i}`}
                      type="button"
                      onClick={() => handleCopyToken(hex)}
                      className="inline-flex items-center gap-1.5 border border-white/20 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-white hover:border-[#901a1d] transition-colors duration-150 cursor-pointer"
                    >
                      <span
                        className="inline-block w-3 h-3 border border-white/30"
                        style={{ backgroundColor: hex }}
                      />
                      <span>{isCopied ? 'Copied!' : hex}</span>
                      {isCopied ? (
                        <Check className="w-3 h-3 text-[#901a1d]" />
                      ) : (
                        <Copy className="w-2.5 h-2.5 text-white/50" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Metadata & Deliverables */}
          <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#901a1d]">
                {project.category} · {project.client}
              </div>

              <h2
                id="modal-project-title"
                className="mt-2 font-display text-3xl sm:text-4xl leading-[1.02] tracking-[-0.02em] text-[var(--foreground)]"
              >
                {project.title}
              </h2>

              <p className="mt-4 text-[15px] leading-[1.6] text-[var(--muted-foreground)]">
                {project.desc}
              </p>

              {/* Client & Duration Metadata (Law of Proximity & Common Region) */}
              <div className="mt-6 grid grid-cols-2 gap-4 border-y border-[var(--border)] py-4">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
                    Client
                  </span>
                  <span className="mt-1 block text-sm font-medium text-[var(--foreground)]">
                    {project.client}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
                    Turnaround
                  </span>
                  <span className="mt-1 block text-sm font-medium text-[var(--foreground)] tabular-nums">
                    {project.duration}
                  </span>
                </div>
              </div>

              {/* Miller's Law: 4 Chunked Deliverables */}
              <div className="mt-6">
                <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[#901a1d]">
                  Delivered Scope (0{project.what.length})
                </span>
                <ul className="mt-3 space-y-2 text-sm text-[var(--foreground)]">
                  {project.what.map((item, idx) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="font-mono text-xs text-[#901a1d] font-semibold tabular-nums"
                      >
                        0{idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[var(--border)]">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onCommissionSimilar(project.category, project.title);
                }}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 bg-[#901a1d] text-white font-nav font-bold text-[12px] uppercase tracking-[0.14em] px-5 py-3.5 hover:bg-black dark:hover:bg-white dark:hover:text-black transition-colors duration-150 cursor-pointer"
              >
                <span>Commission similar work</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
