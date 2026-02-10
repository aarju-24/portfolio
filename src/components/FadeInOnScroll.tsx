/**
 * FadeInOnScroll Component
 * Fades in content when it enters the viewport using Intersection Observer
 * Respects prefers-reduced-motion preference
 * Uses GPU-accelerated opacity transforms for performance
 */

import {motion} from 'framer-motion';
import React, {useEffect, useRef, useState} from 'react';

import {ANIMATION_DURATIONS, ANIMATION_EASING, ANIMATION_THRESHOLDS} from '../config/animation';
import {FadeInOnScrollProps} from '../types/animation';
import {getAnimationDelay, getAnimationDuration, useMotionPreference} from '../utils/motion';

/**
 * FadeInOnScroll Component
 *
 * Detects when an element enters the viewport and triggers a fade-in animation.
 * Uses Intersection Observer API for efficient scroll detection.
 * Respects user's prefers-reduced-motion preference.
 *
 * @param props - Component props
 * @param props.children - Content to fade in
 * @param props.duration - Animation duration in seconds (default: 0.6)
 * @param props.delay - Animation delay in seconds (default: 0)
 * @param props.threshold - Intersection Observer threshold (default: 0.2)
 * @param props.className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <FadeInOnScroll duration={0.8} delay={0.2}>
 *   <div>Content that fades in on scroll</div>
 * </FadeInOnScroll>
 * ```
 */
// eslint-disable-next-line react-memo/require-memo
export const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({
  children,
  duration = ANIMATION_DURATIONS.scrollFadeIn,
  delay = 0,
  threshold = ANIMATION_THRESHOLDS.fadeIn,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = useMotionPreference();

  // Adjust animation duration and delay based on motion preference
  const animationDuration = getAnimationDuration(duration, prefersReduced);
  const animationDelay = getAnimationDelay(delay, prefersReduced);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When element enters viewport, set visible to true
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve after animation triggers to avoid re-triggering
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
      },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <motion.div
      animate={isVisible ? {opacity: 1} : {opacity: 0}}
      className={className}
      initial={{opacity: 0}}
      ref={ref}
      transition={{
        duration: animationDuration,
        delay: animationDelay,
        ease: ANIMATION_EASING.easeInOut,
      }}>
      {children}
    </motion.div>
  );
};

export default FadeInOnScroll;
