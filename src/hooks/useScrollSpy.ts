/**
 * useScrollSpy Hook
 * Detects current section using Intersection Observer
 * Highlights active navigation link in real-time as user scrolls
 * Requirements: 6.2
 */

import {useEffect, useState} from 'react';

export interface ScrollSpySection {
  id: string;
  label: string;
}

/**
 * Hook to detect which section is currently in view
 * Uses Intersection Observer API for efficient scroll detection
 * Updates active section in real-time as user scrolls
 *
 * @param sections - Array of section objects with id and label
 * @param options - Configuration options for Intersection Observer
 * @returns Currently active section ID
 *
 * @example
 * ```tsx
 * const activeSection = useScrollSpy([
 *   { id: 'hero', label: 'Home' },
 *   { id: 'portfolio', label: 'Portfolio' },
 *   { id: 'contact', label: 'Contact' },
 * ]);
 * ```
 */
export const useScrollSpy = (
  sections: ScrollSpySection[],
  options?: {
    threshold?: number | number[];
    rootMargin?: string;
  },
): string => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    if (sections.length === 0) return;

    // Create Intersection Observer to detect which sections are in view
    const observer = new IntersectionObserver(
      entries => {
        // Find the section with the largest intersection ratio (most visible)
        let maxRatio = 0;
        let visibleSection = activeSection;

        entries.forEach(entry => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            visibleSection = entry.target.id;
          }
        });

        // Update active section if a section is visible
        if (maxRatio > 0) {
          setActiveSection(visibleSection);
        }
      },
      {
        threshold: options?.threshold || 0.3,
        rootMargin: options?.rootMargin || '-50px 0px -50% 0px',
      },
    );

    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [sections, activeSection, options]);

  return activeSection;
};
