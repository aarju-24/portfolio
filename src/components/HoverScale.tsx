/**
 * HoverScale Component
 * Applies scale transform on hover and press states with smooth transitions
 * Respects prefers-reduced-motion preference
 * Uses GPU-accelerated transforms (scale only) for performance
 */

import {motion} from 'framer-motion';
import React from 'react';

import {ANIMATION_DURATIONS, ANIMATION_EASING, ANIMATION_SCALES} from '../config/animation';
import {HoverScaleProps} from '../types/animation';
import {getAnimationDuration, useMotionPreference} from '../utils/motion';

/**
 * HoverScale Component
 *
 * Wraps children with hover and press scale effects.
 * Scales to 1.05x on hover over 200-300ms.
 * Scales to 0.95x on press/tap.
 * Uses GPU-accelerated transforms (scale only).
 * Respects prefers-reduced-motion preference.
 *
 * @param props - Component props
 * @param props.children - Content to apply hover scale effect to
 * @param props.scale - Scale value on hover (default: 1.05)
 * @param props.duration - Animation duration in seconds (default: 0.2)
 * @param props.className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <HoverScale scale={1.05} duration={0.2}>
 *   <button>Click me</button>
 * </HoverScale>
 * ```
 *
 * @example
 * ```tsx
 * <HoverScale scale={1.1} duration={0.3}>
 *   <div className="card">Card content</div>
 * </HoverScale>
 * ```
 */
// eslint-disable-next-line react-memo/require-memo
export const HoverScale: React.FC<HoverScaleProps> = ({
  children,
  scale = ANIMATION_SCALES.hoverScale,
  duration = ANIMATION_DURATIONS.hoverScale,
  className = '',
}) => {
  const prefersReduced = useMotionPreference();

  // Adjust animation duration based on motion preference
  const animationDuration = getAnimationDuration(duration, prefersReduced);

  // Hover and press animation variants
  const hoverVariants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale,
      transition: {
        duration: animationDuration,
        ease: ANIMATION_EASING.easeInOut,
      },
    },
    tap: {
      scale: ANIMATION_SCALES.pressScale,
      transition: {
        duration: getAnimationDuration(ANIMATION_DURATIONS.pressScale, prefersReduced),
        ease: ANIMATION_EASING.easeInOut,
      },
    },
  };

  return (
    <motion.div className={className} initial="initial" variants={hoverVariants} whileHover="hover" whileTap="tap">
      {children}
    </motion.div>
  );
};

export default HoverScale;
