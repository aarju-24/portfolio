/**
 * StaggerContainer Component
 * Container that coordinates sequential animation of children using Framer Motion's staggerChildren feature
 * Respects prefers-reduced-motion preference
 * Uses GPU-accelerated transforms for performance
 */

import {motion} from 'framer-motion';
import React from 'react';

import {ANIMATION_DELAYS} from '../config/animation';
import {StaggerContainerProps} from '../types/animation';
import {getAnimationDelay, useMotionPreference} from '../utils/motion';

/**
 * StaggerContainer Component
 *
 * Provides a container that coordinates staggered animations of child elements.
 * Uses Framer Motion's staggerChildren feature to automatically delay each child's animation.
 * Respects user's prefers-reduced-motion preference.
 *
 * @param props - Component props
 * @param props.children - Child elements to animate in staggered sequence
 * @param props.staggerDelay - Delay between each child animation in seconds (default: 0.1)
 * @param props.delayChildren - Initial delay before first child animates in seconds (default: 0)
 * @param props.className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <StaggerContainer staggerDelay={0.1} delayChildren={0.2}>
 *   <StaggerItem>Item 1</StaggerItem>
 *   <StaggerItem>Item 2</StaggerItem>
 *   <StaggerItem>Item 3</StaggerItem>
 * </StaggerContainer>
 * ```
 */
// eslint-disable-next-line react-memo/require-memo
export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = ANIMATION_DELAYS.staggerSmall,
  delayChildren = 0,
  className = '',
}) => {
  const prefersReduced = useMotionPreference();

  // Adjust animation delays based on motion preference
  const adjustedStaggerDelay = getAnimationDelay(staggerDelay, prefersReduced);
  const adjustedDelayChildren = getAnimationDelay(delayChildren, prefersReduced);

  // Container animation variants with staggerChildren
  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: adjustedStaggerDelay,
        delayChildren: adjustedDelayChildren,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={containerVariants}
      viewport={{once: true, amount: 0.2}}
      whileInView="visible">
      {children}
    </motion.div>
  );
};

export default StaggerContainer;
