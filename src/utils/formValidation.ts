/**
 * Form Validation Utilities
 * Utilities for validating form fields and displaying error messages
 */

/**
 * Validation error type
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Form validation rules
 */
export interface ValidationRules {
  [field: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => boolean | string;
  };
}

/**
 * Validates a single field
 * @param field - Field name
 * @param value - Field value
 * @param rules - Validation rules for the field
 * @returns Error message or empty string if valid
 */
export const validateField = (field: string, value: string, rules: ValidationRules[string]): string => {
  if (!rules) return '';

  // Check required
  if (rules.required && !value.trim()) {
    return `${field} is required`;
  }

  // Check min length
  if (rules.minLength && value.length < rules.minLength) {
    return `${field} must be at least ${rules.minLength} characters`;
  }

  // Check max length
  if (rules.maxLength && value.length > rules.maxLength) {
    return `${field} must be no more than ${rules.maxLength} characters`;
  }

  // Check pattern
  if (rules.pattern && !rules.pattern.test(value)) {
    return `${field} is invalid`;
  }

  // Check custom validation
  if (rules.custom) {
    const result = rules.custom(value);
    if (typeof result === 'string') {
      return result;
    }
    if (!result) {
      return `${field} is invalid`;
    }
  }

  return '';
};

/**
 * Validates all form fields
 * @param formData - Form data object
 * @param rules - Validation rules
 * @returns Array of validation errors
 */
export const validateForm = (formData: Record<string, string>, rules: ValidationRules): ValidationError[] => {
  const errors: ValidationError[] = [];

  Object.entries(rules).forEach(([field, fieldRules]) => {
    const value = formData[field] || '';
    const error = validateField(field, value, fieldRules);
    if (error) {
      errors.push({field, message: error});
    }
  });

  return errors;
};

/**
 * Common validation patterns
 */
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d\s\-+()]+$/,
  url: /^https?:\/\/.+/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  noSpecialChars: /^[a-zA-Z0-9\s\-.]+$/,
} as const;

/**
 * Common validation rules
 */
export const COMMON_RULES = {
  email: {
    required: true,
    pattern: VALIDATION_PATTERNS.email,
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 5000,
  },
  phone: {
    pattern: VALIDATION_PATTERNS.phone,
  },
} as const;
