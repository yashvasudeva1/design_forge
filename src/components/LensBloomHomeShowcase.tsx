import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { FORGE_PROJECTS, ForgeProject } from '../data/forgeData';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface LensBloomHomeShowcaseProps {
  onSelectProject: (project: ForgeProject) => void;
  onViewAllPortfolio: () => void;
}

const LB = {
  CARD_H_FRAC: 0.64,
  CARD_ASPECT: 0.74,
  DECK_DROP: 0.06,
  CLUSTER_SCALE: 0.46,
  ROW_SCALE: 0.46,
  ROW_GAP_FRAC: 0.014,
  TITLE_MIN: 0.33,
  WORDS_IN: 0.26,
  CARD_ONSET: 0.06,
  CARD_APPEAR: 0.3,
  LOAD_DUR: 2.2,
  WHEEL_SENS: 0.0018,
  DRAG_MULT: 1.4,
  KEY_STEP: 1,
  EASE: 0.09,
  SNAP: 0.0004,
  MOBILE_BP: 768,
};

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const clamp = (v: number, min: number, max: number) =>
  v < min ? min : v > max ? max : v;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const norm = (v: number, a: number, b: number) => clamp((v - a) / (b - a), 0, 1);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const LensBloomHomeShowcase: React.FC<LensBloomHomeShowcaseProps> = ({
  onSelectProject,
  onViewAllPortfolio,
}) => {
  // Best projects only (8 featured works from Design Forge)
  const bestProjects = useMemo(
    () => FORGE_PROJECTS.filter((p) => p.featured),
    []
  );
  const count = bestProjects.length;
  const maxProgress = 2 + Math.max(0, count - 1);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const wordLeftRef = useRef<HTMLSpanElement | null>(null);
  const wordRightRef = useRef<HTMLSpanElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const counterWrapRef = useRef<HTMLDivElement | null>(null);
  const counterIndexRef = useRef<HTMLSpanElement | null>(null);
  const flourishSvgRef = useRef<SVGSVGElement | null>(null);
  const flourishLineRef = useRef<SVGLineElement | null>(null);
  const flourishDotRef = useRef<SVGCircleElement | null>(null);
  const scrollHintRef = useRef<HTMLSpanElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [inDeckMode, setInDeckMode] = useState(true);

  const stateRef = useRef({
    progress: 0,
    targetProgress: 2, // Animates through split-word bloom directly into the 3D deck of Best Projects
    loading: true,
    loadStart: 0,
    dragging: false,
    dragMoved: false,
    dragStartY: 0,
    dragStartTarget: 2,
    vw: typeof window !== 'undefined' ? window.innerWidth : 1440,
    vh: typeof window !== 'undefined' ? window.innerHeight : 820,
    leftWordW: 260,
    rightWordW: 240,
    activeIdx: 0,
    deckMode: true,
  });

  const stepToCard = useCallback(
    (cardIdx: number) => {
      const clampedIdx = clamp(cardIdx, 0, count - 1);
      stateRef.current.loading = false;
      stateRef.current.targetProgress = 2 + clampedIdx;
    },
    [count]
  );

  const toggleBloomSpread = useCallback(() => {
    stateRef.current.loading = false;
    if (stateRef.current.targetProgress < 1.5) {
      stateRef.current.targetProgress = 2;
    } else {
      stateRef.current.targetProgress = 1;
    }
  }, []);

  useEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl) return;

    const st = stateRef.current;
    st.loadStart = performance.now();

    const measure = () => {
      const rect = rootEl.getBoundingClientRect();
      st.vw = rect.width || window.innerWidth;
      st.vh = rect.height || window.innerHeight;

      const wl = wordLeftRef.current;
      const wr = wordRightRef.current;
      if (wl && wr) {
        const prevL = wl.style.transform;
        const prevR = wr.style.transform;
        wl.style.transform = 'none';
        wr.style.transform = 'none';
        st.leftWordW = wl.getBoundingClientRect().width || 240;
        st.rightWordW = wr.getBoundingClientRect().width || 220;
        wl.style.transform = prevL;
        wr.style.transform = prevR;
      }
    };

    measure();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }
    window.addEventListener('resize', measure);

    // Wheel interaction inside the Lens Bloom stage:
    // Captures scroll while peeling through the 8 best projects, then releases at top/bottom edges
    const onWheel = (e: WheelEvent) => {
      const delta = e.deltaY;
      const atTopEdge = st.targetProgress <= 1.02 && delta < 0;
      const atBottomEdge = st.targetProgress >= maxProgress - 0.02 && delta > 0;

      if (atTopEdge || atBottomEdge) {
        return; // Allow natural page scroll past the showcase
      }

      e.preventDefault();
      if (st.loading) {
        st.loading = false;
        st.targetProgress = st.progress;
      }
      st.targetProgress = clamp(
        st.targetProgress + delta * LB.WHEEL_SENS,
        1,
        maxProgress
      );
    };

    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('button, a')) return;
      if (st.loading) {
        st.loading = false;
        st.targetProgress = st.progress;
      }
      st.dragging = true;
      st.dragMoved = false;
      st.dragStartY = e.clientY;
      st.dragStartTarget = st.targetProgress;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!st.dragging) return;
      const dy = st.dragStartY - e.clientY;
      if (Math.abs(dy) > 6) st.dragMoved = true;
      const deltaProg = (dy / Math.max(400, st.vh)) * LB.DRAG_MULT * 2.2;
      st.targetProgress = clamp(st.dragStartTarget + deltaProg, 1, maxProgress);
    };

    const onPointerUp = () => {
      st.dragging = false;
    };

    rootEl.addEventListener('wheel', onWheel, { passive: false });
    rootEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    let rafId = 0;

    const renderFrame = (now: number) => {
      const vw = st.vw;
      const vh = st.vh;
      const isMob = vw < LB.MOBILE_BP;

      if (st.loading) {
        const loadT = clamp((now - st.loadStart) / (LB.LOAD_DUR * 1000), 0, 1);
        // Smoothly bloom from 0 -> 1 (row spread) -> 2 (stacked 3D deck of Best Works)
        st.progress = easeInOutCubic(loadT) * 2;
        if (loadT >= 1) {
          st.loading = false;
          st.progress = 2;
          st.targetProgress = 2;
        }
      } else {
        const diff = st.targetProgress - st.progress;
        if (Math.abs(diff) > LB.SNAP) {
          st.progress += diff * LB.EASE;
        } else {
          st.progress = st.targetProgress;
        }
      }

      const o = st.progress;
      const cardH = vh * (isMob ? 0.5 : LB.CARD_H_FRAC);
      const cardW = Math.min(cardH * LB.CARD_ASPECT, vw * (isMob ? 0.78 : 0.42));
      const actualCardH = cardW / LB.CARD_ASPECT;
      const deckDropY = vh * (isMob ? 0.01 : LB.DECK_DROP);

      const wordsAppear = easeOutCubic(norm(o, 0, LB.WORDS_IN));
      const cardsPart = easeInOutCubic(norm(o, LB.CARD_ONSET, 1));
      const deckCollapse = easeInOutCubic(norm(o, 1, 2));
      const peelProgress = Math.max(0, o - 2);

      const rowScale = isMob
        ? clamp((vw * 0.88) / (count * cardW + (count - 1) * 8), 0.14, 0.28)
        : LB.ROW_SCALE;
      const rowGap = isMob ? 6 : vw * LB.ROW_GAP_FRAC;
      const scaledCardW = cardW * rowScale;
      const totalRowW = count * scaledCardW + (count - 1) * rowGap;
      const wordGap = isMob ? 12 : vw * 0.022;

      const leftStart = -(st.leftWordW + st.rightWordW + wordGap) / 2 + st.leftWordW / 2;
      const rightStart = leftStart + st.leftWordW / 2 + wordGap + st.rightWordW / 2;
      const leftSpread = -totalRowW / 2 - wordGap - st.leftWordW / 2;
      const rightSpread = totalRowW / 2 + wordGap + st.rightWordW / 2;

      const wordScale = lerp(1, LB.TITLE_MIN, deckCollapse);
      const wordLiftY = lerp(0, -vh * (isMob ? 0.39 : 0.37), deckCollapse);
      const collapsedGap = wordGap * LB.TITLE_MIN;
      const leftCollapsedX = -(st.leftWordW * LB.TITLE_MIN + collapsedGap) / 2;
      const rightCollapsedX = (st.rightWordW * LB.TITLE_MIN + collapsedGap) / 2;

      const leftX = lerp(lerp(leftStart, leftSpread, cardsPart), leftCollapsedX, deckCollapse);
      const rightX = lerp(lerp(rightStart, rightSpread, cardsPart), rightCollapsedX, deckCollapse);
      const wordIntroY = lerp(16, 0, wordsAppear);

      if (wordLeftRef.current) {
        wordLeftRef.current.style.opacity = wordsAppear.toFixed(3);
        wordLeftRef.current.style.transform = `translate3d(${leftX.toFixed(2)}px, ${(wordIntroY + wordLiftY).toFixed(2)}px, 0) scale(${wordScale.toFixed(4)})`;
      }
      if (wordRightRef.current) {
        wordRightRef.current.style.opacity = wordsAppear.toFixed(3);
        wordRightRef.current.style.transform = `translate3d(${rightX.toFixed(2)}px, ${(wordIntroY + wordLiftY).toFixed(2)}px, 0) scale(${wordScale.toFixed(4)})`;
      }

      // Position each of the 8 Best Project cards
      const midIdx = (count - 1) / 2;
      for (let i = 0; i < count; i++) {
        const el = cardsRef.current[i];
        if (!el) continue;

        el.style.width = `${cardW.toFixed(1)}px`;
        el.style.height = `${actualCardH.toFixed(1)}px`;
        el.style.marginLeft = `${(-cardW / 2).toFixed(1)}px`;
        el.style.marginTop = `${(-actualCardH / 2).toFixed(1)}px`;

        const distFromMid = Math.abs(i - midIdx) / Math.max(1, midIdx);
        const onset = LB.CARD_ONSET + distFromMid * 0.16;
        const cardIn = easeOutCubic(norm(o, onset, onset + LB.CARD_APPEAR));

        const rowX = (i - midIdx) * (scaledCardW + rowGap);
        const spreadX = rowX * cardsPart;
        const spreadScale = lerp(LB.CLUSTER_SCALE * 0.72, rowScale, cardIn);

        const x = lerp(spreadX, 0, deckCollapse);
        const s = lerp(spreadScale, 1, deckCollapse);
        const depth = i - peelProgress;

        let zOffset = 0;
        let peelY = 0;
        let rotX = 0;
        let opacity = cardIn;

        if (depth < 0) {
          // Card is peeling upward off the top of the deck
          const peelAmt = clamp(-depth, 0, 1);
          const peelEase = easeInOutCubic(peelAmt);
          peelY = -peelEase * (vh * 0.82 + actualCardH * 0.5);
          rotX = peelEase * 36;
          zOffset = peelAmt * 80;
          opacity = cardIn * (1 - Math.pow(peelAmt, 1.55));
        } else {
          // Stacked behind the active card with top edges peeking up
          const stackPos = depth * deckCollapse;
          peelY = -stackPos * 16;
          zOffset = -stackPos * 52;
        }

        const finalY = deckDropY * deckCollapse + peelY;
        const finalZ = zOffset * deckCollapse;
        const finalRotX = rotX * deckCollapse;

        el.style.opacity = clamp(opacity, 0, 1).toFixed(3);
        el.style.zIndex = String(Math.round(100 - i));
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${finalY.toFixed(2)}px, ${finalZ.toFixed(2)}px) rotateX(${finalRotX.toFixed(2)}deg) scale(${s.toFixed(4)})`;
      }

      // Active title & Roman numeral on left, counter ring on right, SVG flourish line in middle
      const hudVis = easeOutCubic(norm(o, 1.55, 2));
      const currentIdx = clamp(Math.round(peelProgress), 0, count - 1);

      if (currentIdx !== st.activeIdx) {
        st.activeIdx = currentIdx;
        setActiveIndex(currentIdx);
      }

      const nowInDeck = o >= 1.5;
      if (nowInDeck !== st.deckMode) {
        st.deckMode = nowInDeck;
        setInDeckMode(nowInDeck);
      }

      const activeRightEdgeX = 0;
      let activeTitleRightX = isMob ? 16 : vw * 0.25;

      for (let i = 0; i < count; i++) {
        const titleEl = titlesRef.current[i];
        if (!titleEl) continue;

        const offset = i - peelProgress;
        const titleAlpha = clamp(1 - Math.abs(offset) * 1.35, 0, 1) * hudVis;
        const titleY = offset * 26;
        const titleX = isMob ? 16 : vw * 0.045;

        titleEl.style.opacity = titleAlpha.toFixed(3);
        titleEl.style.transform = `translate3d(${titleX.toFixed(1)}px, calc(-50% + ${(deckDropY + titleY).toFixed(1)}px), 0)`;
        titleEl.style.pointerEvents = titleAlpha > 0.6 ? 'auto' : 'none';

        if (i === currentIdx) {
          const titleW = titleEl.offsetWidth || 220;
          activeTitleRightX = titleX + titleW;
        }
      }

      const counterW = isMob ? 64 : 112;
      const counterLeftX = isMob ? vw - 16 - counterW : vw - vw * 0.045 - counterW;

      if (counterWrapRef.current) {
        counterWrapRef.current.style.opacity = hudVis.toFixed(3);
        counterWrapRef.current.style.transform = `translate3d(${counterLeftX.toFixed(1)}px, calc(-50% + ${deckDropY.toFixed(1)}px), 0)`;
      }

      if (counterIndexRef.current) {
        const txt = String(currentIdx + 1);
        if (counterIndexRef.current.textContent !== txt) {
          counterIndexRef.current.textContent = txt;
        }
      }

      // Update glowing #901A1D flourish line & comet dot
      if (
        flourishSvgRef.current &&
        flourishLineRef.current &&
        flourishDotRef.current
      ) {
        if (isMob) {
          flourishSvgRef.current.style.opacity = '0';
        } else {
          const pad = 28;
          const x1 = activeTitleRightX + pad;
          const x2 = counterLeftX - pad;
          const totalLen = Math.max(0, x2 - x1);
          const cy = vh / 2 + deckDropY;
          const drawLen = totalLen * hudVis;
          const curX2 = x1 + drawLen;

          flourishLineRef.current.setAttribute('x1', x1.toFixed(1));
          flourishLineRef.current.setAttribute('y1', cy.toFixed(1));
          flourishLineRef.current.setAttribute('x2', curX2.toFixed(1));
          flourishLineRef.current.setAttribute('y2', cy.toFixed(1));

          flourishDotRef.current.setAttribute('cx', curX2.toFixed(1));
          flourishDotRef.current.setAttribute('cy', cy.toFixed(1));

          flourishSvgRef.current.style.opacity = (
            hudVis * (totalLen > 40 ? 1 : 0)
          ).toFixed(3);
        }
      }

      if (scrollHintRef.current) {
        const hintAlpha = clamp(1 - norm(o, 2.05, 2.5), 0, 1);
        scrollHintRef.current.style.opacity = hintAlpha.toFixed(3);
      }

      void activeRightEdgeX;
      rafId = requestAnimationFrame(renderFrame);
    };

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', measure);
      rootEl.removeEventListener('wheel', onWheel);
      rootEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [count, maxProgress]);

  const currentBestProject = bestProjects[activeIndex] || bestProjects[0];

  return (
    <section
      id="work"
      aria-label="Selected Works - Lens Bloom Showcase"
      className="relative w-full border-y border-[var(--border)] bg-black text-white"
    >
      {/* Interactive Lens Bloom Stage (`https://lens-bloom-template.modulify.website/`) */}
      <div
        ref={rootRef}
        data-lens-bloom
        className="relative h-[86vh] min-h-[680px] max-h-[900px] w-full select-none overflow-hidden bg-black text-white cursor-grab active:cursor-grabbing"
      >
        {/* Top Sub-bar inside the Lens Bloom stage */}
        <div className="pointer-events-auto absolute inset-x-0 top-0 z-30 flex items-center justify-between border-b border-white/10 bg-black/50 backdrop-blur-sm px-4 sm:px-6 lg:px-10 py-4">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/80 tabular-nums">
            <span className="inline-block h-[1.5px] w-6 bg-[#901a1d]" />
            <span>Exhibition Archive · 0{count} Curated Works</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleBloomSpread}
              className="border border-white/20 bg-black/75 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/85 hover:border-[#901a1d] hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {inDeckMode ? 'Spread Gallery Row' : 'Stack 3D Deck'}
            </button>
            <button
              type="button"
              onClick={onViewAllPortfolio}
              className="bg-[#901a1d] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white hover:bg-white hover:text-black transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Full Archive (25) →
            </button>
          </div>
        </div>

        {/* Center Interactive Stage */}
        <div className="lb-stage">
          {/* Split Display Words ("Selected" / "Works") */}
          <span ref={wordLeftRef} className="lb-word">
            Selected
          </span>
          <span ref={wordRightRef} className="lb-word">
            Works
          </span>

          {/* Horizontal Glowing #901A1D Flourish Line & Comet Dot */}
          <svg
            ref={flourishSvgRef}
            className="lb-flourish"
            aria-hidden="true"
            style={{ opacity: 0 }}
          >
            <defs>
              <linearGradient
                id="lb-line-grad"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="1920"
                y2="0"
              >
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="22%" stopColor="rgba(255,255,255,0.22)" />
                <stop offset="78%" stopColor="rgba(144,26,29,0.75)" />
                <stop offset="100%" stopColor="#901a1d" />
              </linearGradient>
              <filter
                id="lb-comet-glow"
                x="-300%"
                y="-300%"
                width="700%"
                height="700%"
              >
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <line
              ref={flourishLineRef}
              className="lb-flourish-line"
              x1="0"
              y1="0"
              x2="0"
              y2="0"
            />
            <circle
              ref={flourishDotRef}
              className="lb-flourish-dot"
              cx="0"
              cy="0"
              r="3.2"
            />
          </svg>

          {/* 3D Perspective Card Stack (8 Best Projects Only) */}
          <div className="lb-cards">
            {bestProjects.map((project, idx) => (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                onClick={() => {
                  if (!stateRef.current.dragMoved) {
                    onSelectProject(project);
                  }
                }}
                className="lb-card pointer-events-auto cursor-pointer group"
                title={`Click to inspect ${project.title}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  draggable={false}
                  referrerPolicy="no-referrer"
                />
                {/* Subtle bottom badge on the front card */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 p-4 opacity-95 transition-opacity group-hover:opacity-100"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 65%, transparent 100%)',
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#901a1d] font-semibold">
                        {project.category} · {project.specimenCode}
                      </div>
                      <div className="mt-0.5 font-display text-lg text-white">
                        {project.title}
                      </div>
                    </div>
                    <span className="flex size-8 items-center justify-center rounded-full border border-white/25 bg-black/75 text-white group-hover:bg-[#901a1d] group-hover:border-[#901a1d] transition-colors">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Left Roman Numeral + Editorial Title Stack */}
          <div className="lb-titles">
            {bestProjects.map((project, idx) => (
              <div
                key={project.id}
                ref={(el) => {
                  titlesRef.current[idx] = el;
                }}
                className="lb-title max-w-[280px] sm:max-w-[320px]"
              >
                <span className="lb-num">
                  ({ROMAN_NUMERALS[idx] || idx + 1})
                </span>
                <div>
                  <span className="lb-name block">{project.title}</span>
                  <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#901a1d]">
                    {project.category} · {project.client}
                  </span>
                  <p className="mt-2 hidden lg:block text-xs leading-relaxed text-white/70 line-clamp-2">
                    {project.desc}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project);
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 border-b border-[#901a1d] pb-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white hover:text-[#901a1d] transition-colors cursor-pointer"
                  >
                    <span>Inspect Specimen</span>
                    <ArrowUpRight className="size-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Concentric Rings & Counter (`1/8`) */}
          <div ref={counterWrapRef} className="lb-counter-wrap">
            <svg
              className="lb-rings"
              viewBox="0 0 112 112"
              aria-hidden="true"
            >
              <circle className="lb-ring-outer" cx="56" cy="56" r="52" />
              <circle className="lb-ring-inner" cx="54" cy="59" r="44" />
            </svg>
            <div className="lb-counter">
              <span ref={counterIndexRef}>1</span>
              <span className="lb-sep">/</span>
              <span>{count}</span>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Controls & Scroll Hint */}
        <footer className="lb-foot pointer-events-none">
          <span ref={scrollHintRef} className="hidden sm:inline">
            Scroll or drag to peel deck
          </span>

          {/* Direct Card Stepper Controls */}
          <div className="pointer-events-auto mx-auto sm:mx-0 flex items-center gap-2">
            <button
              type="button"
              onClick={() => stepToCard(activeIndex - 1)}
              disabled={activeIndex <= 0 && inDeckMode}
              className="flex size-8 items-center justify-center rounded-full border border-white/25 bg-black/80 text-white hover:bg-[#901a1d] hover:border-[#901a1d] disabled:opacity-35 transition-colors cursor-pointer"
              aria-label="Previous best project"
            >
              <ChevronLeft className="size-4" />
            </button>

            <div className="flex items-center gap-1 px-2">
              {bestProjects.map((proj, idx) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => stepToCard(idx)}
                  aria-label={`Jump to ${proj.title}`}
                  className={`h-1.5 transition-all cursor-pointer rounded-full ${
                    idx === activeIndex && inDeckMode
                      ? 'w-5 bg-[#901a1d]'
                      : 'w-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => stepToCard(activeIndex + 1)}
              disabled={activeIndex >= count - 1 && inDeckMode}
              className="flex size-8 items-center justify-center rounded-full border border-white/25 bg-black/80 text-white hover:bg-[#901a1d] hover:border-[#901a1d] disabled:opacity-35 transition-colors cursor-pointer"
              aria-label="Next best project"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => onSelectProject(currentBestProject)}
            className="pointer-events-auto hidden md:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 hover:text-[#901a1d] transition-colors cursor-pointer"
          >
            <span>Open ({ROMAN_NUMERALS[activeIndex]}) {currentBestProject.title}</span>
            <ArrowUpRight className="size-3.5 text-[#901a1d]" />
          </button>
        </footer>
      </div>
    </section>
  );
};
