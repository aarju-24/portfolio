import {motion} from 'framer-motion';
import {FC, memo} from 'react';

import {TimelineItem} from '../../../data/dataDef';

interface EducationCardProps {
  index: number;
  item: TimelineItem;
}

/**
 * EducationCard Component
 * Displays education item with animations and micro interactions
 */
export const EducationCard: FC<EducationCardProps> = memo(({item, index}) => {
  const cardVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.08,
        ease: 'easeOut',
      },
    },
  };

  const hoverVariants = {
    hover: {
      y: -2,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Color scheme based on education level
  const getColorScheme = () => {
    if (item.title.includes('B.Tech')) {
      return {
        border: 'border-blue-200',
        bg: 'bg-white/50',
        badge: 'bg-blue-100 text-blue-700',
        title: 'text-blue-900',
        blobColor: 'bg-gradient-to-br from-blue-300 to-blue-400',
      };
    } else if (item.title.includes('12th')) {
      return {
        border: 'border-slate-200',
        bg: 'bg-white/50',
        badge: 'bg-slate-100 text-slate-700',
        title: 'text-slate-900',
        blobColor: 'bg-gradient-to-br from-slate-300 to-slate-400',
      };
    }
    return {
      border: 'border-amber-200',
      bg: 'bg-white/50',
      badge: 'bg-amber-100 text-amber-700',
      title: 'text-amber-900',
      blobColor: 'bg-gradient-to-br from-amber-300 to-amber-400',
    };
  };

  const colors = getColorScheme();

  return (
    <motion.div
      className="group relative"
      initial="hidden"
      variants={cardVariants}
      viewport={{once: true}}
      whileHover="hover"
      whileInView="visible">
      {/* Blurry background blob - positioned absolutely outside */}
      <motion.div
        className={`absolute -top-8 -right-8 w-64 h-64 ${colors.blobColor} rounded-full blur-3xl opacity-20 -z-10 pointer-events-none`}
        initial={{scale: 0.5, opacity: 0}}
        transition={{delay: index * 0.08 + 0.1, duration: 0.6}}
        whileHover={{scale: 1.2, opacity: 0.3}}
        whileInView={{scale: 1, opacity: 0.2}}
      />

      {/* Secondary blob for depth */}
      <motion.div
        className={`absolute -bottom-8 -left-8 w-56 h-56 ${colors.blobColor} rounded-full blur-3xl opacity-15 -z-10 pointer-events-none`}
        initial={{scale: 0.5, opacity: 0}}
        transition={{delay: index * 0.08 + 0.2, duration: 0.7}}
        whileHover={{scale: 1.1, opacity: 0.2}}
        whileInView={{scale: 1, opacity: 0.15}}
      />

      <motion.div
        className={`relative overflow-visible rounded-lg border ${colors.border} ${colors.bg} backdrop-blur-sm shadow-sm transition-all duration-300`}
        variants={hoverVariants}>
        {/* Main content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <motion.h3
                className={`text-lg font-semibold ${colors.title}`}
                initial={{opacity: 0, x: -10}}
                transition={{delay: index * 0.08 + 0.15, duration: 0.4}}
                whileInView={{opacity: 1, x: 0}}>
                {item.title}
              </motion.h3>

              <motion.p
                className="mt-1 text-sm text-slate-600"
                initial={{opacity: 0}}
                transition={{delay: index * 0.08 + 0.2, duration: 0.4}}
                whileInView={{opacity: 1}}>
                {item.location}
              </motion.p>
            </div>

            {/* Date badge */}
            <motion.span
              className={`${colors.badge} inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold flex-shrink-0`}
              initial={{scale: 0.8, opacity: 0}}
              transition={{delay: index * 0.08 + 0.25, duration: 0.3}}
              whileInView={{scale: 1, opacity: 1}}>
              {item.date}
            </motion.span>
          </div>

          {/* Description - Always visible */}
          <motion.div
            className="mt-4"
            initial={{opacity: 0, y: 10}}
            transition={{delay: index * 0.08 + 0.3, duration: 0.4}}
            whileInView={{opacity: 1, y: 0}}>
            <motion.div
              className="text-sm text-slate-700 leading-relaxed"
              initial={{opacity: 0}}
              transition={{delay: index * 0.08 + 0.4, duration: 0.4}}
              whileInView={{opacity: 1}}>
              {item.content}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
});

EducationCard.displayName = 'EducationCard';
