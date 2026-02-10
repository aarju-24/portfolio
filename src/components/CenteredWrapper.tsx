/**
 * CenteredWrapper Component
 * Implements max-width constraint (1200px) with responsive padding
 * Ensures proper centering on all breakpoints
 * Supports mobile (< 768px), tablet (768-1024px), and desktop (> 1024px)
 */

import React, {FC, memo, ReactNode} from 'react';

/**
 * Props for CenteredWrapper component
 */
export interface CenteredWrapperProps {
  /** Child elements to wrap */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether to add vertical padding (default: true) */
  verticalPadding?: boolean;
  /** Custom max-width class (default: 'max-w-6xl' = 1200px) */
  maxWidth?: string;
}

/**
 * CenteredWrapper Component
 *
 * A responsive wrapper component that:
 * - Centers content with max-width of 1200px (max-w-6xl)
 * - Applies responsive padding:
 *   - Mobile (< 768px): px-4 (1rem)
 *   - Tablet (768px - 1024px): px-6 (1.5rem)
 *   - Desktop (> 1024px): px-8 (2rem)
 * - Maintains proper centering on all breakpoints
 * - Supports optional vertical padding
 *
 * @param props - Component props
 * @param props.children - Child elements to wrap
 * @param props.className - Additional CSS classes to apply
 * @param props.verticalPadding - Whether to add vertical padding (default: true)
 * @param props.maxWidth - Custom max-width class (default: 'max-w-6xl')
 *
 * @example
 * ```tsx
 * <CenteredWrapper>
 *   <h1>Welcome to my portfolio</h1>
 *   <p>This content is centered and responsive</p>
 * </CenteredWrapper>
 * ```
 *
 * @example
 * ```tsx
 * <CenteredWrapper verticalPadding={true} className="bg-gray-50">
 *   <Section>Content here</Section>
 * </CenteredWrapper>
 * ```
 */
export const CenteredWrapper: FC<CenteredWrapperProps> = memo(
  ({children, className = '', verticalPadding = true, maxWidth = 'max-w-6xl'}) => {
    // Responsive padding classes:
    // - px-4: 1rem padding on mobile (< 768px)
    // - md:px-6: 1.5rem padding on tablet (768px - 1024px)
    // - lg:px-8: 2rem padding on desktop (> 1024px)
    const paddingClasses = 'px-4 md:px-6 lg:px-8';

    // Vertical padding classes (optional)
    const verticalPaddingClasses = verticalPadding ? 'py-8 md:py-12 lg:py-16' : '';

    // Combine all classes
    const wrapperClasses = `mx-auto ${maxWidth} ${paddingClasses} ${verticalPaddingClasses} ${className}`;

    return <div className={wrapperClasses}>{children}</div>;
  },
);

CenteredWrapper.displayName = 'CenteredWrapper';

export default CenteredWrapper;
