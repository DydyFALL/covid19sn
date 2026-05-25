import puppeteer from 'puppeteer';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath  = 'file://' + resolve(__dirname, 'collage.html');
const outPath   = resolve(__dirname, 'collage-export.png');

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  headless: true
});
const page = await browser.newPage();

// 1920×1080 – luxury full-HD canvas
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });

// Let fonts + animations settle
await new Promise(r => setTimeout(r, 2000));

await page.screenshot({ path: outPath, fullPage: false, type: 'png' });

console.log('Saved:', outPath);
await browser.close();
