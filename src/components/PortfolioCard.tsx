/**
 * PortfolioCard Component
 * Displays project image, title, description, and tags
 * Implements responsive sizing with overflow hidden for image zoom effect
 * Includes hover effects: image zoom (1.1x), overlay fade-in, shadow elevation
 * Respects prefers-reduced-motion preference
 */

import {motion} from 'framer-motion';
import Image from 'next/image';
import React, {FC, memo} from 'react';

import {ANIMATION_DURATIONS, ANIMATION_EASING, ANIMATION_SCALES} from '../config/animation';
import {PortfolioCardProps} from '../types/animation';
import {getAnimationDuration, useMotionPreference} from '../utils/motion';

/**
 * PortfolioCard Component
 *
 * Renders a portfolio project card with:
 * - Project image with zoom effect on hover (1.1x scale)
 * - Title, description, and technology tags
 * - Overlay that fades in on hover with project details
 * - Shadow elevation effect on hover
 * - Responsive sizing (full width on mobile, constrained on desktop)
 * - GPU-accelerated animations using transform and opacity
 *
 * Respects prefers-reduced-motion preference for accessibility.
 *
 * @param props - Component props
 * @param props.id - Unique identifier for the card
 * @param props.title - Project title
 * @param props.description - Project description
 * @param props.image - Project image URL or path
 * @param props.technologies - Array of technology tags
 * @param props.link - Optional link to project details or external URL
 * @param props.featured - Whether this is a featured project (default: false)
 * @param props.className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <PortfolioCard
 *   id="project-1"
 *   title="E-Commerce Platform"
 *   description="A full-stack e-commerce platform with React and Node.js"
 *   image="/images/project1.jpg"
 *   technologies={['React', 'Node.js', 'MongoDB']}
 *   link="/projects/ecommerce"
 * />
 * ```
 */
export const PortfolioCard: FC<PortfolioCardProps> = memo(
  ({title, description, image, technologies, link, featured = false, className = ''}) => {
    const prefersReduced = useMotionPreference();

    // Animation durations
    const hoverDuration = getAnimationDuration(ANIMATION_DURATIONS.hoverScale, prefersReduced);
    const overlayDuration = getAnimationDuration(ANIMATION_DURATIONS.fadeInFast, prefersReduced);

    // Image zoom animation variants
    const imageVariants = {
      initial: {
        scale: 1,
      },
      hover: {
        scale: ANIMATION_SCALES.imageHoverScale,
        transition: {
          duration: hoverDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
    };

    // Overlay fade-in animation variants
    const overlayVariants = {
      initial: {
        opacity: 0,
      },
      hover: {
        opacity: 1,
        transition: {
          duration: overlayDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
    };

    // Card shadow elevation animation variants
    const cardVariants = {
      initial: {
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      },
      hover: {
        boxShadow: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
        transition: {
          duration: hoverDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
    };

    return (
      <motion.div
        className={`group relative overflow-hidden rounded-lg bg-white transition-all duration-300 ${className}`}
        initial="initial"
        variants={cardVariants}
        whileHover="hover">
        {/* Image Container with Overflow Hidden */}
        <div className="relative h-64 w-full overflow-hidden bg-gray-200">
          <motion.div className="h-full w-full" initial="initial" variants={imageVariants} whileHover="hover">
            <Image alt={title} className="h-full w-full object-cover" height={256} src={image} width={400} />
          </motion.div>

          {/* Overlay with Project Details */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm"
            initial="initial"
            variants={overlayVariants}
            whileHover="hover">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm text-gray-200">{description}</p>
            </div>
          </motion.div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>

          {/* Description */}
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">{description}</p>

          {/* Technology Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.map(tech => (
              <span
                className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700"
                key={tech}>
                {tech}
              </span>
            ))}
          </div>

          {/* Link Button */}
          {link && (
            <a
              className="mt-4 inline-block text-sm font-medium text-primary-600 hover:text-primary-700"
              href={link}
              rel="noopener noreferrer"
              target="_blank">
              View Project →
            </a>
          )}
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute right-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-gray-900">
            Featured
          </div>
        )}
      </motion.div>
    );
  },
);

PortfolioCard.displayName = 'PortfolioCard';

export default PortfolioCard;
