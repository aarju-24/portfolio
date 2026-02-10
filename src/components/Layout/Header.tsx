/**
 * Header Component
 * Sticky navigation header with scroll spy functionality
 * Implements background blur/color change on scroll
 * Supports smooth transitions and proper z-index management
 * Respects prefers-reduced-motion preference
 */

import {motion} from 'framer-motion';
import React, {FC, memo, useCallback, useEffect, useState} from 'react';

import {ANIMATION_DURATIONS, ANIMATION_EASING} from '../../config/animation';
import {useScrollSpy} from '../../hooks/useScrollSpy';
import {getAnimationDuration, useMotionPreference} from '../../utils/motion';
import {getTargetIdFromHref, smoothScrollToElement} from '../../utils/smoothScroll';
import {HamburgerMenu} from './HamburgerMenu';

/**
 * Props for Header component
 */
export interface HeaderProps {
  /** Navigation links */
  links?: Array<{
    label: string;
    href: string;
    id: string;
  }>;
  /** Currently active section ID */
  activeSection?: string;
  /** Callback when navigation link is clicked */
  onLinkClick?: (href: string) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Header Component
 *
 * Renders a sticky navigation header with:
 * - Fixed positioning at top with proper z-index
 * - Background blur/color change on scroll
 * - Smooth transitions (300ms)
 * - Scroll spy highlighting of current section
 * - Responsive design for mobile and desktop
 * - Respects prefers-reduced-motion preference
 *
 * @param props - Component props
 * @param props.links - Array of navigation links with label, href, and id
 * @param props.activeSection - Currently active section ID for highlighting
 * @param props.onLinkClick - Callback when navigation link is clicked
 * @param props.className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <Header
 *   links={[
 *     { label: 'Home', href: '#hero', id: 'hero' },
 *     { label: 'Portfolio', href: '#portfolio', id: 'portfolio' },
 *     { label: 'Contact', href: '#contact', id: 'contact' },
 *   ]}
 *   activeSection="portfolio"
 *   onLinkClick={(href) => smoothScroll(href)}
 * />
 * ```
 */
export const Header: FC<HeaderProps> = memo(
  ({
    links = [
      {label: 'Home', href: '#hero', id: 'hero'},
      {label: 'Portfolio', href: '#portfolio', id: 'portfolio'},
      {label: 'About', href: '#about', id: 'about'},
      {label: 'Contact', href: '#contact', id: 'contact'},
    ],
    activeSection = 'hero',
    onLinkClick,
    className = '',
  }) => {
    const prefersReduced = useMotionPreference();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Use scroll spy to detect current section
    const currentSection = useScrollSpy(
      links.map(link => ({id: link.id, label: link.label})),
      {
        threshold: 0.3,
        rootMargin: '-50px 0px -50% 0px',
      },
    );

    // Use current section from scroll spy if available, otherwise use prop
    const activeSectionId = currentSection || activeSection;

    // Handle scroll event to detect when to change header background
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle keyboard escape to close menu
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isMenuOpen) {
          setIsMenuOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isMenuOpen]);

    // Animation duration for header background transition
    const transitionDuration = getAnimationDuration(ANIMATION_DURATIONS.headerTransition, prefersReduced);

    // Header background animation variants
    const headerVariants = {
      initial: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        backdropFilter: 'blur(0px)',
      },
      scrolled: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
      },
    };

    // Link underline animation variants
    const underlineVariants = {
      initial: {
        scaleX: 0,
        originX: 0,
      },
      hover: {
        scaleX: 1,
        transition: {
          duration: getAnimationDuration(ANIMATION_DURATIONS.hoverUnderline, prefersReduced),
          ease: ANIMATION_EASING.easeInOut,
        },
      },
    };

    const handleLinkClick = useCallback(
      (href: string) => {
        const targetId = getTargetIdFromHref(href);
        smoothScrollToElement(targetId, ANIMATION_DURATIONS.smoothScroll * 1000, 80);
        if (onLinkClick) {
          onLinkClick(href);
        }
      },
      [onLinkClick],
    );

    return (
      <motion.header
        animate={isScrolled ? 'scrolled' : 'initial'}
        className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-200 transition-all duration-300 ${className}`}
        initial="initial"
        style={{
          borderColor: isScrolled ? 'rgba(229, 231, 235, 0.5)' : 'rgba(229, 231, 235, 0)',
        }}
        transition={{
          duration: transitionDuration,
          ease: ANIMATION_EASING.easeInOut,
        }}
        variants={headerVariants}>
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <a className="text-2xl font-bold text-primary-600" href="#hero">
                Portfolio
              </a>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map(link => (
                <motion.div className="relative" key={link.id} whileHover="hover">
                  <a
                    className={`text-sm font-medium transition-colors duration-200 ${
                      activeSectionId === link.id ? 'text-primary-600' : 'text-textSecondary hover:text-primary-600'
                    }`}
                    href={link.href}
                    onClick={e => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}>
                    {link.label}
                  </a>

                  {/* Underline animation on hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-primary-600"
                    initial="initial"
                    variants={underlineVariants}
                    whileHover="hover"
                  />

                  {/* Active indicator */}
                  {activeSectionId === link.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-primary-600"
                      layoutId="activeUnderline"
                    />
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              aria-label="Toggle menu"
              className="md:hidden p-2 text-textSecondary hover:text-primary-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <HamburgerMenu
          activeSection={activeSectionId}
          isOpen={isMenuOpen}
          links={links}
          onClose={useCallback(() => setIsMenuOpen(false), [])}
          onLinkClick={handleLinkClick}
        />
      </motion.header>
    );
  },
);

Header.displayName = 'Header';

export default Header;
