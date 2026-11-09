import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import {
  FORGE_PROJECTS,
  ForgeProject,
  PROJECT_CATEGORIES,
  ProjectCategory,
} from '../data/forgeData';
import {
  buildMomentsWallGrid,
  getNumericAspect,
  MomentsWallCell,
  smoothstep,
} from '../utils/archiveLogic';
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Share2,
  X,
} from 'lucide-react';

interface MomentsPortfolioWallProps {
  onSelectProject: (project: ForgeProject) => void;
  onStartProject: (service?: string) => void;
}

/* ============================================================================
 * WALL CELL LAYER (25 Unique Large-Scale Project Cards, Zero Duplicates)
 * ========================================================================== */
const WallCellsLayer = memo(function WallCellsLayer({
  cells,
  projects,
  itemsRef,
  onSelectCell,
}: {
  cells: MomentsWallCell[];
  projects: ForgeProject[];
  itemsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  onSelectCell: (cellIndex: number) => void;
}) {
  return (
    <>
      {cells.map((cell, idx) => {
        const project = projects[cell.photoIndex] || projects[0];
        return (
          <div
            key={`${project.id}-${cell.index}`}
            ref={(el) => {
              itemsRef.current[idx] = el;
            }}
            onClick={() => onSelectCell(idx)}
            className="group absolute left-0 top-0 select-none overflow-hidden rounded-[6px] pointer-events-auto cursor-pointer will-change-transform origin-center [backface-visibility:hidden] border border-white/20 hover:border-[#901a1d] bg-[#0d0d0d] transition-colors"
            style={{
              width: cell.width,
              height: cell.height,
              opacity: 0,
              boxShadow: '0 22px 48px -14px rgba(0, 0, 0, 0.78)',
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              draggable={false}
              decoding="async"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
              className="relative z-10 h-full w-full select-none object-cover bg-[#0d0d0d] transition-transform duration-500 group-hover:scale-[1.04]"
            />
            {/* Bottom caption bar on every large wall card */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-3"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.48) 65%, transparent 100%)',
              }}
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#901a1d] font-semibold">
                {project.category} · {project.specimenCode}
              </div>
              <div className="mt-0.5 truncate font-display text-[15px] leading-tight text-white">
                {project.title}
              </div>
            </div>
            {/* Architectural fallback under image in case of error */}
            <div className="absolute inset-0 z-0 flex flex-col justify-between p-3 bg-[#0d0d0d] text-white">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#901a1d]">
                {project.specimenCode}
              </span>
              <span className="font-display text-sm leading-tight truncate">
                {project.title}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
});

/* ============================================================================
 * FEATURED CENTER CARD (Large-Format Specimen Card in Black/White/#901A1D)
 * ========================================================================== */
const FeaturedMomentCard: React.FC<{
  project: ForgeProject;
  expanded: boolean;
  isMobile: boolean;
  liked: boolean;
  saved: boolean;
  copiedNotice: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onToggleLike: () => void;
  onToggleSave: () => void;
  onShare: () => void;
  onInspectFull: () => void;
  onCommission: () => void;
}> = ({
  project,
  expanded,
  isMobile,
  liked,
  saved,
  copiedNotice,
  onOpen,
  onClose,
  onNext,
  onPrev,
  onToggleLike,
  onToggleSave,
  onShare,
  onInspectFull,
  onCommission,
}) => {
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    setImgErr(false);
  }, [project.id]);

  const numericAspect = getNumericAspect(project.aspect);
  const baseH = isMobile ? 240 : 340;
  const maxCollapsedW = isMobile ? Math.min(290, typeof window !== 'undefined' ? window.innerWidth - 32 : 290) : 470;
  const expH = isMobile ? 290 : 430;
  const maxExpW = isMobile ? Math.min(320, typeof window !== 'undefined' ? window.innerWidth - 28 : 320) : 560;
  const minExpW = isMobile ? Math.min(260, typeof window !== 'undefined' ? window.innerWidth - 48 : 260) : 390;

  const targetH = expanded ? expH : baseH;
  const maxW = expanded ? maxExpW : maxCollapsedW;
  let cardW = targetH * numericAspect;
  let cardH = targetH;

  if (cardW > maxW) {
    cardW = maxW;
    cardH = maxW / numericAspect;
  } else if (expanded && cardW < minExpW) {
    cardW = minExpW;
    cardH = minExpW / numericAspect;
  }

  const iconBtnClass =
    'flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/75 text-white/90 backdrop-blur-md hover:bg-[#901a1d] hover:border-[#901a1d] hover:text-white transition-colors cursor-pointer';

  const LikeBtn = (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggleLike();
      }}
      className={`${iconBtnClass} ${liked ? 'bg-[#901a1d] border-[#901a1d] text-white' : ''}`}
      aria-label={liked ? 'Remove like' : 'Like project'}
      aria-pressed={liked}
    >
      <Heart className="size-4" fill={liked ? 'currentColor' : 'none'} />
    </button>
  );

  const SaveBtn = (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggleSave();
      }}
      className={`${iconBtnClass} ${saved ? 'bg-[#901a1d] border-[#901a1d] text-white' : ''}`}
      aria-label={saved ? 'Remove from saved' : 'Save project'}
      aria-pressed={saved}
    >
      <Bookmark className="size-4" fill={saved ? 'currentColor' : 'none'} />
    </button>
  );

  const ShareBtn = (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onShare();
      }}
      className={iconBtnClass}
      aria-label="Share project link"
      title={copiedNotice ? 'Copied!' : 'Share'}
    >
      <Share2 className="size-4" />
    </button>
  );

  const InspectBtn = (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onInspectFull();
      }}
      className={iconBtnClass}
      aria-label="Inspect full project specifications"
      title="Inspect full specimen"
    >
      <Eye className="size-4" />
    </button>
  );

  const CloseBtn = (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className={iconBtnClass}
      aria-label="Close centered view"
    >
      <X className="size-4" />
    </button>
  );

  return (
    <div
      className={`pointer-events-auto absolute ${!expanded ? 'cursor-pointer' : ''}`}
      style={{
        width: cardW,
        height: cardH,
        transform: 'translate(-50%, -50%)',
        transition:
          'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onClick={!expanded ? onOpen : undefined}
      role={!expanded ? 'button' : undefined}
      tabIndex={!expanded ? 0 : undefined}
      aria-label={!expanded ? `Open ${project.title}` : undefined}
      onKeyDown={
        !expanded
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpen();
              }
            }
          : undefined
      }
    >
      {/* Top Expanded Header: Prev / Next + Category + Display Serif Title */}
      {expanded && (
        <div className="absolute bottom-full left-1/2 mb-4 w-max max-w-[85vw] -translate-x-1/2 text-center">
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="flex size-8 items-center justify-center rounded-full border border-white/25 bg-black/80 text-white hover:bg-[#901a1d] hover:border-[#901a1d] transition-colors cursor-pointer"
              aria-label="Previous project"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="flex size-8 items-center justify-center rounded-full border border-white/25 bg-black/80 text-white hover:bg-[#901a1d] hover:border-[#901a1d] transition-colors cursor-pointer"
              aria-label="Next project"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#901a1d] font-semibold">
            {project.category} · {project.specimenCode}
          </div>
          <div className="mt-1 font-display text-2xl sm:text-3xl leading-tight text-white">
            {project.title}
          </div>
        </div>
      )}

      {/* Left Floating Actions on Desktop Expanded */}
      {expanded && !isMobile && (
        <div className="absolute right-full top-1/2 mr-4 flex -translate-y-1/2 flex-col gap-2">
          {LikeBtn}
          {SaveBtn}
        </div>
      )}

      {/* Right Floating Actions on Desktop Expanded */}
      {expanded && !isMobile && (
        <div className="absolute left-full top-1/2 ml-4 flex -translate-y-1/2 flex-col gap-2">
          {ShareBtn}
          {InspectBtn}
          {CloseBtn}
        </div>
      )}

      {/* Main Specimen Card Frame */}
      <div
        className="relative h-full w-full overflow-hidden rounded-[8px] bg-black border border-white/25"
        style={{
          boxShadow: '0 36px 80px -15px rgb(0 0 0 / 0.9)',
        }}
      >
        {!imgErr ? (
          <img
            src={project.image}
            alt={project.title}
            draggable={false}
            referrerPolicy="no-referrer"
            onError={() => setImgErr(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col justify-between p-6 bg-[#0d0d0d] text-white">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#901a1d]">
              {project.specimenCode}
            </span>
            <div>
              <div className="h-0.5 w-8 bg-[#901a1d] mb-3" />
              <div className="font-display text-2xl">{project.title}</div>
              <p className="mt-2 text-xs text-white/70">{project.desc}</p>
            </div>
            <span className="font-mono text-[10px] uppercase text-white/60">
              {project.client} · {project.duration}
            </span>
          </div>
        )}

        {/* Unexpanded Bottom Gradient Caption Overlay */}
        {!expanded && (
          <div
            className="absolute inset-x-0 bottom-0 p-4"
            style={{
              background:
                'linear-gradient(to top, rgb(0 0 0 / 0.94) 0%, rgb(0 0 0 / 0.55) 60%, transparent 100%)',
            }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#901a1d] font-semibold">
              {project.category} · {project.specimenCode}
            </div>
            <div className="mt-0.5 truncate font-display text-xl text-white">
              {project.title}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Expanded Details & CTAs */}
      {expanded && (
        <div
          className="absolute left-1/2 top-full mt-4 -translate-x-1/2 text-center"
          style={{
            minWidth: isMobile ? 260 : 380,
            maxWidth: '90vw',
          }}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/70">
            {project.client} · {project.duration}
          </div>

          {isMobile && (
            <div className="mt-3 flex items-center justify-center gap-2">
              {LikeBtn}
              {SaveBtn}
              {ShareBtn}
              {InspectBtn}
              {CloseBtn}
            </div>
          )}

          {!isMobile && (
            <p className="mx-auto mt-2.5 max-w-[460px] text-[13px] leading-relaxed text-white/80">
              {project.desc}
            </p>
          )}

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCommission();
              }}
              className="rounded-full bg-[#901a1d] text-white px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap shadow-lg"
            >
              Commission Similar
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onInspectFull();
              }}
              className="rounded-full border border-white/25 bg-black/75 text-white px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] hover:bg-white/15 backdrop-blur-md transition-colors cursor-pointer whitespace-nowrap"
            >
              Inspect Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
 * MAIN INTERACTIVE MOMENTS PORTFOLIO WALL (Unique Projects, Large Format)
 * ========================================================================== */
export const MomentsPortfolioWall: React.FC<MomentsPortfolioWallProps> = ({
  onSelectProject,
  onStartProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [viewport, setViewport] = useState<{
    vw: number;
    vh: number;
    isMobile: boolean;
  } | null>(null);
  const [featuredCellIdx, setFeaturedCellIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<number>>(() => new Set());
  const [savedIds, setSavedIds] = useState<Set<number>>(() => new Set());
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const featuredWrapperRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const activeProjects = useMemo(() => {
    if (selectedCategory === 'All') return FORGE_PROJECTS;
    const filtered = FORGE_PROJECTS.filter((p) => p.category === selectedCategory);
    return filtered.length > 0 ? filtered : FORGE_PROJECTS;
  }, [selectedCategory]);

  const physicsRef = useRef({
    mouse: { x: 0, y: 0, has: false },
    panOff: { x: 0, y: 0 },
    panTarget: { x: 0, y: 0 },
    voidWorld: { x: 0, y: 0 },
    voidRadius: 0,
    targetRadius: 0,
    hovering: true,
    pinned: false,
    expanded: false,
    featuredIdx: 0,
  });

  const wallGrid = useMemo(
    () => (viewport ? buildMomentsWallGrid(viewport, activeProjects) : null),
    [viewport, activeProjects]
  );

  const currentProject = useMemo(() => {
    if (!wallGrid || wallGrid.cells.length === 0) return activeProjects[0];
    const safeIdx = Math.min(featuredCellIdx, wallGrid.cells.length - 1);
    const cell = wallGrid.cells[Math.max(0, safeIdx)];
    return activeProjects[cell.photoIndex] || activeProjects[0];
  }, [wallGrid, featuredCellIdx, activeProjects]);

  useEffect(() => {
    physicsRef.current.expanded = expanded;
  }, [expanded]);

  useEffect(() => {
    physicsRef.current.featuredIdx = featuredCellIdx;
  }, [featuredCellIdx]);

  // Measure viewport
  useEffect(() => {
    const updateViewport = () => {
      const vw = window.innerWidth;
      const vh = Math.max(700, window.innerHeight - 64);
      const isMobile = vw < 768;
      setViewport((prev) =>
        prev &&
        prev.vw === vw &&
        prev.isMobile === isMobile &&
        Math.abs(prev.vh - vh) < 120
          ? prev
          : { vw, vh, isMobile }
      );
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const handleOpenCentered = useCallback(() => {
    const state = physicsRef.current;
    if (!state.expanded && viewport && wallGrid) {
      const targetCell = wallGrid.cells[state.featuredIdx];
      state.pinned = false;
      if (targetCell) {
        state.panTarget.x = viewport.vw / 2 - targetCell.baseX;
        state.panTarget.y = viewport.vh / 2 - targetCell.baseY;
      } else {
        state.panTarget.x = viewport.vw / 2 - state.voidWorld.x;
        state.panTarget.y = viewport.vh / 2 - state.voidWorld.y;
      }
      state.expanded = true;
      setExpanded(true);
    }
  }, [viewport, wallGrid]);

  const handleSelectCell = useCallback(
    (cellIndex: number) => {
      if (!wallGrid || !viewport) return;
      const targetCell = wallGrid.cells[cellIndex];
      if (!targetCell) return;
      const state = physicsRef.current;
      state.featuredIdx = cellIndex;
      setFeaturedCellIdx(cellIndex);
      state.pinned = true;
      state.panTarget.x = viewport.vw / 2 - targetCell.baseX;
      state.panTarget.y = viewport.vh / 2 - targetCell.baseY;
      state.voidWorld.x = targetCell.baseX;
      state.voidWorld.y = targetCell.baseY;
      state.expanded = true;
      setExpanded(true);
    },
    [wallGrid, viewport]
  );

  const handleCloseCentered = useCallback(() => {
    const state = physicsRef.current;
    state.pinned = false;
    state.expanded = false;
    setExpanded(false);
    if (viewport) {
      state.panTarget.x = viewport.vw / 2;
      state.panTarget.y = viewport.vh / 2;
    }
  }, [viewport]);

  const stepFeatured = useCallback(
    (delta: number) => {
      if (!wallGrid || !viewport) return;
      const { cells } = wallGrid;
      if (cells.length === 0) return;
      const state = physicsRef.current;
      const nextIdx = (state.featuredIdx + delta + cells.length) % cells.length;
      const targetCell = cells[nextIdx];

      state.pinned = true;
      state.panTarget.x = viewport.vw / 2 - targetCell.baseX;
      state.panTarget.y = viewport.vh / 2 - targetCell.baseY;
      state.voidWorld.x = targetCell.baseX;
      state.voidWorld.y = targetCell.baseY;
      state.featuredIdx = nextIdx;
      setFeaturedCellIdx(nextIdx);
    },
    [wallGrid, viewport]
  );

  // Pointer & Touch tracking relative to the wall section
  useEffect(() => {
    const state = physicsRef.current;
    const sectionEl = sectionRef.current;

    const updateFromClientCoords = (clientX: number, clientY: number) => {
      if (!sectionEl) return;
      const rect = sectionEl.getBoundingClientRect();
      if (clientY < rect.top || clientY > rect.bottom) return;
      state.mouse.x = clientX - rect.left;
      state.mouse.y = clientY - rect.top;
      state.mouse.has = true;
      setHasInteracted(true);
    };

    const onPointerMove = (e: PointerEvent) => {
      updateFromClientCoords(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateFromClientCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateFromClientCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onEnter = () => {
      state.hovering = true;
    };
    const onLeave = () => {
      state.hovering = false;
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    if (sectionEl) {
      sectionEl.addEventListener('pointerenter', onEnter);
      sectionEl.addEventListener('pointerleave', onLeave);
    }

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchStart);
      if (sectionEl) {
        sectionEl.removeEventListener('pointerenter', onEnter);
        sectionEl.removeEventListener('pointerleave', onLeave);
      }
    };
  }, []);

  // Keyboard navigation when expanded
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!physicsRef.current.expanded || e.repeat) return;
      if (e.key === 'Escape') handleCloseCentered();
      else if (e.key === 'ArrowRight') stepFeatured(1);
      else if (e.key === 'ArrowLeft') stepFeatured(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleCloseCentered, stepFeatured]);

  // 60fps Non-Duplicated Parting Wall Animation Loop
  useEffect(() => {
    if (!wallGrid || !viewport) return;
    const { cells, tile } = wallGrid;
    const { vw, vh, isMobile } = viewport;
    const state = physicsRef.current;

    state.panOff.x = vw / 2;
    state.panOff.y = vh / 2;
    state.panTarget.x = vw / 2;
    state.panTarget.y = vh / 2;
    state.voidWorld.x = 0;
    state.voidWorld.y = 0;
    state.pinned = false;

    // Pick initial cell nearest center (0,0)
    let closestIdx = 0;
    let closestDist = Infinity;
    for (let i = 0; i < cells.length; i++) {
      const d = Math.hypot(cells[i].baseX, cells[i].baseY);
      if (d < closestDist) {
        closestDist = d;
        closestIdx = i;
      }
    }
    state.featuredIdx = closestIdx;
    setFeaturedCellIdx(closestIdx);

    const startTime = performance.now();
    let rafId = 0;

    // Subtle camera pan range when wall is wider/taller than viewport
    const maxPanX = Math.max(40, (tile.width - vw) * 0.52);
    const maxPanY = Math.max(30, (tile.height - vh) * 0.52);

    const tick = (now: number) => {
      const elapsedSec = (now - startTime) / 1000;
      const entranceProgress = Math.min(1, elapsedSec / 1.0);
      const voidEmerge = Math.min(1, Math.max(0, (elapsedSec - 0.1) / 0.75));
      const featuredEmerge = Math.min(1, Math.max(0, (elapsedSec - 0.22) / 0.55));

      const isExp = state.expanded;
      const isHov = state.hovering;

      if (!isExp && state.mouse.has) {
        // Gentle parallax pan so all unique large tiles across the wall are easily reachable
        const normX = (state.mouse.x / vw - 0.5) * 2;
        const normY = (state.mouse.y / vh - 0.5) * 2;
        state.panTarget.x = vw / 2 - normX * maxPanX;
        state.panTarget.y = vh / 2 - normY * maxPanY;
      }

      state.panOff.x += (state.panTarget.x - state.panOff.x) * 0.08;
      state.panOff.y += (state.panTarget.y - state.panOff.y) * 0.08;

      if (isExp) {
        if (!state.pinned) {
          const dx = state.panTarget.x - state.panOff.x;
          const dy = state.panTarget.y - state.panOff.y;
          if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
            state.pinned = true;
          }
        }
        if (state.pinned) {
          state.voidWorld.x = vw / 2 - state.panOff.x;
          state.voidWorld.y = vh / 2 - state.panOff.y;
        }
      } else if (state.mouse.has) {
        const targetVoidX = state.mouse.x - state.panOff.x;
        const targetVoidY = state.mouse.y - state.panOff.y;
        state.voidWorld.x += (targetVoidX - state.voidWorld.x) * 0.25;
        state.voidWorld.y += (targetVoidY - state.voidWorld.y) * 0.25;
      }

      const desiredRadius = isExp
        ? isMobile
          ? 290
          : 440
        : isHov
        ? isMobile
          ? 185
          : 295
        : isMobile
        ? 140
        : 220;

      state.targetRadius = desiredRadius * voidEmerge;
      state.voidRadius += (state.targetRadius - state.voidRadius) * 0.08;

      const c = state.voidRadius;
      const m = 1.32 * c;
      const voidX = state.voidWorld.x;
      const voidY = state.voidWorld.y;
      const halfDiag = Math.hypot(vw, vh) / 2;
      const inEntrance = entranceProgress < 1;

      let nearestCellIdx = state.featuredIdx;
      let minDist = Infinity;

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const el = itemsRef.current[i];
        if (!el) continue;

        const worldX = cell.baseX;
        const worldY = cell.baseY;

        const dx = worldX - voidX;
        const dy = worldY - voidY;
        const dist = Math.hypot(dx, dy);

        if (dist < minDist) {
          minDist = dist;
          nearestCellIdx = i;
        }

        let finalWorldX = worldX;
        let finalWorldY = worldY;
        let finalScale = cell.scale;

        if (dist < m) {
          let dirX: number;
          let dirY: number;
          const falloff = 1 - dist / m;
          const pushDist = c * falloff * falloff;
          if (dist < 0.5) {
            dirX = Math.cos(cell.angle);
            dirY = Math.sin(cell.angle);
          } else {
            dirX = dx / dist;
            dirY = dy / dist;
          }
          finalWorldX = worldX + dirX * pushDist;
          finalWorldY = worldY + dirY * pushDist;

          if (dist > 0.55 * c && dist < 1.05 * c) {
            finalScale *=
              1 +
              0.06 *
                (smoothstep(0.55 * c, 0.8 * c, dist) *
                  (1 - smoothstep(0.85 * c, 1.05 * c, dist)));
          }
        }

        let opacity = 1;
        let entrancePushX = 0;
        let entrancePushY = 0;

        if (inEntrance) {
          const baseDist = Math.hypot(cell.baseX, cell.baseY);
          const prog = Math.max(
            0,
            Math.min(1, 1.5 * (entranceProgress - (baseDist / halfDiag) * 0.4))
          );
          opacity = prog;
          finalScale *= 0.3 + 0.7 * prog;
          if (baseDist > 1) {
            const nx = cell.baseX / baseDist;
            const ny = cell.baseY / baseDist;
            const push = (1 - prog) * 420;
            entrancePushX = nx * push;
            entrancePushY = ny * push;
          }
        }

        const tx = finalWorldX + entrancePushX + state.panOff.x - cell.width / 2;
        const ty = finalWorldY + entrancePushY + state.panOff.y - cell.height / 2;

        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) rotate(${cell.rotation.toFixed(2)}deg) scale(${finalScale.toFixed(3)})`;
        el.style.opacity = opacity < 0.999 ? opacity.toFixed(3) : '1';
      }

      if (nearestCellIdx !== state.featuredIdx && minDist < 1.05 * c && !isExp) {
        state.featuredIdx = nearestCellIdx;
        setFeaturedCellIdx(nearestCellIdx);
      }

      const featuredEl = featuredWrapperRef.current;
      if (featuredEl) {
        let fx: number;
        let fy: number;
        if (isExp && state.pinned) {
          fx = vw / 2;
          fy = vh / 2;
        } else {
          fx = voidX + state.panOff.x;
          fy = voidY + state.panOff.y;
        }
        featuredEl.style.transform = `translate3d(${fx.toFixed(2)}px, ${fy.toFixed(2)}px, 0) scale(${featuredEmerge.toFixed(3)})`;
        featuredEl.style.opacity =
          featuredEmerge < 0.999 ? featuredEmerge.toFixed(3) : '1';
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [wallGrid, viewport]);

  const toggleLike = useCallback(() => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(currentProject.id)) next.delete(currentProject.id);
      else next.add(currentProject.id);
      return next;
    });
  }, [currentProject.id]);

  const toggleSave = useCallback(() => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(currentProject.id)) next.delete(currentProject.id);
      else next.add(currentProject.id);
      return next;
    });
  }, [currentProject.id]);

  const handleShare = useCallback(async () => {
    const shareText = `${currentProject.title} (${currentProject.category}) - Design Forge`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: currentProject.title,
          text: shareText,
          url: window.location.href,
        });
        return;
      }
      await navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 2000);
    } catch {
      // ignore clipboard errors in restricted frames
    }
  }, [currentProject]);

  return (
    <section
      ref={sectionRef}
      aria-label="Design Forge - interactive portfolio wall"
      className="relative isolate h-[calc(100vh-56px)] min-h-[760px] w-full select-none overflow-hidden bg-black text-white"
    >
      {/* 1. Non-Duplicated Large-Format Wall Cells Layer */}
      <div className="absolute inset-0 z-10">
        {wallGrid && viewport && (
          <WallCellsLayer
            cells={wallGrid.cells}
            projects={activeProjects}
            itemsRef={itemsRef}
            onSelectCell={handleSelectCell}
          />
        )}
      </div>

      {/* 2. Bottom-Left Radial Scrim for Typography Legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[14]"
        style={{
          background:
            'radial-gradient(ellipse 68% 52% at 0% 100%, rgb(0 0 0 / 0.96) 0%, rgb(0 0 0 / 0.85) 24%, rgb(0 0 0 / 0.5) 42%, rgb(0 0 0 / 0.2) 58%, transparent 78%)',
        }}
      />

      {/* 3. Backdrop Scrim When Centered Card is Expanded */}
      <div
        aria-hidden="true"
        onClick={handleCloseCentered}
        className="absolute inset-0 z-20 transition-opacity duration-300 backdrop-blur-[3px]"
        style={{
          background: 'rgb(0 0 0 / 0.85)',
          opacity: expanded ? 1 : 0,
          pointerEvents: expanded ? 'auto' : 'none',
        }}
      />

      {/* 4. Floating Featured Card Inside the Parting Cursor Void */}
      <div
        ref={featuredWrapperRef}
        className="pointer-events-none absolute left-0 top-0 z-30 will-change-transform"
        style={{ opacity: 0 }}
      >
        {wallGrid && viewport && (
          <FeaturedMomentCard
            project={currentProject}
            expanded={expanded}
            isMobile={viewport.isMobile}
            liked={likedIds.has(currentProject.id)}
            saved={savedIds.has(currentProject.id)}
            copiedNotice={copiedNotice}
            onOpen={handleOpenCentered}
            onClose={handleCloseCentered}
            onNext={() => stepFeatured(1)}
            onPrev={() => stepFeatured(-1)}
            onToggleLike={toggleLike}
            onToggleSave={toggleSave}
            onShare={handleShare}
            onInspectFull={() => onSelectProject(currentProject)}
            onCommission={() =>
              onStartProject(
                currentProject.category === 'Logos' ? 'Logo Design' : 'Brand Identity'
              )
            }
          />
        )}
      </div>

      {/* 5. Top-Left Category Filter Pills (Black / White / #901A1D) */}
      <div
        className={`pointer-events-auto absolute left-4 sm:left-6 top-4 sm:top-6 z-[35] flex flex-wrap items-center gap-1.5 max-w-[85vw] sm:max-w-[75vw] transition-opacity duration-300 ${
          expanded && viewport?.isMobile ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {PROJECT_CATEGORIES.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => {
                handleCloseCentered();
                setSelectedCategory(category);
              }}
              className={`px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors cursor-pointer backdrop-blur-md border ${
                active
                  ? 'bg-[#901a1d] text-white border-[#901a1d]'
                  : 'bg-black/75 text-white/80 border-white/20 hover:text-white hover:border-white/50'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* 6. Bottom-Left Editorial Title Block */}
      <div
        className={`pointer-events-none absolute bottom-7 left-7 z-[35] max-w-md ${
          expanded && viewport?.isMobile ? 'hidden' : ''
        }`}
      >
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white/80">
          <span className="inline-block h-[1.5px] w-8 bg-[#901a1d]" />
          <span>Design Forge Archive · {activeProjects.length} Works</span>
        </div>

        <h1 className="mt-3 font-display text-[clamp(2.5rem,4.5vw,4.25rem)] leading-[0.95] tracking-[-0.02em] text-white">
          Portfolio
        </h1>

        <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-white/70 max-md:hidden">
          The wall parts wherever your cursor goes. Click any project to centre and inspect it.
        </p>

        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/75 px-3 py-1.5 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#901a1d] animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/90">
            This is just the tip of the iceberg · 150+ works delivered
          </span>
        </div>
      </div>

      {/* 7. Top-Right Interaction Hint (Fades out on first pointer move) */}
      <div
        className={`pointer-events-none absolute right-7 top-7 z-40 font-mono text-[11px] uppercase tracking-[0.22em] text-white/75 transition-opacity duration-500 ${
          hasInteracted ? 'opacity-0' : 'opacity-100'
        }`}
      >
        Move · Click to open
      </div>
    </section>
  );
};
