// Run with Node and Playwright available; uses installed Chrome and rustc.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { execFileSync } = require('node:child_process');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'code-context-check-'));
  try {
    const url = pathToFileURL(path.resolve(__dirname, '../assets/code-context-example.html')).href;
    const page = await browser.newPage();
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', { value: {
        writeText: async text => { window.copiedSource = text; }
      } });
    });
    await page.goto(url);
    // Reader-wide pre styles must not create an inner panel beside the buttons.
    await page.addStyleTag({ content: 'pre { border: 1px solid red; border-radius: 4px; background: red; box-shadow: 1px 0 red; }' });
    const listings = page.locator('.code-listing');
    const first = listings.nth(0);
    const toggle = first.locator('.toggle-context');
    const checkTopSpacing = async () => {
      for (const listing of await listings.all()) {
        const geometry = await listing.evaluate(el => {
          const pre = el.querySelector('pre');
          const source = el.querySelector('[data-source]');
          const range = document.createRange();
          range.setStart(source.firstChild, 0);
          range.setEnd(source.firstChild, 1);
          const glyph = range.getBoundingClientRect();
          const controls = el.querySelector('.code-tools').getBoundingClientRect();
          const style = getComputedStyle(pre);
          return {
            topGap: glyph.top - pre.getBoundingClientRect().top,
            controlsBesideCode: pre.getBoundingClientRect().right <= controls.left,
            startsWithCode: /^\S/.test(source.textContent),
            continuousSurface: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'].every(property => style[property] === '0px') && style.borderRadius === '0px' && style.backgroundColor === 'rgba(0, 0, 0, 0)' && style.boxShadow === 'none'
          };
        });
        assert.ok(geometry.topGap >= 0 && geometry.topGap <= 24, 'Code must start near the top');
        assert.ok(geometry.controlsBesideCode, 'Buttons must not cover the source');
        assert.ok(geometry.startsWithCode, 'No added leading blank lines');
        assert.ok(geometry.continuousSurface, 'Nested source must not form a separate bordered panel');
      }
    };
    await checkTopSpacing();
    assert.equal(await listings.count(), 2);
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
    assert.equal(await first.locator('.snip:visible').count(), 2);
    assert.equal(await first.locator('.context-lines:visible').count(), 0);
    await toggle.focus();
    await page.keyboard.press('Space');
    await checkTopSpacing();
    assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
    assert.equal(await first.locator('.context-lines:visible').count(), 2);
    assert.equal(await first.locator('.snip:visible').count(), 0);
    assert.equal(await first.locator('.context-lines').first().evaluate(el => getComputedStyle(el).opacity), '0.72');
    assert.equal(await listings.nth(1).locator('.toggle-context').getAttribute('aria-expanded'), 'false');
    await page.keyboard.press('Enter');
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
    const sources = await listings.evaluateAll(items => items.map(item =>
      [...item.querySelectorAll('[data-source]')].map(el => el.textContent).join('')));
    await first.locator('.copy-code').click();
    assert.equal(await page.evaluate(() => window.copiedSource), sources[0]);
    assert.ok(!sources[0].includes('--snip--'));
    assert.ok(sources[0].includes('println!("Accepted: {number}");'));
    await page.emulateMedia({ media: 'print' });
    assert.equal(await page.locator('.context-lines:visible').count(), 4);
    assert.equal(await first.locator('.context-lines').first().evaluate(el => getComputedStyle(el).opacity), '1');
    assert.equal(await page.locator('.code-tools:visible, .snip:visible').count(), 0);
    const fallback = await browser.newPage({ javaScriptEnabled: false });
    await fallback.goto(url);
    assert.equal(await fallback.locator('.context-lines:visible').count(), 4);
    assert.equal(await fallback.locator('.code-tools:visible, .snip:visible').count(), 0);
    await page.emulateMedia({ media: 'screen' });
    await page.setViewportSize({ width: 375, height: 800 });
    await checkTopSpacing();
    assert.ok(await first.locator('pre').evaluate(el =>
      getComputedStyle(el).overflowX === 'auto' && el.scrollWidth > el.clientWidth));
    for (const [index, source] of sources.entries()) {
      const filename = path.join(folder, `example_${index}.rs`);
      const executable = path.join(folder, `example_${index}${process.platform === 'win32' ? '.exe' : ''}`);
      fs.writeFileSync(filename, source);
      execFileSync('rustc', ['--edition=2024', filename, '-o', executable]);
      const output = execFileSync(executable, { encoding: 'utf8' }).replace(/\r/g, '');
      assert.equal(output, index === 0 ? 'Accepted: 18\nAccepted: 27\n' : 'Still waiting: 2\n');
    }
    console.log('Passed: compact top spacing, unobstructed controls, code views, keyboard, independent toggles, full copy, print, no-JS, narrow layout, and both Rust examples.');
  } finally {
    await browser.close();
    const relative = path.relative(os.tmpdir(), folder);
    assert.ok(!path.isAbsolute(relative) && /^code-context-check-[^\\/]+$/.test(relative));
    fs.rmSync(folder, { recursive: true, force: true });
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
