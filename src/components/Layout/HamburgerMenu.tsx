/**
 * HamburgerMenu Component
 * Mobile navigation menu with slide-in animation
 * Displays hamburger icon on mobile (< 768px)
 * Implements slide-in menu animation with semi-transparent backdrop
 * Requirements: 6.5
 */

import {AnimatePresence, motion} from 'framer-motion';
import React, {FC, memo} from 'react';

import {ANIMATION_DURATIONS, ANIMATION_EASING} from '../../config/animation';
import {getAnimationDuration, useMotionPreference} from '../../utils/motion';

/**
 * Props for HamburgerMenu component
 */
export interface HamburgerMenuProps {
  /** Navigation links */
  links?: Array<{
    label: string;
    href: string;
    id: string;
  }>;
  /** Currently active section ID */
  activeSection?: string;
  /** Whether menu is open */
  isOpen: boolean;
  /** Callback when menu should close */
  onClose: () => void;
  /** Callback when navigation link is clicked */
  onLinkClick?: (href: string) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * HamburgerMenu Component
 *
 * Renders a mobile navigation menu with:
 * - Hamburger icon trigger
 * - Slide-in menu animation from right (300ms)
 * - Semi-transparent backdrop (0.5 opacity)
 * - Close on backdrop click or link click
 * - Keyboard escape support (handled by parent)
 * - Responsive design (hidden on desktop)
 * - Respects prefers-reduced-motion preference
 *
 * @param props - Component props
 * @param props.links - Array of navigation links
 * @param props.activeSection - Currently active section ID
 * @param props.isOpen - Whether menu is open
 * @param props.onClose - Callback when menu should close
 * @param props.onLinkClick - Callback when navigation link is clicked
 * @param props.className - Additional CSS classes
 *
 * @example
 * ```tsx
 * const [isMenuOpen, setIsMenuOpen] = useState(false);
 *
 * <HamburgerMenu
 *   links={navigationLinks}
 *   activeSection="portfolio"
 *   isOpen={isMenuOpen}
 *   onClose={() => setIsMenuOpen(false)}
 *   onLinkClick={(href) => {
 *     smoothScroll(href);
 *     setIsMenuOpen(false);
 *   }}
 * />
 * ```
 */
export const HamburgerMenu: FC<HamburgerMenuProps> = memo(
  ({
    links = [
      {label: 'Home', href: '#hero', id: 'hero'},
      {label: 'Portfolio', href: '#portfolio', id: 'portfolio'},
      {label: 'About', href: '#about', id: 'about'},
      {label: 'Contact', href: '#contact', id: 'contact'},
    ],
    activeSection = 'hero',
    isOpen,
    onClose,
    onLinkClick,
    className = '',
  }) => {
    const prefersReduced = useMotionPreference();

    // Animation duration for menu slide-in
    const menuDuration = getAnimationDuration(ANIMATION_DURATIONS.mobileMenuSlide, prefersReduced);

    // Menu slide-in animation variants
    const menuVariants = {
      hidden: {
        x: '100%',
        opacity: 0,
      },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          duration: menuDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
      exit: {
        x: '100%',
        opacity: 0,
        transition: {
          duration: menuDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
    };

    // Backdrop fade animation variants
    const backdropVariants = {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
        transition: {
          duration: menuDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          duration: menuDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
    };

    // Link animation variants
    const linkVariants = {
      hidden: {
        opacity: 0,
        x: 20,
      },
      visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
          delay: i * 0.05,
          duration: 0.3,
          ease: ANIMATION_EASING.easeInOut,
        },
      }),
    };

    const handleLinkClick = (href: string) => {
      if (onLinkClick) {
        onLinkClick(href);
      }
      onClose();
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              animate="visible"
              className="fixed inset-0 z-40 bg-black"
              exit="exit"
              initial="hidden"
              onClick={onClose}
              style={{opacity: 0.5}}
              variants={backdropVariants}
            />

            {/* Menu */}
            <motion.nav
              animate="visible"
              className={`fixed top-0 right-0 bottom-0 z-50 w-64 bg-white shadow-lg overflow-y-auto ${className}`}
              exit="exit"
              initial="hidden"
              variants={menuVariants}>
              {/* Close button */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <span className="text-lg font-semibold text-gray-900">Menu</span>
                <button
                  aria-label="Close menu"
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={onClose}>
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </button>
              </div>

              {/* Navigation links */}
              <div className="p-6 space-y-2">
                {links.map((link, index) => (
                  <motion.a
                    animate="visible"
                    className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeSection === link.id
                        ? 'bg-primary-100 text-primary-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    custom={index}
                    href={link.href}
                    initial="hidden"
                    key={link.id}
                    onClick={e => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    variants={linkVariants}>
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    );
  },
);

HamburgerMenu.displayName = 'HamburgerMenu';

export default HamburgerMenu;
