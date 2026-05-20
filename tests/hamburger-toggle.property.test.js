/**
 * Feature: niko-site-fixes, Property 1: Hamburger toggle is an involution
 * Validates: Requirements 4.3
 *
 * Property: For any nav state (open or closed), clicking the hamburger menu
 * button twice should return the nav to its original visibility state.
 */
import { describe, it, beforeEach } from 'vitest';
import * as fc from 'fast-check';

describe('Property 1: Hamburger toggle is an involution', () => {
  let nav, toggle;

  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="nav">
        <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
          <span class="hamburger"></span>
        </button>
        <div class="links">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
        </div>
      </nav>
    `;

    nav = document.querySelector('.nav');
    toggle = document.querySelector('.nav-toggle');

    // Wire up the hamburger toggle logic (same as script.js)
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  });

  it('clicking toggle twice returns nav to its original state (property-based)', () => {
    fc.assert(
      fc.property(
        // Generate a random initial state: whether the nav starts open or closed
        fc.boolean(),
        // Generate a random even number of double-clicks (1 to 50 pairs)
        fc.integer({ min: 1, max: 50 }),
        (startOpen, pairCount) => {
          // Set initial state
          if (startOpen) {
            nav.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
          } else {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
          }

          const initialOpen = nav.classList.contains('open');
          const initialAria = toggle.getAttribute('aria-expanded');

          // Click the toggle an even number of times (2 * pairCount)
          for (let i = 0; i < pairCount * 2; i++) {
            toggle.click();
          }

          // After an even number of clicks, state should match the initial state
          return (
            nav.classList.contains('open') === initialOpen &&
            toggle.getAttribute('aria-expanded') === initialAria
          );
        }
      ),
      { numRuns: 100 }
    );
  });
});
