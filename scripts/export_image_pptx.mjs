import { chromium } from '/Users/aryanbansal/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
import { resolve } from 'node:path';
import { copyFileSync, statSync } from 'node:fs';

const SLIDE_ID = 'nvidia-investigation';
const URL = `http://localhost:5173/s/${SLIDE_ID}`;
const LOCAL_TARGET = resolve('.', `${SLIDE_ID}-images.pptx`);
const USER_DOWNLOADS_TARGET = resolve('/Users/aryanbansal/Downloads', `${SLIDE_ID}-images.pptx`);

async function run() {
  console.log(`🚀 Launching Chromium to export Image PPTX for ${SLIDE_ID}...`);
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    acceptDownloads: true,
    viewport: { width: 1920, height: 1080 },
  });

  const page = await context.newPage();

  console.log(`🌐 Navigating to ${URL}...`);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });

  await page.waitForSelector('main', { timeout: 10000 });
  await page.waitForTimeout(1500);

  const downloadButton = page.locator('button[aria-label="Download"], button[title="Download"]');
  await downloadButton.waitFor({ state: 'visible', timeout: 5000 });
  await downloadButton.click();
  await page.waitForTimeout(500);

  const imagePptxMenuItem = page.locator('[role="menuitem"]:has-text("Export as image PPTX")');
  await imagePptxMenuItem.waitFor({ state: 'visible', timeout: 5000 });

  const downloadPromise = page.waitForEvent('download', { timeout: 180000 });
  console.log('🖱️ Clicking "Export as image PPTX"...');
  await imagePptxMenuItem.click();

  console.log('⏳ Rendering & rasterizing 1920x1080 slides...');
  const download = await downloadPromise;

  await download.saveAs(LOCAL_TARGET);
  console.log(`✅ Saved Image PPTX locally: ${LOCAL_TARGET}`);

  try {
    copyFileSync(LOCAL_TARGET, USER_DOWNLOADS_TARGET);
    console.log(`✅ Copied Image PPTX to User Downloads: ${USER_DOWNLOADS_TARGET}`);
  } catch (err) {
    console.warn(`Could not copy: ${err.message}`);
  }

  const stats = statSync(LOCAL_TARGET);
  console.log(`📊 File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB (${stats.size} bytes)`);

  await browser.close();
}

run().catch((err) => {
  console.error('❌ Error during Image PPTX export:', err);
  process.exit(1);
});
