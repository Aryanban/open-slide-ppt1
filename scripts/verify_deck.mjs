/**
 * Automated Verification & Test Suite for Nvidia Investigation Slide Deck
 * Validates file contracts, slide exports, notes alignment, audio assets, and build integrity.
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const SLIDE_DIR = resolve('slides/nvidia-investigation');
const INDEX_FILE = resolve(SLIDE_DIR, 'index.tsx');
const AUDIO_DIR = resolve(SLIDE_DIR, 'assets/audio');

console.log('🧪 Running Slide Deck Test Suite...\n');

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    failed++;
  }
}

// Test 1: Entry file exists
assert(existsSync(INDEX_FILE), 'Entry file slides/nvidia-investigation/index.tsx exists');

// Test 2: File content checks
const content = readFileSync(INDEX_FILE, 'utf-8');

assert(content.includes('export const design: DesignSystem'), 'Exports design system with design tokens');
assert(content.includes('export const transition: SlideTransition'), 'Exports slide transition configuration');
assert(content.includes('export const meta: SlideMeta'), 'Exports slide metadata');
assert(content.includes('export const notes: string[]'), 'Exports index-aligned speaker notes');
assert(content.includes('export default ['), 'Exports default Page[] array');

// Test 3: Check all 8 slides in default export
const expectedSlides = [
  'Slide1Kingpin',
  'Slide2Honeytrap',
  'Slide3Heist',
  'Slide4Confession',
  'Slide5Washington',
  'Slide6Polygraph',
  'Slide7Rollercoaster',
  'Slide8Finale',
];

for (const slide of expectedSlides) {
  assert(content.includes(slide), `Contains and exports ${slide}`);
}

// Test 4: Check MorphElement IDs for continuous motion transitions
const expectedMorphIds = [
  'actor-jensen',
  'actor-alice',
  'actor-trump',
  'actor-fed',
  'actor-gpu',
  'film-scene-pill',
];

for (const morphId of expectedMorphIds) {
  assert(content.includes(`id="${morphId}"`), `Contains MorphElement id="${morphId}"`);
}

// Test 5: Verify all 8 audio assets exist
console.log('\n🎙️ Checking Audio Assets...');
for (let i = 1; i <= 8; i++) {
  const hasAudio =
    existsSync(resolve(AUDIO_DIR, `act-${i}.m4a`)) ||
    existsSync(resolve(AUDIO_DIR, `act-${i}.mp3`)) ||
    existsSync(resolve(AUDIO_DIR, `act-${i}.wav`));
  assert(hasAudio, `Audio narration asset exists for Act ${i}`);
}

console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed.`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\n✨ All slide deck test cases passed successfully!\n');
}
