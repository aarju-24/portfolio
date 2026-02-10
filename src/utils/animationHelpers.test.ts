/**
 * Tests for Animation Helper Utilities
 */

import {
  calculateTotalDuration,
  createFadeInVariants,
  createHoverVariants,
  createScaleVariants,
  createSlideUpVariants,
  createStaggerContainerVariants,
  createStaggerDelays,
  createStaggerItemVariants,
  easingToCubicBezier,
} from './animationHelpers';

describe('Animation Helper Utilities', () => {
  describe('createStaggerDelays', () => {
    it('should create correct stagger delays', () => {
      const delays = createStaggerDelays(3, 0.1, 0);
      expect(delays).toEqual([0, 0.1, 0.2]);
    });

    it('should respect initial delay', () => {
      const delays = createStaggerDelays(3, 0.1, 0.2);
      expect(delays).toEqual([0.2, 0.3, 0.4]);
    });

    it('should handle single item', () => {
      const delays = createStaggerDelays(1, 0.1, 0);
      expect(delays).toEqual([0]);
    });
  });

  describe('calculateTotalDuration', () => {
    it('should calculate total duration correctly', () => {
      const total = calculateTotalDuration(3, 0.6, 0.1);
      expect(total).toBe(0.8); // 0.6 + (3-1) * 0.1
    });

    it('should handle single item', () => {
      const total = calculateTotalDuration(1, 0.6, 0.1);
      expect(total).toBe(0.6);
    });

    it('should handle zero stagger delay', () => {
      const total = calculateTotalDuration(5, 0.6, 0);
      expect(total).toBe(0.6);
    });
  });

  describe('createFadeInVariants', () => {
    it('should create fade-in variants with default values', () => {
      const variants = createFadeInVariants();
      expect(variants.hidden).toEqual({opacity: 0});
      expect(variants.visible.opacity).toBe(1);
      expect(variants.visible.transition.duration).toBe(0.6);
      expect(variants.visible.transition.delay).toBe(0);
    });

    it('should create fade-in variants with custom duration and delay', () => {
      const variants = createFadeInVariants(0.8, 0.2);
      expect(variants.visible.transition.duration).toBe(0.8);
      expect(variants.visible.transition.delay).toBe(0.2);
    });
  });

  describe('createSlideUpVariants', () => {
    it('should create slide-up variants with default values', () => {
      const variants = createSlideUpVariants();
      expect(variants.hidden).toEqual({opacity: 0, y: 20});
      expect(variants.visible).toEqual(
        expect.objectContaining({
          opacity: 1,
          y: 0,
        }),
      );
    });

    it('should create slide-up variants with custom distance', () => {
      const variants = createSlideUpVariants(0.6, 0, 40);
      expect(variants.hidden.y).toBe(40);
    });
  });

  describe('createScaleVariants', () => {
    it('should create scale variants with default values', () => {
      const variants = createScaleVariants();
      expect(variants.hidden).toEqual({opacity: 0, scale: 0.95});
      expect(variants.visible).toEqual(
        expect.objectContaining({
          opacity: 1,
          scale: 1,
        }),
      );
    });

    it('should create scale variants with custom scale', () => {
      const variants = createScaleVariants(0.6, 0, 0.8);
      expect(variants.hidden.scale).toBe(0.8);
    });
  });

  describe('createHoverVariants', () => {
    it('should create hover variants with default scale', () => {
      const variants = createHoverVariants();
      expect(variants.initial).toEqual({scale: 1});
      expect(variants.hover.scale).toBe(1.05);
      expect(variants.tap.scale).toBe(0.95);
    });

    it('should create hover variants with custom scale', () => {
      const variants = createHoverVariants(1.1);
      expect(variants.hover.scale).toBe(1.1);
    });
  });

  describe('createStaggerContainerVariants', () => {
    it('should create stagger container variants', () => {
      const variants = createStaggerContainerVariants(0.1, 0);
      expect(variants.hidden).toEqual({opacity: 0});
      expect(variants.visible.opacity).toBe(1);
      expect(variants.visible.transition.staggerChildren).toBe(0.1);
      expect(variants.visible.transition.delayChildren).toBe(0);
    });

    it('should respect delay children', () => {
      const variants = createStaggerContainerVariants(0.1, 0.2);
      expect(variants.visible.transition.delayChildren).toBe(0.2);
    });
  });

  describe('createStaggerItemVariants', () => {
    it('should create stagger item variants', () => {
      const variants = createStaggerItemVariants();
      expect(variants.hidden).toEqual({opacity: 0, y: 20});
      expect(variants.visible).toEqual(
        expect.objectContaining({
          opacity: 1,
          y: 0,
        }),
      );
    });
  });

  describe('easingToCubicBezier', () => {
    it('should convert easing array to cubic-bezier string', () => {
      const easing = [0.4, 0, 0.2, 1];
      expect(easingToCubicBezier(easing)).toBe('cubic-bezier(0.4, 0, 0.2, 1)');
    });

    it('should handle different easing values', () => {
      const easing = [0.25, 0.46, 0.45, 0.94];
      expect(easingToCubicBezier(easing)).toBe('cubic-bezier(0.25, 0.46, 0.45, 0.94)');
    });
  });
});
