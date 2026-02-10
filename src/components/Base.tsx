import {FC, memo, ReactNode} from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Universal Primary Button
 * Primary color background, white text
 * Used across Hero, Portfolio, Contact, etc.
 */
export const PrimaryButton: FC<PrimaryButtonProps> = memo(({children, href, onClick, className = ''}) => {
  const Component: React.ElementType = href ? 'a' : 'button';

  return (
    <Component
      className={`inline-flex items-center justify-center rounded-md bg-primary-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-primary-600 focus:outline-none ${className}`}
      href={href}
      onClick={onClick}>
      {children}
    </Component>
  );
});

PrimaryButton.displayName = 'PrimaryButton';

/**
 * Base component (kept for future shared layout utilities)
 */
const Base: FC = memo(() => {
  return null;
});

Base.displayName = 'Base';
export default Base;
