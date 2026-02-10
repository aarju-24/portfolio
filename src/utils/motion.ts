/**
 * Motion Preference Utilities
 * Utilities for detecting and respecting user motion preferences
 */

import {useEffect, useState} from 'react';

/**
 * Detects if the user has prefers-reduced-motion enabled
 * @returns boolean indicating if reduced motion is preferred
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Hook to detect motion preference changes
 * Checks both system preference and manual toggle
 * @returns boolean indicating if reduced motion is preferred
 */
export const useMotionPreference = (): boolean => {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    // Set initial value
    setPrefersReduced(prefersReducedMotion());

    // Check localStorage for manual toggle
    const savedPreference = localStorage.getItem('animations-disabled');
    if (savedPreference !== null) {
      setPrefersReduced(JSON.parse(savedPreference) || prefersReducedMotion());
    }

    // Create media query listener
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      const savedPreference = localStorage.getItem('animations-disabled');
      const isManuallyDisabled = savedPreference ? JSON.parse(savedPreference) : false;
      setPrefersReduced(e.matches || isManuallyDisabled);
    };

    // Add listener for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReduced;
};

/**
 * Gets animation duration based on motion preference
 * @param duration - desired duration in seconds
 * @param prefersReduced - whether reduced motion is preferred
 * @returns adjusted duration (0 if reduced motion is preferred)
 */
export const getAnimationDuration = (duration: number, prefersReduced: boolean): number => {
  return prefersReduced ? 0 : duration;
};

/**
 * Gets animation delay based on motion preference
 * @param delay - desired delay in seconds
 * @param prefersReduced - whether reduced motion is preferred
 * @returns adjusted delay (0 if reduced motion is preferred)
 */
export const getAnimationDelay = (delay: number, prefersReduced: boolean): number => {
  return prefersReduced ? 0 : delay;
};

/**
 * Gets animation configuration based on motion preference
 * @param config - animation configuration object
 * @param prefersReduced - whether reduced motion is preferred
 * @returns adjusted configuration
 */
export const getAnimationConfig = (
  config: {duration: number; delay: number},
  prefersReduced: boolean,
): {duration: number; delay: number} => {
  if (prefersReduced) {
    return {duration: 0, delay: 0};
  }
  return config;
};

/**
 * Determines if animations should be disabled
 * @returns boolean indicating if animations should be disabled
 */
export const shouldDisableAnimations = (): boolean => {
  return prefersReducedMotion();
};
