/**
 * ResponsiveGrid Component
 * Grid that adapts to breakpoints (1/2/3 columns)
 * Supports mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
 * Uses Tailwind CSS grid classes for responsive behavior
 * Ensures smooth transitions between breakpoints
 */

import React, {memo} from 'react';

/**
 * Props for ResponsiveGrid component
 */
export interface ResponsiveGridProps {
  /** Child elements to display in the grid */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Gap between grid items (Tailwind gap class value) */
  gap?: 'gap-2' | 'gap-3' | 'gap-4' | 'gap-6' | 'gap-8';
}

/**
 * ResponsiveGrid Component
 *
 * A responsive grid component that adapts to different screen sizes:
 * - Mobile (< 768px): 1 column
 * - Tablet (768px - 1024px): 2 columns
 * - Desktop (> 1024px): 3 columns
 *
 * Uses Tailwind CSS grid classes for responsive behavior and smooth transitions.
 * Supports configurable gap between items.
 *
 * @param props - Component props
 * @param props.children - Child elements to display in the grid
 * @param props.className - Additional CSS classes to apply
 * @param props.gap - Gap between grid items (default: 'gap-6')
 *
 * @example
 * ```tsx
 * <ResponsiveGrid gap="gap-4">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </ResponsiveGrid>
 * ```
 *
 * @example
 * ```tsx
 * <ResponsiveGrid gap="gap-8" className="px-4">
 *   <PortfolioCard {...cardProps1} />
 *   <PortfolioCard {...cardProps2} />
 *   <PortfolioCard {...cardProps3} />
 * </ResponsiveGrid>
 * ```
 */
export const ResponsiveGrid: React.FC<ResponsiveGridProps> = memo(({children, className = '', gap = 'gap-6'}) => {
  // Tailwind grid classes for responsive columns:
  // - grid-cols-1: 1 column on mobile (< 768px)
  // - md:grid-cols-2: 2 columns on tablet (768px - 1024px)
  // - lg:grid-cols-3: 3 columns on desktop (> 1024px)
  const gridClasses = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${gap} transition-all duration-300 ease-in-out`;

  return <div className={`${gridClasses} ${className}`}>{children}</div>;
});

ResponsiveGrid.displayName = 'ResponsiveGrid';

export default ResponsiveGrid;
