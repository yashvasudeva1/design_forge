import {
  FORGE_PROJECTS,
  ForgeProject,
  ProjectCategory,
  QUEST_PRESETS,
} from '../data/forgeData';

export interface FilterOptions {
  category: ProjectCategory;
  query: string;
  activeQuestId?: string | null;
}

/**
 * Filters and ranks the 25 Design Forge projects based on category,
 * free-text search query, or optional preset.
 */
export function filterProjects(
  projects: ForgeProject[],
  options: FilterOptions
): ForgeProject[] {
  const { category, query, activeQuestId } = options;
  const trimmedQuery = query.trim().toLowerCase();

  let result = [...projects];

  const activePreset = activeQuestId
    ? QUEST_PRESETS.find((q) => q.id === activeQuestId)
    : undefined;

  if (activePreset) {
    const highlightSet = new Set(activePreset.highlightIds);
    const categorySet = new Set(activePreset.categories);
    result = result.filter(
      (p) => highlightSet.has(p.id) || categorySet.has(p.category)
    );
    result.sort((a, b) => {
      const aIdx = activePreset.highlightIds.indexOf(a.id);
      const bIdx = activePreset.highlightIds.indexOf(b.id);
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return a.id - b.id;
    });
  }

  // Category filter
  if (category !== 'All') {
    result = result.filter((p) => p.category === category);
  }

  // Search query filter
  const isPresetEcho =
    activePreset &&
    trimmedQuery === activePreset.commandQuery.trim().toLowerCase();

  if (trimmedQuery.length > 0 && !isPresetEcho) {
    const cleanQuery = trimmedQuery.replace(/^\/(quest|brief|save|search)\s*/i, '').trim();
    if (cleanQuery.length > 0) {
      const tokens = cleanQuery.split(/\s+/);
      result = result.filter((project) => {
        const haystack = [
          project.title,
          project.category,
          project.client,
          project.desc,
          project.specimenCode,
          ...project.what,
        ]
          .join(' ')
          .toLowerCase();
        return tokens.every((token) => haystack.includes(token));
      });
    }
  }

  return result;
}

/**
 * Distributes projects into N masonry columns while preserving top-to-bottom reading order.
 */
export function distributeIntoMasonryLanes<T>(items: T[], laneCount: number): T[][] {
  const safeLaneCount = Math.max(1, Math.floor(laneCount));
  const lanes: T[][] = Array.from({ length: safeLaneCount }, () => []);
  items.forEach((item, index) => {
    lanes[index % safeLaneCount].push(item);
  });
  return lanes;
}

/**
 * Deterministic pseudo-random generator from `moments-template.modulify.website`
 */
export function seededRandom(seed: number): number {
  const e = 43758.5453 * Math.sin(12.9898 * seed + 78.233);
  return e - Math.floor(e);
}

/**
 * Smoothstep interpolation from `moments-template.modulify.website`
 */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function getNumericAspect(aspect: ForgeProject['aspect']): number {
  switch (aspect) {
    case 'tall':
      return 0.78;
    case 'portrait':
      return 0.85;
    case 'square':
      return 1.05;
    case 'wide':
      return 1.38;
    default:
      return 1.0;
  }
}

export interface MomentsWallCell {
  index: number;
  rowIndex: number;
  baseX: number;
  baseY: number;
  width: number;
  height: number;
  photoIndex: number;
  angle: number;
  rotation: number;
  scale: number;
}

export interface MomentsWallGrid {
  cells: MomentsWallCell[];
  tile: {
    width: number;
    height: number;
    rows: number;
  };
}

/**
 * Parting wall grid generator modeled on `moments-template.modulify.website`
 * populated with unique Design Forge projects (no duplicates) at large scale.
 */
export function buildMomentsWallGrid(
  viewport: { vw: number; vh: number; isMobile: boolean },
  projects: ForgeProject[]
): MomentsWallGrid {
  const { vw, vh, isMobile } = viewport;
  const total = projects.length;
  if (total === 0) {
    return { cells: [], tile: { width: vw, height: vh, rows: 0 } };
  }

  // Large specimen tile dimensions scaled to project count so all unique works are prominent
  const rowHeight = isMobile
    ? total <= 6
      ? 185
      : 145
    : total <= 4
    ? 290
    : total <= 14
    ? 235
    : 196;

  const gap = isMobile ? 14 : 22;
  const rowPitch = rowHeight + gap;

  const rowsCount = isMobile
    ? Math.max(1, Math.ceil(total / 2))
    : total <= 4
    ? 1
    : total <= 8
    ? 2
    : total <= 15
    ? 3
    : 4;

  const totalWallH = rowsCount * rowPitch;
  const startY = -((rowsCount - 1) * rowPitch) / 2;

  interface RawRowItem {
    photoIndex: number;
    width: number;
    colIdx: number;
  }

  const rawRows: RawRowItem[][] = Array.from({ length: rowsCount }, () => []);

  // Distribute each project exactly once across rows (zero duplicates)
  for (let pIdx = 0; pIdx < total; pIdx++) {
    const r = Math.floor((pIdx * rowsCount) / total);
    const col = rawRows[r].length;
    const itemW = Math.round(rowHeight * getNumericAspect(projects[pIdx].aspect));
    rawRows[r].push({
      photoIndex: pIdx,
      width: itemW,
      colIdx: col,
    });
  }

  let maxRowWidth = 0;
  const cells: MomentsWallCell[] = [];
  let cellIdx = 0;

  for (let r = 0; r < rowsCount; r++) {
    const rowItems = rawRows[r];
    if (rowItems.length === 0) continue;

    const rowTotalW =
      rowItems.reduce((sum, item) => sum + item.width, 0) +
      Math.max(0, rowItems.length - 1) * gap;

    if (rowTotalW > maxRowWidth) {
      maxRowWidth = rowTotalW;
    }

    let cursorX = -rowTotalW / 2;

    for (const item of rowItems) {
      const centerX = cursorX + item.width / 2;
      cells.push({
        index: cellIdx++,
        rowIndex: r,
        baseX: centerX,
        baseY: startY + r * rowPitch,
        width: item.width,
        height: rowHeight,
        photoIndex: item.photoIndex,
        angle: seededRandom(31 * r + 17 * item.colIdx + 7) * Math.PI * 2,
        rotation: (seededRandom(5 * r + 11 * item.colIdx + 3) - 0.5) * 3.2,
        scale: 1 + (seededRandom(7 * r + 13 * item.colIdx + 5) - 0.5) * 0.04,
      });
      cursorX += item.width + gap;
    }
  }

  return {
    cells,
    tile: {
      width: Math.max(vw, maxRowWidth + gap * 2),
      height: Math.max(vh, totalWallH + gap * 2),
      rows: rowsCount,
    },
  };
}

export interface DeckDecisionState {
  currentIndex: number;
  keptIds: number[];
  iteratedIds: number[];
}

export function advanceDeckCard(
  state: DeckDecisionState,
  projectId: number,
  decision: 'keep' | 'iterate',
  totalCards: number
): DeckDecisionState {
  const nextIndex = totalCards > 0 ? (state.currentIndex + 1) % totalCards : 0;
  if (decision === 'keep') {
    const keptIds = state.keptIds.includes(projectId)
      ? state.keptIds
      : [...state.keptIds, projectId];
    const iteratedIds = state.iteratedIds.filter((id) => id !== projectId);
    return { currentIndex: nextIndex, keptIds, iteratedIds };
  } else {
    const iteratedIds = state.iteratedIds.includes(projectId)
      ? state.iteratedIds
      : [...state.iteratedIds, projectId];
    const keptIds = state.keptIds.filter((id) => id !== projectId);
    return { currentIndex: nextIndex, keptIds, iteratedIds };
  }
}

export interface ProjectBriefInput {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
}

export interface BriefValidationErrors {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
}

export function normalizeBriefInput(input: ProjectBriefInput): ProjectBriefInput {
  // Postel's Law: Be liberal in what you accept, conservative in what you send
  const cleanName = input.name.replace(/\s+/g, ' ').trim();
  const cleanEmail = input.email
    .trim()
    .replace(/^mailto:/i, '')
    .replace(/\s+/g, '')
    .toLowerCase();
  const cleanCompany = (input.company || '').replace(/\s+/g, ' ').trim();
  const cleanMessage = input.message.trim();

  return {
    name: cleanName,
    email: cleanEmail,
    company: cleanCompany,
    service: input.service || 'Brand Identity',
    message: cleanMessage,
  };
}

export function validateProjectBrief(input: ProjectBriefInput): {
  valid: boolean;
  errors: BriefValidationErrors;
  normalized: ProjectBriefInput;
} {
  const normalized = normalizeBriefInput(input);
  const errors: BriefValidationErrors = {};

  if (!normalized.name) {
    errors.name = 'Your name is required';
  }

  if (!normalized.email) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!normalized.message) {
    errors.message = 'Please tell us about your project';
  } else if (normalized.message.length < 10) {
    errors.message = 'Project details must be at least 10 characters';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    normalized,
  };
}

export interface BriefProgressState {
  percent: number;
  completedSteps: number;
  totalSteps: number;
  fieldValid: {
    service: boolean;
    name: boolean;
    email: boolean;
    message: boolean;
  };
}

/**
 * Goal-Gradient Effect: Starts at 25% endowed progress (discipline pre-selected)
 * and advances smoothly to 100% as the user completes Name, Email, and Scope.
 */
export function computeBriefProgress(input: ProjectBriefInput): BriefProgressState {
  const normalized = normalizeBriefInput(input);
  const serviceValid = Boolean(normalized.service);
  const nameValid = normalized.name.length >= 2;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email);
  const messageValid = normalized.message.length >= 10;

  const completedSteps =
    (serviceValid ? 1 : 0) +
    (nameValid ? 1 : 0) +
    (emailValid ? 1 : 0) +
    (messageValid ? 1 : 0);

  return {
    percent: Math.round((completedSteps / 4) * 100),
    completedSteps,
    totalSteps: 4,
    fieldValid: {
      service: serviceValid,
      name: nameValid,
      email: emailValid,
      message: messageValid,
    },
  };
}

export interface SmartScopeTemplate {
  id: string;
  label: string;
  service: string;
  snippet: string;
}

/**
 * Tesler's Law & Recognition > Recall:
 * Pre-engineered studio scope snippets that absorb brief-writing complexity.
 */
export const SMART_SCOPE_TEMPLATES: SmartScopeTemplate[] = [
  {
    id: 'brand-system',
    label: '+ Full Brand Identity System',
    service: 'Brand Identity',
    snippet:
      'We are looking to commission a complete Brand Identity system including primary/secondary marks, chromatic palette, typography rules, and a Brand Usage Guidelines manual.',
  },
  {
    id: 'logo-mark',
    label: '+ Custom Vector Logo Mark',
    service: 'Logo Design',
    snippet:
      'We need a distinctive, scalable vector logo mark with monochrome lockups and master production files (AI, EPS, SVG, PNG).',
  },
  {
    id: 'print-suite',
    label: '+ Print Menu / Packaging Suite',
    service: 'Poster & Print',
    snippet:
      'We need press-ready print collateral (menus, pamphlets, or signage) with 300 DPI CMYK separation and exact bleed/trim setups.',
  },
  {
    id: 'digital-ui',
    label: '+ UI/UX & Social Design System',
    service: 'UI/UX Design',
    snippet:
      'We want to design a high-conversion web/mobile interface and cohesive social media template system in Figma.',
  },
];

export function getCategoryCounts(projects: ForgeProject[] = FORGE_PROJECTS): Record<ProjectCategory, number> {
  const counts: Record<ProjectCategory, number> = {
    All: projects.length,
    Branding: 0,
    Logos: 0,
    Digital: 0,
    Print: 0,
  };
  for (const p of projects) {
    if (counts[p.category] !== undefined) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
  }
  return counts;
}
