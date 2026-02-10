/**
 * TouchFeedback Component
 * Optimizes touch feedback for mobile devices
 * Removes 300ms tap delay
 * Provides immediate visual feedback on touch
 * Supports touch-specific hover states
 * Requirements: 10.2
 */

import {motion} from 'framer-motion';
import React, {FC, memo, ReactNode, useState} from 'react';

import {ANIMATION_DURATIONS, ANIMATION_EASING} from '../config/animation';
import {getAnimationDuration, useMotionPreference} from '../utils/motion';

/**
 * Props for TouchFeedback component
 */
export interface TouchFeedbackProps {
  /** Interactive element */
  children: ReactNode;
  /** Callback when element is pressed */
  onPress?: () => void;
  /** Callback when element is released */
  onRelease?: () => void;
  /** Scale on press (default: 0.95) */
  pressScale?: number;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show ripple effect */
  showRipple?: boolean;
}

/**
 * TouchFeedback Component
 *
 * Wraps interactive elements to provide:
 * - Immediate visual feedback on touch (no 300ms delay)
 * - Touch-specific hover states
 * - Scale animation on press
 * - Optional ripple effect
 * - GPU-accelerated animations
 * - Respects prefers-reduced-motion preference
 *
 * @param props - Component props
 * @param props.children - Interactive element
 * @param props.onPress - Callback when element is pressed
 * @param props.onRelease - Callback when element is released
 * @param props.pressScale - Scale on press (default: 0.95)
 * @param props.className - Additional CSS classes
 * @param props.showRipple - Show ripple effect (default: false)
 *
 * @example
 * ```tsx
 * <TouchFeedback onPress={() => console.log('Pressed!')}>
 *   <button>Tap me</button>
 * </TouchFeedback>
 * ```
 */
export const TouchFeedback: FC<TouchFeedbackProps> = memo(
  ({children, onPress, onRelease, pressScale = 0.95, className = '', showRipple = false}) => {
    const prefersReduced = useMotionPreference();
    const [isPressed, setIsPressed] = useState(false);
    const [ripples, setRipples] = useState<Array<{id: number; x: number; y: number}>>([]);

    // Animation duration for press effect
    const pressDuration = getAnimationDuration(ANIMATION_DURATIONS.pressScale, prefersReduced);

    // Press animation variants
    const pressVariants = {
      initial: {scale: 1},
      pressed: {
        scale: pressScale,
        transition: {
          duration: pressDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
    };

    // Ripple animation variants
    const rippleVariants = {
      initial: {
        scale: 0,
        opacity: 0.5,
      },
      animate: {
        scale: 4,
        opacity: 0,
        transition: {
          duration: 0.6,
          ease: ANIMATION_EASING.easeOut,
        },
      },
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      setIsPressed(true);
      onPress?.();

      // Add ripple effect if enabled
      if (showRipple) {
        const touch = e.touches[0];
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        const id = Date.now();
        setRipples(prev => [...prev, {id, x, y}]);

        // Remove ripple after animation
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== id));
        }, 600);
      }
    };

    const handleTouchEnd = () => {
      setIsPressed(false);
      onRelease?.();
    };

    const handleMouseDown = () => {
      setIsPressed(true);
      onPress?.();
    };

    const handleMouseUp = () => {
      setIsPressed(false);
      onRelease?.();
    };

    return (
      <motion.div
        animate={isPressed ? 'pressed' : 'initial'}
        className={`relative cursor-pointer select-none touch-none ${className}`}
        initial="initial"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
        variants={pressVariants}>
        {children}

        {/* Ripple Effects */}
        {showRipple &&
          ripples.map(ripple => (
            <motion.div
              animate="animate"
              className="absolute rounded-full bg-white pointer-events-none"
              initial="initial"
              key={ripple.id}
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 10,
                height: 10,
                marginLeft: -5,
                marginTop: -5,
              }}
              variants={rippleVariants}
            />
          ))}
      </motion.div>
    );
  },
);

TouchFeedback.displayName = 'TouchFeedback';

export default TouchFeedback;
