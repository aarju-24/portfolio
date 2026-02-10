/**
 * Motion Preference Context
 * Provides motion preference state and toggle functionality
 * Detects prefers-reduced-motion media query
 * Allows manual toggle of animations
 * Requirements: 2.5, 9.1
 */

import React, {createContext, FC, memo, ReactNode, useContext, useEffect, useState} from 'react';

import {prefersReducedMotion} from '../utils/motion';

/**
 * Motion context value
 */
interface MotionContextValue {
  /** Whether reduced motion is preferred */
  prefersReducedMotion: boolean;
  /** Whether animations are manually disabled */
  isAnimationsDisabled: boolean;
  /** Toggle animations on/off */
  toggleAnimations: () => void;
  /** Set animations disabled state */
  setAnimationsDisabled: (disabled: boolean) => void;
}

/**
 * Motion context
 */
const MotionContext = createContext<MotionContextValue | undefined>(undefined);

/**
 * Props for MotionProvider
 */
interface MotionProviderProps {
  children: ReactNode;
}

/**
 * MotionProvider Component
 *
 * Provides motion preference context to all child components
 * Detects system prefers-reduced-motion preference
 * Allows manual toggle of animations
 * Persists animation preference to localStorage
 *
 * @param props - Component props
 * @param props.children - Child components
 *
 * @example
 * ```tsx
 * <MotionProvider>
 *   <App />
 * </MotionProvider>
 * ```
 */
export const MotionProvider: FC<MotionProviderProps> = memo(({children}) => {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isAnimationsDisabled, setAnimationsDisabled] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize motion preferences on mount
  useEffect(() => {
    // Check system preference
    setPrefersReduced(prefersReducedMotion());

    // Check localStorage for manual toggle
    const savedPreference = localStorage.getItem('animations-disabled');
    if (savedPreference !== null) {
      setAnimationsDisabled(JSON.parse(savedPreference));
    }

    setIsHydrated(true);
  }, []);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Save animation preference to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('animations-disabled', JSON.stringify(isAnimationsDisabled));
    }
  }, [isAnimationsDisabled, isHydrated]);

  const toggleAnimations = () => {
    setAnimationsDisabled(prev => !prev);
  };

  const value: MotionContextValue = {
    prefersReducedMotion: prefersReduced || isAnimationsDisabled,
    isAnimationsDisabled,
    toggleAnimations,
    setAnimationsDisabled,
  };

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
});

MotionProvider.displayName = 'MotionProvider';

/**
 * Hook to use motion context
 * @returns Motion context value
 *
 * @example
 * ```tsx
 * const { prefersReducedMotion, toggleAnimations } = useMotionContext();
 * ```
 */
export const useMotionContext = (): MotionContextValue => {
  const context = useContext(MotionContext);
  if (context === undefined) {
    throw new Error('useMotionContext must be used within MotionProvider');
  }
  return context;
};

export default MotionContext;
