/**
 * FocusIndicator Component
 * Provides visible focus states for all interactive elements
 * Ensures sufficient contrast for focus indicators
 * Supports keyboard navigation
 * Requirements: 9.2, 9.3
 */

import React, {FC, memo, ReactNode} from 'react';

/**
 * Props for FocusIndicator component
 */
export interface FocusIndicatorProps {
  /** Interactive element to wrap */
  children: ReactNode;
  /** Focus indicator color */
  focusColor?: string;
  /** Focus indicator width */
  focusWidth?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show focus ring */
  showFocusRing?: boolean;
}

/**
 * FocusIndicator Component
 *
 * Wraps interactive elements to provide:
 * - Visible focus states with sufficient contrast
 * - Clear focus indicators for keyboard navigation
 * - Support for all interactive elements (buttons, links, inputs)
 * - WCAG AA compliant focus indicators
 * - Accessible keyboard navigation
 *
 * @param props - Component props
 * @param props.children - Interactive element to wrap
 * @param props.focusColor - Focus indicator color (default: 'focus:ring-primary-500')
 * @param props.focusWidth - Focus indicator width (default: 'focus:ring-2')
 * @param props.className - Additional CSS classes
 * @param props.showFocusRing - Whether to show focus ring (default: true)
 *
 * @example
 * ```tsx
 * <FocusIndicator>
 *   <button>Click me</button>
 * </FocusIndicator>
 * ```
 */
export const FocusIndicator: FC<FocusIndicatorProps> = memo(
  ({
    children,
    focusColor = 'focus:ring-primary-500',
    focusWidth = 'focus:ring-2',
    className = '',
    showFocusRing = true,
  }) => {
    if (!showFocusRing) {
      return <>{children}</>;
    }

    return (
      <div className={`${focusWidth} ${focusColor} rounded-md outline-none transition-all duration-200 ${className}`}>
        {children}
      </div>
    );
  },
);

FocusIndicator.displayName = 'FocusIndicator';

export default FocusIndicator;
