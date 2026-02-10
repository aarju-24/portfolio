/**
 * ParallaxScroll Component
 * Implements parallax scroll effect with background movement at configurable speed
 * Uses transform: translateY for GPU acceleration
 * Requirements: 2.3, 4.5
 */

import {motion, useScroll, useTransform} from 'framer-motion';
import React, {FC, memo, ReactNode, useRef} from 'react';

import {PARALLAX_SPEEDS} from '../config/animation';
import {useMotionPreference} from '../utils/motion';

/**
 * Props for ParallaxScroll component
 */
export interface ParallaxScrollProps {
  /** Content to display */
  children: ReactNode;
  /** Parallax speed multiplier (0.5 = half scroll speed) */
  speed?: number;
  /** Additional CSS classes */
  className?: string;
  /** Background color or image */
  background?: string;
  /** Minimum height of the parallax container */
  minHeight?: string;
}

/**
 * ParallaxScroll Component
 *
 * Renders a parallax scroll effect where:
 * - Background elements move at 0.5x scroll speed (configurable)
 * - Uses GPU-accelerated transform: translateY
 * - Maintains 60fps performance
 * - Respects prefers-reduced-motion preference
 * - Works on all modern browsers
 *
 * @param props - Component props
 * @param props.children - Content to display
 * @param props.speed - Parallax speed multiplier (default: 0.5)
 * @param props.className - Additional CSS classes
 * @param props.background - Background color or image
 * @param props.minHeight - Minimum height (default: '100vh')
 *
 * @example
 * ```tsx
 * <ParallaxScroll speed={0.5} background="linear-gradient(...)">
 *   <h1>Hero Section</h1>
 *   <p>Content here</p>
 * </ParallaxScroll>
 * ```
 */
export const ParallaxScroll: FC<ParallaxScrollProps> = memo(
  ({children, speed = PARALLAX_SPEEDS.slow, className = '', background, minHeight = '100vh'}) => {
    const prefersReduced = useMotionPreference();
    const containerRef = useRef<HTMLDivElement>(null);

    // Get scroll progress
    const {scrollY} = useScroll({
      target: containerRef,
      offset: ['start start', 'end start'],
    });

    // Transform scroll position to parallax offset
    // When speed is 0.5, background moves at half the scroll speed
    const parallaxY = useTransform(scrollY, value => {
      return prefersReduced ? 0 : value * speed;
    });

    return (
      <div className={`relative overflow-hidden ${className}`} ref={containerRef} style={{minHeight}}>
        {/* Parallax Background Layer */}
        <motion.div
          className="absolute inset-0 w-full"
          style={{
            y: parallaxY,
            backgroundImage: background,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: prefersReduced ? 'scroll' : 'fixed',
          }}
        />

        {/* Content Layer */}
        <div className="relative z-10 h-full w-full">{children}</div>
      </div>
    );
  },
);

ParallaxScroll.displayName = 'ParallaxScroll';

export default ParallaxScroll;
