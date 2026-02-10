/**
 * Enhanced CTA Button Component
 * Implements button hover scale and color transitions with press animation
 * Ensures accessibility with focus states
 * Respects prefers-reduced-motion preference
 * Uses GPU-accelerated transforms (scale only) for performance
 */

import {motion} from 'framer-motion';
import React, {FC, memo, ReactNode} from 'react';

import {ANIMATION_DURATIONS, ANIMATION_EASING, ANIMATION_SCALES} from '../../config/animation';
import {getAnimationDuration, useMotionPreference} from '../../utils/motion';

export interface EnhancedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  ariaLabel?: string;
}

/**
 * Enhanced Button Component
 *
 * Renders a button with:
 * - Hover scale effect (1.05x over 200-300ms)
 * - Smooth color transitions on hover
 * - Press animation (0.95x scale on click)
 * - Visible focus states for keyboard navigation
 * - Sufficient contrast for accessibility
 * - Support for both primary and secondary styles
 *
 * Respects prefers-reduced-motion preference.
 * Uses GPU-accelerated transforms (scale only).
 *
 * @param props - Component props
 * @param props.children - Button content
 * @param props.href - Optional link href (renders as anchor tag)
 * @param props.onClick - Optional click handler
 * @param props.className - Additional CSS classes
 * @param props.variant - Button style variant ('primary' or 'secondary')
 * @param props.disabled - Whether button is disabled
 * @param props.ariaLabel - Accessibility label
 *
 * @example
 * ```tsx
 * <EnhancedButton variant="primary" href="#portfolio">
 *   View Projects
 * </EnhancedButton>
 * ```
 *
 * @example
 * ```tsx
 * <EnhancedButton variant="secondary" onClick={handleClick}>
 *   Contact Me
 * </EnhancedButton>
 * ```
 */
export const EnhancedButton: FC<EnhancedButtonProps> = memo(
  ({children, href, onClick, className = '', variant = 'primary', disabled = false, ariaLabel}) => {
    const prefersReduced = useMotionPreference();
    const Component: React.ElementType = href ? 'a' : 'button';

    // Adjust animation duration based on motion preference
    const hoverDuration = getAnimationDuration(ANIMATION_DURATIONS.hoverScale, prefersReduced);
    const pressDuration = getAnimationDuration(ANIMATION_DURATIONS.pressScale, prefersReduced);

    // Hover and press animation variants
    const buttonVariants = {
      initial: {
        scale: 1,
      },
      hover: {
        scale: ANIMATION_SCALES.hoverScale,
        transition: {
          duration: hoverDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
      tap: {
        scale: ANIMATION_SCALES.pressScale,
        transition: {
          duration: pressDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
    };

    // Base button styles
    const baseStyles =
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Variant-specific styles
    const variantStyles = {
      primary:
        'bg-primary-500 px-6 py-3 text-sm text-white hover:bg-primary-600 focus:ring-primary-500 active:bg-primary-700',
      secondary:
        'border border-primary-500 px-6 py-3 text-sm text-primary-500 hover:bg-primary-50 focus:ring-primary-500 active:bg-primary-100',
    };

    const buttonClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

    return (
      <motion.div
        initial="initial"
        variants={buttonVariants}
        whileHover={disabled ? undefined : 'hover'}
        whileTap={disabled ? undefined : 'tap'}>
        <Component aria-label={ariaLabel} className={buttonClassName} disabled={disabled} href={href} onClick={onClick}>
          {children}
        </Component>
      </motion.div>
    );
  },
);

EnhancedButton.displayName = 'EnhancedButton';

export default EnhancedButton;
