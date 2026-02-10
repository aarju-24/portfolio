/**
 * UnderlineAnimation Component
 * Animates underline from left to right on hover
 * Duration 300ms with smooth easing
 * Supports active state styling
 * Requirements: 3.3
 */

import {motion} from 'framer-motion';
import React, {FC, memo, ReactNode, useState} from 'react';

import {ANIMATION_DURATIONS, ANIMATION_EASING} from '../config/animation';
import {getAnimationDuration, useMotionPreference} from '../utils/motion';

/**
 * Props for UnderlineAnimation component
 */
export interface UnderlineAnimationProps {
  /** Link text or content */
  children: ReactNode;
  /** Link href */
  href?: string;
  /** Whether link is active */
  isActive?: boolean;
  /** Callback when link is clicked */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Additional CSS classes */
  className?: string;
  /** Underline color */
  underlineColor?: string;
  /** Underline height */
  underlineHeight?: string;
  /** Whether to show underline on active state */
  showActiveUnderline?: boolean;
}

/**
 * UnderlineAnimation Component
 *
 * Renders a link with animated underline that:
 * - Animates from left to right on hover (300ms)
 * - Uses smooth easing for natural motion
 * - Supports active state with persistent underline
 * - GPU-accelerated using scaleX transform
 * - Respects prefers-reduced-motion preference
 *
 * @param props - Component props
 * @param props.children - Link text or content
 * @param props.href - Link href
 * @param props.isActive - Whether link is active
 * @param props.onClick - Callback when link is clicked
 * @param props.className - Additional CSS classes
 * @param props.underlineColor - Underline color (default: 'bg-primary-600')
 * @param props.underlineHeight - Underline height (default: 'h-0.5')
 * @param props.showActiveUnderline - Show underline on active state (default: true)
 *
 * @example
 * ```tsx
 * <UnderlineAnimation href="#portfolio" isActive={activeSection === 'portfolio'}>
 *   Portfolio
 * </UnderlineAnimation>
 * ```
 */
export const UnderlineAnimation: FC<UnderlineAnimationProps> = memo(
  ({
    children,
    href = '#',
    isActive = false,
    onClick,
    className = '',
    underlineColor = 'bg-primary-600',
    underlineHeight = 'h-0.5',
    showActiveUnderline = true,
  }) => {
    const prefersReduced = useMotionPreference();
    const [isHovered, setIsHovered] = useState(false);

    // Animation duration for underline
    const underlineDuration = getAnimationDuration(ANIMATION_DURATIONS.hoverUnderline, prefersReduced);

    // Underline animation variants
    const underlineVariants = {
      initial: {
        scaleX: 0,
        originX: 0,
      },
      hover: {
        scaleX: 1,
        transition: {
          duration: underlineDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
      active: {
        scaleX: 1,
        transition: {
          duration: underlineDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
    };

    return (
      <motion.a
        className={`relative inline-block ${className}`}
        href={href}
        onClick={onClick}
        onHoverEnd={() => setIsHovered(false)}
        onHoverStart={() => setIsHovered(true)}>
        {/* Link text */}
        <span className="relative z-10">{children}</span>

        {/* Animated underline */}
        <motion.div
          animate={isActive && showActiveUnderline ? 'active' : isHovered ? 'hover' : 'initial'}
          className={`absolute bottom-0 left-0 w-full ${underlineHeight} ${underlineColor}`}
          initial="initial"
          variants={underlineVariants}
        />
      </motion.a>
    );
  },
);

UnderlineAnimation.displayName = 'UnderlineAnimation';

export default UnderlineAnimation;
