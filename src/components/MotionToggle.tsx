/**
 * MotionToggle Component
 * Manual toggle for animation preferences
 * Allows users to disable animations if needed
 * Requirements: 2.5, 9.1
 */

import React, {FC, memo} from 'react';

import {useMotionContext} from '../context/MotionContext';

/**
 * Props for MotionToggle component
 */
export interface MotionToggleProps {
  /** Additional CSS classes */
  className?: string;
  /** Show label text */
  showLabel?: boolean;
}

/**
 * MotionToggle Component
 *
 * Renders a toggle button to manually disable/enable animations
 * Shows current animation state
 * Persists preference to localStorage
 *
 * @param props - Component props
 * @param props.className - Additional CSS classes
 * @param props.showLabel - Whether to show label text (default: true)
 *
 * @example
 * ```tsx
 * <MotionToggle showLabel={true} />
 * ```
 */
export const MotionToggle: FC<MotionToggleProps> = memo(({className = '', showLabel = true}) => {
  const {isAnimationsDisabled, toggleAnimations} = useMotionContext();

  return (
    <button
      aria-label={isAnimationsDisabled ? 'Enable animations' : 'Disable animations'}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
        isAnimationsDisabled
          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
      } ${className}`}
      onClick={toggleAnimations}
      title={isAnimationsDisabled ? 'Enable animations' : 'Disable animations'}>
      {/* Animation icon */}
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        {isAnimationsDisabled ? (
          // Disabled icon
          <path
            clipRule="evenodd"
            d="M13.477 14.89A6 6 0 015.11 2.526a6 6 0 008.367 12.364zm1.414-1.414A8 8 0 1 1 2.05 2.05a8 8 0 0 1 12.84 11.426zM9.172 5.172a4 4 0 1 1 5.656 5.656 4 4 0 0 1-5.656-5.656z"
            fillRule="evenodd"
          />
        ) : (
          // Enabled icon
          <path
            clipRule="evenodd"
            d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm12 2v5h2V4a2 2 0 0 0-2-2h-2.5A2.5 2.5 0 0 0 9 4.5V4h7zM4 4a2 2 0 0 0-2 2v8h2V4zm0 10v2h12v-2H4z"
            fillRule="evenodd"
          />
        )}
      </svg>

      {/* Label */}
      {showLabel && (
        <span className="text-sm font-medium">{isAnimationsDisabled ? 'Animations off' : 'Animations on'}</span>
      )}
    </button>
  );
});

MotionToggle.displayName = 'MotionToggle';

export default MotionToggle;
