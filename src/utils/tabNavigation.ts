/**
 * Tab Navigation Utilities
 * Utilities for managing keyboard tab navigation order
 * Ensures logical tab order through all interactive elements
 */

/**
 * Gets all focusable elements in a container
 * @param container - Container element
 * @returns Array of focusable elements
 */
export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
};

/**
 * Sets tab index for elements to ensure logical order
 * @param elements - Array of elements
 * @param startIndex - Starting tab index (default: 0)
 */
export const setTabOrder = (elements: HTMLElement[], startIndex: number = 0): void => {
  elements.forEach((element, index) => {
    element.setAttribute('tabindex', String(startIndex + index));
  });
};

/**
 * Focuses the first focusable element in a container
 * @param container - Container element
 */
export const focusFirstElement = (container: HTMLElement): void => {
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
};

/**
 * Focuses the last focusable element in a container
 * @param container - Container element
 */
export const focusLastElement = (container: HTMLElement): void => {
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length > 0) {
    focusableElements[focusableElements.length - 1].focus();
  }
};

/**
 * Moves focus to the next focusable element
 * @param container - Container element
 * @param currentElement - Current focused element
 */
export const focusNextElement = (container: HTMLElement, currentElement: HTMLElement): void => {
  const focusableElements = getFocusableElements(container);
  const currentIndex = focusableElements.indexOf(currentElement);

  if (currentIndex < focusableElements.length - 1) {
    focusableElements[currentIndex + 1].focus();
  } else if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
};

/**
 * Moves focus to the previous focusable element
 * @param container - Container element
 * @param currentElement - Current focused element
 */
export const focusPreviousElement = (container: HTMLElement, currentElement: HTMLElement): void => {
  const focusableElements = getFocusableElements(container);
  const currentIndex = focusableElements.indexOf(currentElement);

  if (currentIndex > 0) {
    focusableElements[currentIndex - 1].focus();
  } else if (focusableElements.length > 0) {
    focusableElements[focusableElements.length - 1].focus();
  }
};

/**
 * Handles keyboard navigation (Tab, Shift+Tab)
 * @param event - Keyboard event
 * @param container - Container element
 */
export const handleTabNavigation = (event: KeyboardEvent, container: HTMLElement): void => {
  if (event.key !== 'Tab') return;

  const currentElement = document.activeElement as HTMLElement;
  if (!container.contains(currentElement)) return;

  if (event.shiftKey) {
    event.preventDefault();
    focusPreviousElement(container, currentElement);
  } else {
    event.preventDefault();
    focusNextElement(container, currentElement);
  }
};

/**
 * Creates a skip link for keyboard navigation
 * @param targetId - ID of the element to skip to
 * @param label - Skip link label (default: 'Skip to main content')
 * @returns Skip link element
 */
export const createSkipLink = (targetId: string, label: string = 'Skip to main content'): HTMLAnchorElement => {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = label;
  skipLink.className =
    'sr-only focus:not-sr-only absolute top-0 left-0 z-50 bg-primary-600 text-white px-4 py-2 rounded-md';
  skipLink.setAttribute('aria-label', label);

  return skipLink;
};

/**
 * Checks if an element is visible and can receive focus
 * @param element - Element to check
 * @returns Whether element is visible and focusable
 */
export const isElementFocusable = (element: HTMLElement): boolean => {
  // Check if element is visible
  if (element.offsetParent === null) return false;

  // Check if element is disabled
  const disabledElement = element as HTMLButtonElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  if (disabledElement.disabled) return false;

  // Check if element has tabindex="-1"
  if (element.getAttribute('tabindex') === '-1') return false;

  return true;
};
