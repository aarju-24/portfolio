import {FC, memo, ReactNode} from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Centered Content Wrapper Component
 *
 * Provides a responsive container with:
 * - Max-width constraint of 1200px
 * - Horizontal centering
 * - Responsive padding for mobile/tablet/desktop
 *
 * Responsive Padding:
 * - Mobile (< 768px): px-4 (1rem)
 * - Tablet (768px-1024px): px-8 (2rem)
 * - Desktop (> 1024px): px-12 (3rem)
 *
 * Validates: Requirements 1.1, 1.3
 */
export const Container: FC<ContainerProps> = memo(({children, className = ''}) => {
  return <div className={`mx-auto max-w-[1200px] px-4 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
});

Container.displayName = 'Container';

export default Container;
