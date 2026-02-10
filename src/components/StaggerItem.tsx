/**
 * StaggerItem Component
 * Individual item within a stagger container that animates with fade-in and slide-up effects
 * Respects prefers-reduced-motion preference
 * Uses GPU-accelerated transforms (opacity and transform) for performance
 */

import {motion} from 'framer-motion';
import React from 'react';

import {ANIMATION_DURATIONS, ANIMATION_EASING} from '../config/animation';
import {StaggerItemProps} from '../types/animation';
import {getAnimationDuration, useMotionPreference} from '../utils/motion';

/**
 * StaggerItem Component
 *
 * Individual item that animates within a StaggerContainer.
 * Applies fade-in and slide-up effects using GPU-accelerated transforms.
 * Respects user's prefers-reduced-motion preference.
 *
 * @param props - Component props
 * @param props.children - Content to animate
 * @param props.duration - Animation duration in seconds (default: 0.6)
 * @param props.className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <StaggerContainer>
 *   <StaggerItem duration={0.6}>
 *     <div>Item 1</div>
 *   </StaggerItem>
 *   <StaggerItem duration={0.6}>
 *     <div>Item 2</div>
 *   </StaggerItem>
 * </StaggerContainer>
 * ```
 */
// eslint-disable-next-line react-memo/require-memo
export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  duration = ANIMATION_DURATIONS.scrollSlideUp,
  className = '',
}) => {
  const prefersReduced = useMotionPreference();

  // Adjust animation duration based on motion preference
  const animationDuration = getAnimationDuration(duration, prefersReduced);

  // Item animation variants with fade-in and slide-up effects
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20, // Slide up from 20px below
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animationDuration,
        ease: ANIMATION_EASING.easeOut,
      },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
};

export default StaggerItem;
