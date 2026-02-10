/**
 * AnimatedBlobs Component
 * Renders 3-4 animated gradient blobs in the background with continuous smooth animation
 * Uses GPU-accelerated transforms (transform property only) for performance
 * Respects prefers-reduced-motion preference
 */

import {motion} from 'framer-motion';
import React, {useMemo} from 'react';

import {AnimatedBlobsProps} from '../types/animation';
import {useMotionPreference} from '../utils/motion';

/**
 * AnimatedBlobs Component
 *
 * Renders 3-4 animated gradient blobs that move continuously in the background.
 * Each blob has a different color and animation duration for visual variety.
 * Uses GPU-accelerated transforms (transform property only) to maintain 60fps performance.
 * Respects user's prefers-reduced-motion preference.
 *
 * @param props - Component props
 * @param props.className - Additional CSS classes
 * @param props.opacity - Opacity of the blobs (default: 0.4)
 * @param props.colors - Array of colors for the blobs (default: portfolio color scheme)
 *
 * @example
 * ```tsx
 * <AnimatedBlobs opacity={0.3} colors={['#3B82F6', '#8B5CF6', '#EC4899']} />
 * ```
 *
 * @example
 * ```tsx
 * <AnimatedBlobs className="absolute inset-0 -z-10" />
 * ```
 */
// eslint-disable-next-line react-memo/require-memo
export const AnimatedBlobs: React.FC<AnimatedBlobsProps> = ({
  className = '',
  opacity = 0.4,
  colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B'],
}) => {
  const prefersReduced = useMotionPreference();

  // Default animation durations for each blob (20-30s range)
  const blobDurations = useMemo(() => [20, 25, 30, 22], []);

  // Animation variants for each blob with continuous circular motion
  // Using transform: translateX and translateY for GPU acceleration
  const createBlobVariants = (duration: number) => ({
    animate: {
      x: [0, 100, 50, -100, 0],
      y: [0, 50, 100, 30, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  });

  // If reduced motion is preferred, disable animations
  const animationVariants = prefersReduced
    ? {
        animate: {
          x: 0,
          y: 0,
          transition: {duration: 0},
        },
      }
    : undefined;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{zIndex: -1}}>
      {/* Blob 1 - Blue, 20s duration */}
      <motion.div
        animate="animate"
        className="absolute rounded-full blur-3xl"
        style={{
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, ${colors[0]} 0%, transparent 70%)`,
          opacity,
          top: '-100px',
          left: '-100px',
        }}
        variants={animationVariants || createBlobVariants(blobDurations[0])}
      />

      {/* Blob 2 - Purple, 25s duration */}
      <motion.div
        animate="animate"
        className="absolute rounded-full blur-3xl"
        style={{
          width: '350px',
          height: '350px',
          background: `radial-gradient(circle, ${colors[1]} 0%, transparent 70%)`,
          opacity,
          top: '50%',
          right: '-50px',
          transform: 'translateY(-50%)',
        }}
        variants={animationVariants || createBlobVariants(blobDurations[1])}
      />

      {/* Blob 3 - Pink, 30s duration */}
      <motion.div
        animate="animate"
        className="absolute rounded-full blur-3xl"
        style={{
          width: '380px',
          height: '380px',
          background: `radial-gradient(circle, ${colors[2]} 0%, transparent 70%)`,
          opacity,
          bottom: '-80px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        variants={animationVariants || createBlobVariants(blobDurations[2])}
      />

      {/* Blob 4 - Amber, 22s duration */}
      <motion.div
        animate="animate"
        className="absolute rounded-full blur-3xl"
        style={{
          width: '320px',
          height: '320px',
          background: `radial-gradient(circle, ${colors[3]} 0%, transparent 70%)`,
          opacity,
          top: '20%',
          left: '10%',
        }}
        variants={animationVariants || createBlobVariants(blobDurations[3])}
      />
    </div>
  );
};

export default AnimatedBlobs;
