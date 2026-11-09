import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  distributeIntoMasonryLanes,
  advanceDeckCard,
  validateProjectBrief,
  getCategoryCounts,
  buildMomentsWallGrid,
  smoothstep,
} from './archiveLogic';
import { FORGE_PROJECTS } from '../data/forgeData';

test('FORGE_PROJECTS contains all authentic Design Forge mockup works', () => {
  assert.equal(FORGE_PROJECTS.length, 12);
  const counts = getCategoryCounts(FORGE_PROJECTS);
  assert.equal(counts.All, 12);
  assert.equal(counts.Logos, 2);
  assert.equal(counts.Branding, 2);
  assert.equal(counts.Digital, 2);
  assert.equal(counts.Print, 6);
});

test('filterProjects filters accurately by category and search query', () => {
  const logos = filterProjects(FORGE_PROJECTS, {
    category: 'Logos',
    query: '',
    activeQuestId: null,
  });
  assert.equal(logos.length, 2);
  assert.ok(logos.every((p) => p.category === 'Logos'));

  const elysiumQuery = filterProjects(FORGE_PROJECTS, {
    category: 'All',
    query: 'Elysium',
    activeQuestId: null,
  });
  assert.equal(elysiumQuery.length, 1);
});

test('buildMomentsWallGrid constructs a parting wall with zero duplicate projects and large tile dimensions', () => {
  const grid = buildMomentsWallGrid({ vw: 1440, vh: 900, isMobile: false }, FORGE_PROJECTS);
  assert.equal(grid.cells.length, FORGE_PROJECTS.length);
  const uniquePhotoIndices = new Set(grid.cells.map((c) => c.photoIndex));
  assert.equal(uniquePhotoIndices.size, FORGE_PROJECTS.length);
  assert.ok(grid.cells.every((c) => c.height >= 190));
  assert.equal(smoothstep(0, 10, 5), 0.5);
});

test('distributeIntoMasonryLanes distributes items evenly across 5 lanes', () => {
  const lanes = distributeIntoMasonryLanes(FORGE_PROJECTS, 5);
  assert.equal(lanes.length, 5);
  const totalItems = lanes.reduce((sum, lane) => sum + lane.length, 0);
  assert.equal(totalItems, 12);
  assert.ok(lanes.every((lane) => lane.length >= 2 && lane.length <= 3));
});

test('advanceDeckCard records keep and iterate decisions and wraps index', () => {
  let state = { currentIndex: 0, keptIds: [] as number[], iteratedIds: [] as number[] };
  state = advanceDeckCard(state, 8, 'keep', 3);
  assert.equal(state.currentIndex, 1);
  assert.deepEqual(state.keptIds, [8]);

  state = advanceDeckCard(state, 1, 'iterate', 3);
  assert.equal(state.currentIndex, 2);
  assert.deepEqual(state.iteratedIds, [1]);

  state = advanceDeckCard(state, 8, 'iterate', 3);
  assert.equal(state.currentIndex, 0);
  assert.deepEqual(state.keptIds, []);
  assert.deepEqual(state.iteratedIds, [1, 8]);
});

test('validateProjectBrief rejects empty or invalid inputs and accepts valid briefs', () => {
  const invalidResult = validateProjectBrief({
    name: '   ',
    email: 'not-an-email',
    company: '',
    service: 'Logo Design',
    message: 'short',
  });
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.name);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.message);

  const validResult = validateProjectBrief({
    name: '  Aarav   Sharma  ',
    email: '  mailto:AARAV@ELYSIUM.IN ',
    company: '  Elysium   Labs ',
    service: 'Brand Identity',
    message: 'We need a complete visual identity system and packaging guidelines.',
  });
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
  assert.equal(validResult.normalized.name, 'Aarav Sharma');
  assert.equal(validResult.normalized.email, 'aarav@elysium.in');
  assert.equal(validResult.normalized.company, 'Elysium Labs');
});

test('computeBriefProgress calculates Goal-Gradient completion from 25% endowed start to 100%', async () => {
  const { computeBriefProgress, SMART_SCOPE_TEMPLATES } = await import('./archiveLogic');
  const initial = computeBriefProgress({
    name: '',
    email: '',
    service: 'Brand Identity',
    message: '',
  });
  assert.equal(initial.percent, 25);
  assert.equal(initial.completedSteps, 1);

  const half = computeBriefProgress({
    name: 'Aarav',
    email: 'invalid',
    service: 'Brand Identity',
    message: '',
  });
  assert.equal(half.percent, 50);

  const complete = computeBriefProgress({
    name: 'Aarav',
    email: 'aarav@elysium.in',
    service: 'Brand Identity',
    message: SMART_SCOPE_TEMPLATES[0].snippet,
  });
  assert.equal(complete.percent, 100);
  assert.equal(complete.completedSteps, 4);
});
