/**
 * Animation Configuration Constants
 * Centralized configuration for all animations in the portfolio
 */

export const ANIMATION_DURATIONS = {
  // Fade and entrance animations
  fadeIn: 0.6,
  fadeInSlow: 0.8,
  fadeInFast: 0.3,

  // Scroll-triggered animations
  scrollFadeIn: 0.6,
  scrollSlideUp: 0.6,

  // Hover effects
  hoverScale: 0.2,
  hoverColor: 0.2,
  hoverUnderline: 0.3,

  // Press/click effects
  pressScale: 0.15,

  // Parallax and background
  parallax: 0.5,
  blobAnimation: 20,

  // Form interactions
  formFocus: 0.2,
  formError: 0.3,
  formSuccess: 0.5,

  // Navigation
  smoothScroll: 0.9,
  headerTransition: 0.3,
  mobileMenuSlide: 0.3,
} as const;

export const ANIMATION_DELAYS = {
  // Stagger delays
  staggerSmall: 0.1,
  staggerMedium: 0.15,
  staggerLarge: 0.2,

  // Section delays
  sectionDelay: 0.2,
  childDelay: 0.1,

  // Form field delays
  formFieldDelay: 0.1,
} as const;

export const ANIMATION_EASING = {
  // Standard easing functions
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  linear: [0, 0, 1, 1],

  // Custom easing for specific effects
  smooth: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.68, -0.55, 0.265, 1.55],
} as const;

export const ANIMATION_THRESHOLDS = {
  // Intersection Observer thresholds for scroll-triggered animations
  fadeIn: 0.2,
  slideUp: 0.2,
  parallax: 0.1,
} as const;

export const ANIMATION_SCALES = {
  // Scale transforms for hover and press effects
  hoverScale: 1.05,
  pressScale: 0.95,
  cardHoverScale: 1.1,
  imageHoverScale: 1.1,
} as const;

export const PARALLAX_SPEEDS = {
  // Parallax scroll speeds (multiplier of scroll speed)
  slow: 0.5,
  medium: 0.3,
  fast: 0.7,
} as const;

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
} as const;

export const ANIMATION_VARIANTS = {
  // Framer Motion variants for common animations
  fadeInVariant: {
    hidden: {opacity: 0},
    visible: {opacity: 1},
  },
  slideUpVariant: {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0},
  },
  scaleVariant: {
    hidden: {opacity: 0, scale: 0.95},
    visible: {opacity: 1, scale: 1},
  },
  slideInFromLeftVariant: {
    hidden: {opacity: 0, x: -20},
    visible: {opacity: 1, x: 0},
  },
  slideInFromRightVariant: {
    hidden: {opacity: 0, x: 20},
    visible: {opacity: 1, x: 0},
  },
} as const;
