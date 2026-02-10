/**
 * Tests for Motion Preference Utilities
 */

import {getAnimationConfig, getAnimationDelay, getAnimationDuration, prefersReducedMotion} from './motion';

describe('Motion Preference Utilities', () => {
  describe('prefersReducedMotion', () => {
    it('should return false when prefers-reduced-motion is not set', () => {
      // Mock matchMedia
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      expect(prefersReducedMotion()).toBe(false);
    });

    it('should return true when prefers-reduced-motion is set', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      expect(prefersReducedMotion()).toBe(true);
    });
  });

  describe('getAnimationDuration', () => {
    it('should return the duration when reduced motion is not preferred', () => {
      expect(getAnimationDuration(0.6, false)).toBe(0.6);
      expect(getAnimationDuration(1.0, false)).toBe(1.0);
    });

    it('should return 0 when reduced motion is preferred', () => {
      expect(getAnimationDuration(0.6, true)).toBe(0);
      expect(getAnimationDuration(1.0, true)).toBe(0);
    });
  });

  describe('getAnimationDelay', () => {
    it('should return the delay when reduced motion is not preferred', () => {
      expect(getAnimationDelay(0.2, false)).toBe(0.2);
      expect(getAnimationDelay(0.5, false)).toBe(0.5);
    });

    it('should return 0 when reduced motion is preferred', () => {
      expect(getAnimationDelay(0.2, true)).toBe(0);
      expect(getAnimationDelay(0.5, true)).toBe(0);
    });
  });

  describe('getAnimationConfig', () => {
    it('should return the config when reduced motion is not preferred', () => {
      const config = {duration: 0.6, delay: 0.2};
      expect(getAnimationConfig(config, false)).toEqual(config);
    });

    it('should return zero duration and delay when reduced motion is preferred', () => {
      const config = {duration: 0.6, delay: 0.2};
      expect(getAnimationConfig(config, true)).toEqual({duration: 0, delay: 0});
    });
  });
});
