/**
 * Smooth Scroll Utilities
 * Provides smooth scrolling functionality for navigation
 * Requirements: 6.3
 */

import {ANIMATION_DURATIONS} from '../config/animation';

/**
 * Smoothly scrolls to a target element
 * Uses requestAnimationFrame for smooth 60fps animation
 * Duration: 800-1000ms (default 900ms)
 *
 * @param targetId - ID of the target element to scroll to
 * @param duration - Duration of scroll animation in milliseconds (default: 900)
 * @param offset - Offset from top in pixels (default: 80 for header)
 *
 * @example
 * ```tsx
 * smoothScrollToElement('portfolio', 900, 80);
 * ```
 */
export const smoothScrollToElement = (
  targetId: string,
  duration: number = ANIMATION_DURATIONS.smoothScroll * 1000,
  offset: number = 80,
): void => {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) {
    console.warn(`Element with id "${targetId}" not found`);
    return;
  }

  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const scroll = (currentTime: number): void => {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  };

  requestAnimationFrame(scroll);
};

/**
 * Smoothly scrolls to a specific position
 * Uses requestAnimationFrame for smooth 60fps animation
 *
 * @param targetY - Target Y position in pixels
 * @param duration - Duration of scroll animation in milliseconds (default: 900)
 *
 * @example
 * ```tsx
 * smoothScrollToPosition(500, 900);
 * ```
 */
export const smoothScrollToPosition = (
  targetY: number,
  duration: number = ANIMATION_DURATIONS.smoothScroll * 1000,
): void => {
  const startPosition = window.scrollY;
  const distance = targetY - startPosition;
  let startTime: number | null = null;

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const scroll = (currentTime: number): void => {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  };

  requestAnimationFrame(scroll);
};

/**
 * Extracts the target ID from a hash href
 * @param href - Hash href like "#portfolio"
 * @returns Target ID without the hash
 *
 * @example
 * ```tsx
 * getTargetIdFromHref('#portfolio'); // returns 'portfolio'
 * ```
 */
export const getTargetIdFromHref = (href: string): string => {
  return href.startsWith('#') ? href.slice(1) : href;
};
