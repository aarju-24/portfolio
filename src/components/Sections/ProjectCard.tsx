import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/outline';
import {motion} from 'framer-motion';
import {FC, memo, useMemo} from 'react';

interface ProjectCardProps {
  category: string;
  description: string[];
  githubUrl?: string;
  index: number;
  subtitle: string;
  tech: string[];
  title: string;
}

interface ColorScheme {
  accent: string;
  badge: string;
  bg: string;
  blobColor: string;
  border: string;
  title: string;
}

/**
 * ProjectCard Component
 * Displays project with animations, colors, and micro interactions
 */
export const ProjectCard: FC<ProjectCardProps> = memo(
  ({title, subtitle, description, tech, githubUrl, category, index}) => {
    const cardVariants = {
      hidden: {opacity: 0, y: 30},
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: index * 0.1,
          ease: 'easeOut',
        },
      },
    };

    const hoverVariants = {
      hover: {
        y: -8,
        boxShadow: '0 20px 50px rgba(59, 130, 246, 0.15)',
        transition: {
          duration: 0.3,
        },
      },
    };

    // Color scheme based on category
    const getColorScheme = (): ColorScheme => {
      const schemes: Record<string, ColorScheme> = {
        'Data Analytics': {
          accent: 'from-blue-400 to-blue-500',
          badge: 'bg-blue-100 text-blue-700',
          bg: 'from-blue-50 to-blue-50',
          blobColor: 'from-blue-300 to-blue-400',
          border: 'border-blue-200',
          title: 'text-blue-900',
        },
        'Machine Learning': {
          accent: 'from-purple-400 to-purple-500',
          badge: 'bg-purple-100 text-purple-700',
          bg: 'from-purple-50 to-purple-50',
          blobColor: 'from-purple-300 to-purple-400',
          border: 'border-purple-200',
          title: 'text-purple-900',
        },
        Automation: {
          accent: 'from-green-400 to-green-500',
          badge: 'bg-green-100 text-green-700',
          bg: 'from-green-50 to-green-50',
          blobColor: 'from-green-300 to-green-400',
          border: 'border-green-200',
          title: 'text-green-900',
        },
      };
      return schemes[category] || schemes['Data Analytics'];
    };

    const colors = getColorScheme();

    const techColors = useMemo(
      () =>
        tech.map((_, i) => {
          const colorSchemes = [
            'from-blue-100 to-blue-50 text-blue-700 border-blue-200',
            'from-purple-100 to-purple-50 text-purple-700 border-purple-200',
            'from-green-100 to-green-50 text-green-700 border-green-200',
            'from-orange-100 to-orange-50 text-orange-700 border-orange-200',
            'from-pink-100 to-pink-50 text-pink-700 border-pink-200',
          ];
          return colorSchemes[i % colorSchemes.length];
        }),
      [tech],
    );

    return (
      <motion.div
        className="group relative"
        initial="hidden"
        variants={cardVariants}
        viewport={{once: true}}
        whileHover="hover"
        whileInView="visible">
        {/* Blurry background blob */}
        <motion.div
          className={`absolute -inset-6 bg-gradient-to-br ${colors.blobColor} rounded-2xl blur-3xl opacity-20 -z-10 pointer-events-none`}
          initial={{scale: 0.8, opacity: 0}}
          transition={{delay: index * 0.1 + 0.1, duration: 0.6}}
          whileHover={{scale: 1.15, opacity: 0.3}}
          whileInView={{scale: 1, opacity: 0.2}}
        />

        <motion.div
          className={`relative overflow-hidden rounded-xl border-2 ${colors.border} bg-gradient-to-br ${colors.bg} backdrop-blur-sm shadow-lg transition-all duration-300`}
          variants={hoverVariants}>
          {/* Main content */}
          <div className="p-6">
            {/* Header with category badge */}
            <div className="mb-3 flex items-start justify-between gap-4">
              <div className="flex-1">
                <motion.span
                  className={`${colors.badge} inline-block rounded-full px-3 py-1 text-xs font-semibold`}
                  initial={{scale: 0.8, opacity: 0}}
                  transition={{delay: index * 0.1 + 0.15, duration: 0.3}}
                  whileInView={{scale: 1, opacity: 1}}>
                  {category}
                </motion.span>
              </div>
            </div>

            {/* Title */}
            <motion.h3
              className={`text-xl font-bold ${colors.title}`}
              initial={{opacity: 0, x: -10}}
              transition={{delay: index * 0.1 + 0.2, duration: 0.4}}
              whileInView={{opacity: 1, x: 0}}>
              {title}
            </motion.h3>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                className="mt-2 text-sm font-medium text-slate-600"
                initial={{opacity: 0}}
                transition={{delay: index * 0.1 + 0.25, duration: 0.4}}
                whileInView={{opacity: 1}}>
                {subtitle}
              </motion.p>
            )}

            {/* Description */}
            {description && description.length > 0 && (
              <motion.ul
                className="mt-4 space-y-2"
                initial={{opacity: 0}}
                transition={{delay: index * 0.1 + 0.3, duration: 0.4}}
                whileInView={{opacity: 1}}>
                {description.map((point, i) => (
                  <motion.li
                    className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed"
                    initial={{opacity: 0, x: -5}}
                    key={i}
                    transition={{delay: index * 0.1 + 0.3 + i * 0.05, duration: 0.3}}
                    whileInView={{opacity: 1, x: 0}}>
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 bg-gradient-to-r ${colors.accent}`}
                    />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}

            {/* Tech stack */}
            {tech && tech.length > 0 && (
              <motion.div
                className="mt-5 flex flex-wrap gap-2"
                initial={{opacity: 0}}
                transition={{delay: index * 0.1 + 0.4, duration: 0.4}}
                whileInView={{opacity: 1}}>
                {tech.map((t, i) => (
                  <motion.span
                    className={`rounded-full border bg-gradient-to-br px-3 py-1 text-xs font-medium transition-all duration-200 ${techColors[i]}`}
                    initial={{scale: 0.8, opacity: 0}}
                    key={i}
                    transition={{delay: index * 0.1 + 0.4 + i * 0.05, duration: 0.3}}
                    whileHover={{scale: 1.05, y: -2}}
                    whileInView={{scale: 1, opacity: 1}}>
                    {t}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {/* GitHub button */}
            {githubUrl && (
              <motion.div
                className="mt-6"
                initial={{opacity: 0, y: 10}}
                transition={{delay: index * 0.1 + 0.5, duration: 0.4}}
                whileInView={{opacity: 1, y: 0}}>
                <motion.a
                  className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-r ${colors.accent} px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg`}
                  href={githubUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  whileHover={{scale: 1.05, y: -2}}
                  whileTap={{scale: 0.95}}>
                  View Project
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </motion.a>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  },
);

ProjectCard.displayName = 'ProjectCard';
