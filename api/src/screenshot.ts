import { tmpdir } from 'os';
import path from 'path';
import puppeteer from 'puppeteer-core';
import crypto from 'crypto';
import sleep from 'common/helpers/sleep';

export const screenshot = async (options: { url: string, width?: number, height?: number }) => {
    const width = Math.min(options.width || 1920, 1920);
    const height = Math.min(options.height || 1920, 1920);
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.CHROME_BIN || '/usr/bin/chromium-browser',
        args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage'],
        defaultViewport: { width, height }
    });
    const page = await browser.newPage();
    await page.goto(options.url);
    await sleep(5000);
    const screenshotFile = path.join(tmpdir(), crypto.randomUUID() + '.png');
    await page.screenshot({ path: screenshotFile });
    await browser.close();
    return screenshotFile;
};

export default screenshot;