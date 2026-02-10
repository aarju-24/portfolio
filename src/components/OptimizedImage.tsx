/**
 * OptimizedImage Component
 * Uses Next.js Image component with lazy loading and fade-in animation
 * Implements Intersection Observer for custom lazy loading
 * Displays placeholder while loading
 * Requirements: 8.1, 8.2, 8.3, 8.5
 */

import {motion} from 'framer-motion';
import Image, {ImageProps} from 'next/image';
import React, {FC, memo, useCallback, useEffect, useRef, useState} from 'react';

import {ANIMATION_DURATIONS, ANIMATION_EASING} from '../config/animation';
import {getAnimationDuration, useMotionPreference} from '../utils/motion';

/**
 * Props for OptimizedImage component
 */
export interface OptimizedImageProps extends Omit<ImageProps, 'alt' | 'onError'> {
  /** Image alt text (required for accessibility) */
  alt: string;
  /** Whether to use lazy loading (default: true) */
  lazy?: boolean;
  /** Placeholder background color while loading */
  placeholderColor?: string;
  /** Show skeleton loader while loading */
  showSkeleton?: boolean;
  /** Callback when image finishes loading */
  onLoadComplete?: () => void;
  /** Callback when image fails to load */
  onError?: (error: Error) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * OptimizedImage Component
 *
 * Renders an optimized image with:
 * - Next.js Image component for automatic optimization
 * - Lazy loading using Intersection Observer
 * - Fade-in animation as image loads (300-500ms)
 * - Placeholder or skeleton loader while loading
 * - Graceful error handling
 * - Responsive srcSet and sizing
 * - WebP format with fallbacks
 * - Respects prefers-reduced-motion preference
 *
 * @param props - Component props
 * @param props.src - Image source URL
 * @param props.alt - Image alt text
 * @param props.width - Image width
 * @param props.height - Image height
 * @param props.lazy - Whether to use lazy loading (default: true)
 * @param props.placeholderColor - Placeholder background color
 * @param props.showSkeleton - Show skeleton loader (default: true)
 * @param props.onLoadComplete - Callback when image loads
 * @param props.onError - Callback when image fails
 * @param props.className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <OptimizedImage
 *   src="/images/project.jpg"
 *   alt="Project screenshot"
 *   width={400}
 *   height={300}
 *   lazy={true}
 * />
 * ```
 */
export const OptimizedImage: FC<OptimizedImageProps> = memo(
  ({
    src,
    alt,
    width,
    height,
    lazy = true,
    placeholderColor = 'bg-gray-200',
    showSkeleton = true,
    onLoadComplete,
    onError,
    className = '',
    ...imageProps
  }) => {
    const prefersReduced = useMotionPreference();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(!lazy);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Animation duration for fade-in
    const fadeDuration = getAnimationDuration(ANIMATION_DURATIONS.fadeInFast, prefersReduced);

    // Set up Intersection Observer for lazy loading
    useEffect(() => {
      if (!lazy || isVisible) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        {
          rootMargin: '50px',
          threshold: 0.01,
        },
      );

      const currentRef = containerRef.current;
      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [lazy, isVisible]);

    // Image fade-in animation variants
    const imageVariants = {
      hidden: {opacity: 0},
      visible: {
        opacity: 1,
        transition: {
          duration: fadeDuration,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
    };

    // Skeleton animation variants
    const skeletonVariants = {
      visible: {
        opacity: [0.5, 1, 0.5],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: ANIMATION_EASING.easeInOut,
        },
      },
    };

    const handleLoadComplete = useCallback(() => {
      setIsLoaded(true);
      onLoadComplete?.();
    }, [onLoadComplete]);

    const handleError = useCallback(
      (error: Error) => {
        setHasError(true);
        onError?.(error);
      },
      [onError],
    );

    const handleImageError = useCallback(() => {
      handleError(new Error('Image failed to load'));
    }, [handleError]);

    return (
      <div
        className={`relative overflow-hidden rounded-lg ${className}`}
        ref={containerRef}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : 'auto',
        }}>
        {/* Placeholder/Skeleton Loader */}
        {!isLoaded && showSkeleton && (
          <motion.div
            animate="visible"
            className={`absolute inset-0 ${placeholderColor}`}
            initial={{opacity: 0.5}}
            variants={skeletonVariants}
          />
        )}

        {/* Image */}
        {isVisible && !hasError && (
          <motion.div
            animate={isLoaded ? 'visible' : 'hidden'}
            className="relative w-full h-full"
            initial="hidden"
            variants={imageVariants}>
            <Image
              alt={alt}
              className="object-cover"
              fill
              onError={handleImageError}
              onLoadingComplete={handleLoadComplete}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              src={src}
              {...imageProps}
            />
          </motion.div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <svg
                className="h-12 w-12 text-gray-400 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              <p className="text-sm text-gray-500">Image failed to load</p>
            </div>
          </div>
        )}
      </div>
    );
  },
);

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
