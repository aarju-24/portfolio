/**
 * Animation Type Definitions
 * TypeScript types for animation components and utilities
 */

import {TargetAndTransition, Variants} from 'framer-motion';
import {ReactNode} from 'react';

/**
 * Configuration for animation components
 */
export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: number[] | string;
  threshold?: number;
  staggerDelay?: number;
}

/**
 * Props for FadeInOnScroll component
 */
export interface FadeInOnScrollProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
}

/**
 * Props for StaggerContainer component
 */
export interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
}

/**
 * Props for StaggerItem component
 */
export interface StaggerItemProps {
  children: ReactNode;
  duration?: number;
  className?: string;
}

/**
 * Props for HoverScale component
 */
export interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
}

/**
 * Props for ParallaxScroll component
 */
export interface ParallaxScrollProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

/**
 * Props for AnimatedBlobs component
 */
export interface AnimatedBlobsProps {
  className?: string;
  opacity?: number;
  colors?: string[];
}

/**
 * Props for PortfolioCard component
 */
export interface PortfolioCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  featured?: boolean;
  className?: string;
}

/**
 * Props for FormInput component
 */
export interface FormInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  success?: boolean;
  className?: string;
}

/**
 * Motion preference state
 */
export interface MotionPreference {
  prefersReducedMotion: boolean;
}

/**
 * Scroll spy state
 */
export interface ScrollSpyState {
  activeSection: string;
  sections: ScrollSpySection[];
}

export interface ScrollSpySection {
  id: string;
  label: string;
  offset: number;
}

/**
 * Color scheme configuration
 */
export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textSecondary: string;
}

/**
 * Framer Motion animation variants
 */
export type AnimationVariant = Variants;

/**
 * Animation target configuration
 */
export type AnimationTarget = TargetAndTransition;
