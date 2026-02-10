import {FC, memo} from 'react';

interface TechPillProps {
  name: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * TechPill Component
 * Displays a technology skill as a styled pill with hover effects
 */
export const TechPill: FC<TechPillProps> = memo(({name, style, className = ''}) => {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md border border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-200 hover:border-primary-300 hover:bg-gradient-to-br hover:from-primary-100 hover:to-primary-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${className}`}
      style={style}
      tabIndex={0}>
      <span className="leading-none">{name}</span>
    </span>
  );
});

TechPill.displayName = 'TechPill';
