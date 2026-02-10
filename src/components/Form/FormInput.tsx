/**
 * FormInput Component
 * Form input with focus effects, error and success states
 * Displays border color change on focus with subtle glow effect
 * Requirements: 7.1, 7.2, 7.3
 */

import {motion} from 'framer-motion';
import React, {FC, memo, useState} from 'react';

import {ANIMATION_DURATIONS, ANIMATION_EASING} from '../../config/animation';
import {getAnimationDuration, useMotionPreference} from '../../utils/motion';

/**
 * Props for FormInput component
 */
export interface FormInputProps {
  /** Input label */
  label?: string;
  /** Input placeholder text */
  placeholder?: string;
  /** Input type (text, email, password, etc.) */
  type?: string;
  /** Current input value */
  value?: string;
  /** Callback when input value changes */
  onChange?: (value: string) => void;
  /** Callback when input loses focus */
  onBlur?: () => void;
  /** Error message to display */
  error?: string;
  /** Whether input is in success state */
  success?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Input name attribute */
  name?: string;
  /** Whether input is required */
  required?: boolean;
}

/**
 * FormInput Component
 *
 * Renders a form input with:
 * - Border color change on focus (200ms transition)
 * - Subtle glow effect on focus
 * - Error state with red border and error message
 * - Success state with green border and checkmark
 * - Smooth animations respecting prefers-reduced-motion
 * - Accessible with proper labels and ARIA attributes
 *
 * @param props - Component props
 * @param props.label - Input label text
 * @param props.placeholder - Placeholder text
 * @param props.type - Input type (default: 'text')
 * @param props.value - Current input value
 * @param props.onChange - Callback when value changes
 * @param props.onBlur - Callback when input loses focus
 * @param props.error - Error message
 * @param props.success - Whether input is in success state
 * @param props.className - Additional CSS classes
 * @param props.name - Input name attribute
 * @param props.required - Whether input is required
 *
 * @example
 * ```tsx
 * const [email, setEmail] = useState('');
 * const [error, setError] = useState('');
 *
 * <FormInput
 *   label="Email"
 *   type="email"
 *   placeholder="your@email.com"
 *   value={email}
 *   onChange={setEmail}
 *   error={error}
 *   onBlur={() => {
 *     if (!email.includes('@')) {
 *       setError('Invalid email');
 *     }
 *   }}
 * />
 * ```
 */
export const FormInput: FC<FormInputProps> = memo(
  ({
    label,
    placeholder,
    type = 'text',
    value = '',
    onChange,
    onBlur,
    error,
    success = false,
    className = '',
    name,
    required = false,
  }) => {
    const prefersReduced = useMotionPreference();
    const [isFocused, setIsFocused] = useState(false);

    // Animation duration for focus effect
    const focusDuration = getAnimationDuration(ANIMATION_DURATIONS.formFocus, prefersReduced);

    // Determine border color based on state
    const getBorderColor = (): string => {
      if (error) return 'border-red-500';
      if (success) return 'border-green-500';
      if (isFocused) return 'border-primary-500';
      return 'border-gray-300';
    };

    // Determine glow color based on state
    const getGlowColor = (): string => {
      if (error) return 'shadow-red-500/20';
      if (success) return 'shadow-green-500/20';
      if (isFocused) return 'shadow-primary-500/20';
      return 'shadow-transparent';
    };

    // Input container animation variants
    const containerVariants = {
      initial: {
        boxShadow: '0 0 0 0px rgba(0, 0, 0, 0)',
      },
      focused: {
        boxShadow: isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : '0 0 0 0px rgba(0, 0, 0, 0)',
        transition: {
          duration: focusDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
    };

    // Error message animation variants
    const errorVariants = {
      hidden: {
        opacity: 0,
        y: -10,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: getAnimationDuration(ANIMATION_DURATIONS.formError, prefersReduced),
          ease: ANIMATION_EASING.easeInOut,
        },
      },
    };

    // Success checkmark animation variants
    const successVariants = {
      hidden: {
        opacity: 0,
        scale: 0.5,
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: getAnimationDuration(ANIMATION_DURATIONS.formSuccess, prefersReduced),
          ease: ANIMATION_EASING.easeInOut,
        },
      },
    };

    return (
      <div className={`w-full ${className}`}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input container with glow effect */}
        <motion.div
          animate={isFocused ? 'focused' : 'initial'}
          className={`relative rounded-lg transition-all duration-200 ${getGlowColor()}`}
          variants={containerVariants}>
          <input
            aria-describedby={error ? `${name}-error` : undefined}
            aria-invalid={!!error}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${getBorderColor()} ${
              error ? 'bg-red-50' : success ? 'bg-green-50' : 'bg-white'
            }`}
            name={name}
            onBlur={() => {
              setIsFocused(false);
              onBlur?.();
            }}
            onChange={e => onChange?.(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            required={required}
            type={type}
            value={value}
          />

          {/* Success checkmark */}
          {success && !error && (
            <motion.div
              animate="visible"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              initial="hidden"
              variants={successVariants}>
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  clipRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  fillRule="evenodd"
                />
              </svg>
            </motion.div>
          )}
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.p
            animate="visible"
            className="mt-2 text-sm text-red-600"
            id={`${name}-error`}
            initial="hidden"
            variants={errorVariants}>
            {error}
          </motion.p>
        )}

        {/* Success message */}
        {success && !error && (
          <motion.p
            animate="visible"
            className="mt-2 text-sm text-green-600"
            initial="hidden"
            variants={successVariants}>
            ✓ Looks good!
          </motion.p>
        )}
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';

export default FormInput;
