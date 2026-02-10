import {FC, ForwardRefExoticComponent, SVGProps} from 'react';

import {IconProps} from '../components/Icon/Icon';

/* =========================
   HOMEPAGE META
========================= */
export interface HomepageMeta {
  title: string;
  description: string;
}

/* =========================
   HERO
========================= */
export interface Hero {
  imageSrc: string;
  name: string;
  description: JSX.Element;
  actions: HeroActionItem[];
}

interface HeroActionItem {
  href: string;
  text: string;
  primary?: boolean;
  Icon?: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'>>;
}

/* =========================
   ABOUT
========================= */
export interface About {
  profileImageSrc?: string;
  description: string;
  aboutItems: AboutItem[];
}

export interface AboutItem {
  label: string;
  text: string;
  Icon?: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'>>;
}

/* =========================
   SKILLS (TYPES ONLY)
========================= */
export interface Skill {
  name: string;
  level: number;
  max?: number;
}

export interface SkillGroup {
  name: string;
  skills: Skill[];
}

/* =========================
   PORTFOLIO
========================= */
export interface PortfolioItem {
  title: string;
  subtitle?: string;
  description?: string[];
  category?: string;
  tech?: string[];
  githubUrl?: string;
}

/* =========================
   TIMELINE
========================= */
export interface TimelineItem {
  date: string;
  location: string;
  title: string;
  content: JSX.Element;
}

/* =========================
   TESTIMONIALS
========================= */
export interface TestimonialSection {
  testimonials: Testimonial[];
}

export interface Testimonial {
  name: string;
  text: string;
}

/* =========================
   CONTACT
========================= */
export interface ContactSection {
  headerText?: string;
  description: string;
  items: ContactItem[];
}

export const ContactType = {
  Email: 'Email',
  Phone: 'Phone',
  Location: 'Location',
  Github: 'Github',
  LinkedIn: 'LinkedIn',
  Facebook: 'Facebook',
  Twitter: 'Twitter',
  Instagram: 'Instagram',
} as const;

export type ContactType = (typeof ContactType)[keyof typeof ContactType];

export interface ContactItem {
  type: ContactType;
  text: string;
  href?: string;
}

export interface ContactValue {
  Icon: FC<IconProps> | ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'>>;
  srLabel: string;
}

/* =========================
   SOCIAL
========================= */
export interface Social {
  label: string;
  Icon: FC<IconProps>;
  href: string;
}
