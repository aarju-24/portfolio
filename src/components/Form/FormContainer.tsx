/**
 * FormContainer Component
 * Container for form with validation, error display, and success animation
 * Implements staggered field animations on load
 * Displays success message with checkmark animation
 * Requirements: 7.2, 7.3, 7.4
 */

import {motion} from 'framer-motion';
import React, {FC, memo, ReactNode, useState} from 'react';

import {ANIMATION_DELAYS, ANIMATION_DURATIONS, ANIMATION_EASING} from '../../config/animation';
import {getAnimationDuration, useMotionPreference} from '../../utils/motion';

/**
 * Props for FormContainer component
 */
export interface FormContainerProps {
  /** Form children (FormInput components) */
  children: ReactNode;
  /** Form title */
  title?: string;
  /** Form description */
  description?: string;
  /** Callback when form is submitted */
  onSubmit?: (formData: Record<string, string>) => Promise<void> | void;
  /** Additional CSS classes */
  className?: string;
  /** Whether form is currently submitting */
  isSubmitting?: boolean;
  /** Success message to display */
  successMessage?: string;
  /** Error message to display */
  errorMessage?: string;
  /** Callback when form submission succeeds */
  onSuccess?: () => void;
  /** Callback when form submission fails */
  onError?: (error: Error) => void;
}

/**
 * FormContainer Component
 *
 * Renders a form container with:
 * - Staggered fade-in animations for form fields on load
 * - Form submission handling with loading state
 * - Success animation with checkmark and message
 * - Error display with fade-in animation
 * - Smooth transitions respecting prefers-reduced-motion
 * - Accessible form structure with proper labels
 *
 * @param props - Component props
 * @param props.children - Form input components
 * @param props.title - Form title
 * @param props.description - Form description
 * @param props.onSubmit - Callback when form is submitted
 * @param props.className - Additional CSS classes
 * @param props.isSubmitting - Whether form is currently submitting
 * @param props.successMessage - Success message to display
 * @param props.errorMessage - Error message to display
 * @param props.onSuccess - Callback when submission succeeds
 * @param props.onError - Callback when submission fails
 *
 * @example
 * ```tsx
 * <FormContainer
 *   title="Contact Me"
 *   description="Send me a message"
 *   onSubmit={async (data) => {
 *     await submitForm(data);
 *   }}
 *   onSuccess={() => console.log('Form submitted!')}
 * >
 *   <FormInput label="Name" name="name" />
 *   <FormInput label="Email" type="email" name="email" />
 * </FormContainer>
 * ```
 */
export const FormContainer: FC<FormContainerProps> = memo(
  ({
    children,
    title,
    description,
    onSubmit,
    className = '',
    isSubmitting = false,
    successMessage = 'Thank you! Your message has been sent.',
    errorMessage,
    onSuccess,
    onError,
  }) => {
    const prefersReduced = useMotionPreference();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    // Animation durations
    const containerDuration = getAnimationDuration(ANIMATION_DURATIONS.fadeInSlow, prefersReduced);
    const successDuration = getAnimationDuration(ANIMATION_DURATIONS.formSuccess, prefersReduced);
    const errorDuration = getAnimationDuration(ANIMATION_DURATIONS.formError, prefersReduced);
    const staggerDelay = getAnimationDuration(ANIMATION_DELAYS.formFieldDelay, prefersReduced);

    // Container animation variants
    const containerVariants = {
      hidden: {opacity: 0},
      visible: {
        opacity: 1,
        transition: {
          duration: containerDuration,
          staggerChildren: staggerDelay,
          delayChildren: 0,
        },
      },
    };

    // Child animation variants (for staggered effect)
    const childVariants = {
      hidden: {opacity: 0, y: 20},
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: getAnimationDuration(ANIMATION_DURATIONS.fadeIn, prefersReduced),
          ease: ANIMATION_EASING.easeInOut,
        },
      },
    };

    // Success message animation variants
    const successVariants = {
      hidden: {opacity: 0, scale: 0.8},
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: successDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
      exit: {
        opacity: 0,
        scale: 0.8,
        transition: {
          duration: successDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
    };

    // Error message animation variants
    const errorVariants = {
      hidden: {opacity: 0, y: -10},
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: errorDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
      exit: {
        opacity: 0,
        y: -10,
        transition: {
          duration: errorDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
    };

    // Checkmark animation variants
    const checkmarkVariants = {
      hidden: {scale: 0, rotate: -180},
      visible: {
        scale: 1,
        rotate: 0,
        transition: {
          duration: successDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setShowError(false);

      try {
        if (onSubmit) {
          await onSubmit({});
        }
        setShowSuccess(true);
        onSuccess?.();

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } catch (error) {
        setShowError(true);
        onError?.(error as Error);
      }
    };

    return (
      <motion.div
        animate="visible"
        className={`w-full max-w-md mx-auto ${className}`}
        initial="hidden"
        variants={containerVariants}>
        {/* Form Header */}
        {(title || description) && (
          <motion.div className="mb-8" variants={childVariants}>
            {title && <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>}
            {description && <p className="text-gray-600">{description}</p>}
          </motion.div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <motion.div
            animate="visible"
            className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200"
            exit="exit"
            initial="hidden"
            variants={successVariants}>
            <div className="flex items-center gap-3">
              <motion.div animate="visible" initial="hidden" variants={checkmarkVariants}>
                <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    fillRule="evenodd"
                  />
                </svg>
              </motion.div>
              <div>
                <p className="font-medium text-green-900">{successMessage}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {showError && errorMessage && (
          <motion.div
            animate="visible"
            className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200"
            exit="exit"
            initial="hidden"
            variants={errorVariants}>
            <p className="text-sm text-red-600">{errorMessage}</p>
          </motion.div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Form Fields with Staggered Animation */}
          <motion.div className="space-y-6" variants={containerVariants}>
            {React.Children.map(children, (child, index) => (
              <motion.div key={index} variants={childVariants}>
                {child}
              </motion.div>
            ))}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            className="w-full rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            type="submit"
            variants={childVariants}
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}>
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </motion.button>
        </form>
      </motion.div>
    );
  },
);

FormContainer.displayName = 'FormContainer';

export default FormContainer;
