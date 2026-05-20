/**
 * Feature: niko-site-fixes, Property 2: All anchor elements have href attributes
 * Validates: Requirements 5.3
 *
 * Property: For any anchor (<a>) element in the HTML source of both pages,
 * the element should have a non-empty href attribute, ensuring graceful
 * degradation without JavaScript.
 */
import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { resolve } from 'path';

const siteDir = resolve(import.meta.dirname, '..');

function getAnchors(filePath) {
  const html = readFileSync(filePath, 'utf-8');
  const dom = new JSDOM(html);
  return Array.from(dom.window.document.querySelectorAll('a'));
}

describe('Property 2: All anchor elements have href attributes', () => {
  const indexAnchors = getAnchors(resolve(siteDir, 'index.html'));
  const wolfpaperAnchors = getAnchors(resolve(siteDir, 'wolfpaper.html'));
  const allAnchors = [
    ...indexAnchors.map((a) => ({ page: 'index.html', anchor: a })),
    ...wolfpaperAnchors.map((a) => ({ page: 'wolfpaper.html', anchor: a })),
  ];

  it('every anchor element across both pages has a non-empty href (property-based)', () => {
    // Use fast-check to randomly sample anchors and verify the property holds
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: allAnchors.length - 1 }),
        (index) => {
          const { anchor } = allAnchors[index];
          const href = anchor.getAttribute('href');
          // Property: href must exist and be non-empty
          return href !== null && href.trim().length > 0;
        }
      ),
      { numRuns: Math.min(100, allAnchors.length * 10) }
    );
  });
});
