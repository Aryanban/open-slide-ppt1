import { chromium } from '/Users/aryanbansal/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
import { resolve } from 'node:path';
import { copyFileSync, statSync } from 'node:fs';

const SLIDE_ID = 'nvidia-investigation';
const URL = `http://localhost:5173/s/${SLIDE_ID}`;
const LOCAL_TARGET = resolve('.', `${SLIDE_ID}.pptx`);
const USER_DOWNLOADS_TARGET = resolve('/Users/aryanbansal/Downloads', `${SLIDE_ID}.pptx`);

async function run() {
  console.log(`🚀 Launching Chromium to export PPTX for ${SLIDE_ID}...`);
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    acceptDownloads: true,
    viewport: { width: 1920, height: 1080 },
  });

  const page = await context.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log(`[Browser Error] ${msg.text()}`);
    } else {
      console.log(`[Browser Log] ${msg.text()}`);
    }
  });

  page.on('pageerror', (err) => {
    console.error(`[Browser PageError]`, err);
  });

  console.log(`🌐 Navigating to ${URL}...`);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });

  console.log('📄 Page loaded. Waiting for main canvas...');
  await page.waitForSelector('main', { timeout: 10000 });
  await page.waitForTimeout(1500);

  console.log('🔍 Locating Download button...');
  const downloadButton = page.locator('button[aria-label="Download"], button[title="Download"]');
  await downloadButton.waitFor({ state: 'visible', timeout: 5000 });
  console.log('🖱️ Clicking Download button...');
  await downloadButton.click();

  await page.waitForTimeout(500);

  console.log('🔍 Locating "Export as PPTX" menu item...');
  const pptxMenuItem = page.locator('[role="menuitem"]:has-text("Export as PPTX")');
  await pptxMenuItem.waitFor({ state: 'visible', timeout: 5000 });

  // Prepare download listener before click
  const downloadPromise = page.waitForEvent('download', { timeout: 120000 });

  console.log('🖱️ Clicking "Export as PPTX"...');
  await pptxMenuItem.click();

  console.log('⏳ Waiting for PPTX generation & download event (processing 8 slides offscreen)...');
  const download = await downloadPromise;

  const suggestedFilename = download.suggestedFilename();
  console.log(`📥 Download started: ${suggestedFilename}`);

  await download.saveAs(LOCAL_TARGET);
  console.log(`✅ Saved PPTX locally: ${LOCAL_TARGET}`);

  // Also copy to user Downloads directory
  try {
    copyFileSync(LOCAL_TARGET, USER_DOWNLOADS_TARGET);
    console.log(`✅ Copied PPTX to User Downloads: ${USER_DOWNLOADS_TARGET}`);
  } catch (err) {
    console.warn(`Could not copy to user downloads: ${err.message}`);
  }

  const stats = statSync(LOCAL_TARGET);
  console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB (${stats.size} bytes)`);

  await browser.close();
  console.log('🎉 PPTX export completed successfully!');
}

run().catch((err) => {
  console.error('❌ Error during PPTX export:', err);
  process.exit(1);
});
