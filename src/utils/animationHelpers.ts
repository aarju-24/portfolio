/**
 * Animation Helper Utilities
 * Utility functions for common animation patterns
 */

import {ANIMATION_DELAYS, ANIMATION_DURATIONS, ANIMATION_EASING} from '../config/animation';

/**
 * Creates a stagger animation configuration
 * @param itemCount - number of items to stagger
 * @param staggerDelay - delay between each item
 * @param initialDelay - initial delay before first item
 * @returns array of delays for each item
 */
export const createStaggerDelays = (
  itemCount: number,
  staggerDelay: number = ANIMATION_DELAYS.staggerSmall,
  initialDelay: number = 0,
): number[] => {
  return Array.from({length: itemCount}, (_, i) => initialDelay + i * staggerDelay);
};

/**
 * Calculates total animation duration including stagger
 * @param itemCount - number of items
 * @param itemDuration - duration of each item animation
 * @param staggerDelay - delay between items
 * @returns total duration in seconds
 */
export const calculateTotalDuration = (itemCount: number, itemDuration: number, staggerDelay: number): number => {
  return itemDuration + (itemCount - 1) * staggerDelay;
};

/**
 * Creates animation variants for fade-in effect
 * @param duration - animation duration
 * @param delay - animation delay
 * @returns animation variants object
 */
export const createFadeInVariants = (duration: number = ANIMATION_DURATIONS.fadeIn, delay: number = 0) => ({
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: ANIMATION_EASING.easeInOut,
    },
  },
});

/**
 * Creates animation variants for slide-up effect
 * @param duration - animation duration
 * @param delay - animation delay
 * @param distance - slide distance in pixels
 * @returns animation variants object
 */
export const createSlideUpVariants = (
  duration: number = ANIMATION_DURATIONS.scrollSlideUp,
  delay: number = 0,
  distance: number = 20,
) => ({
  hidden: {opacity: 0, y: distance},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: ANIMATION_EASING.easeInOut,
    },
  },
});

/**
 * Creates animation variants for scale effect
 * @param duration - animation duration
 * @param delay - animation delay
 * @param scale - scale value
 * @returns animation variants object
 */
export const createScaleVariants = (
  duration: number = ANIMATION_DURATIONS.fadeIn,
  delay: number = 0,
  scale: number = 0.95,
) => ({
  hidden: {opacity: 0, scale},
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration,
      delay,
      ease: ANIMATION_EASING.easeInOut,
    },
  },
});

/**
 * Creates animation variants for hover effect
 * @param scale - scale value on hover
 * @param duration - animation duration
 * @returns animation variants object
 */
export const createHoverVariants = (scale: number = 1.05, duration: number = ANIMATION_DURATIONS.hoverScale) => ({
  initial: {scale: 1},
  hover: {
    scale,
    transition: {
      duration,
      ease: ANIMATION_EASING.easeInOut,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: ANIMATION_DURATIONS.pressScale,
    },
  },
});

/**
 * Creates animation variants for parallax effect
 * @param speed - parallax speed multiplier
 * @returns animation variants object
 */
export const createParallaxVariants = (speed: number = 0.5) => ({
  initial: {y: 0},
  animate: (scrollY: number) => ({
    y: scrollY * speed,
    transition: {
      type: 'tween',
      ease: 'linear',
    },
  }),
});

/**
 * Creates stagger container variants
 * @param staggerDelay - delay between children
 * @param delayChildren - initial delay before first child
 * @returns animation variants object
 */
export const createStaggerContainerVariants = (
  staggerDelay: number = ANIMATION_DELAYS.staggerSmall,
  delayChildren: number = 0,
) => ({
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

/**
 * Creates stagger item variants
 * @param duration - animation duration
 * @returns animation variants object
 */
export const createStaggerItemVariants = (duration: number = ANIMATION_DURATIONS.fadeIn) => ({
  hidden: {opacity: 0, y: 20},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: ANIMATION_EASING.easeInOut,
    },
  },
});

/**
 * Converts easing array to CSS cubic-bezier string
 * @param easing - easing array [x1, y1, x2, y2]
 * @returns CSS cubic-bezier string
 */
export const easingToCubicBezier = (easing: number[]): string => {
  return `cubic-bezier(${easing.join(', ')})`;
};
