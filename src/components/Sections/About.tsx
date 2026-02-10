import {motion} from 'framer-motion';
import {FC, memo, useMemo} from 'react';

import {SectionId} from '../../data/data';
import Section from '../Layout/Section';

const About: FC = memo(() => {
  // Animation variants for container
  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  // Animation variants for individual items
  const itemVariants = {
    hidden: {opacity: 0, y: 15},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // Highlight box variants with more interactivity
  const highlightVariants = {
    hidden: {opacity: 0, scale: 0.9, y: 10},
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)',
      transition: {
        duration: 0.3,
      },
    },
  };

  const highlights = useMemo(
    () => [
      {
        title: 'Data Analysis',
        description: 'SQL, Python, Pandas, NumPy',
        color: 'from-blue-500 to-blue-600',
        lightColor: 'from-blue-50 to-blue-100',
        borderColor: 'border-blue-300',
        textColor: 'text-blue-700',
      },
      {
        title: 'Machine Learning',
        description: 'Classification, Regression, Ensemble Methods',
        color: 'from-purple-500 to-purple-600',
        lightColor: 'from-purple-50 to-purple-100',
        borderColor: 'border-purple-300',
        textColor: 'text-purple-700',
      },
      {
        title: 'Problem Solving',
        description: 'Statistical Inference, A/B Testing, Optimization',
        color: 'from-orange-500 to-orange-600',
        lightColor: 'from-orange-50 to-orange-100',
        borderColor: 'border-orange-300',
        textColor: 'text-orange-700',
      },
    ],
    [],
  );

  return (
    <Section className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50" sectionId={SectionId.About}>
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Heading with accent */}
        <motion.div
          initial={{opacity: 0, y: -15}}
          transition={{duration: 0.5}}
          viewport={{once: true}}
          whileInView="visible">
          <div className="mb-3 inline-block">
            <div className="h-1.5 w-16 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500" />
          </div>
          <h2 className="mb-1 text-3xl font-bold text-slate-900">About Me</h2>
          <p className="text-sm font-semibold text-blue-600">Data Analyst & Problem Solver</p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2"
          initial="hidden"
          variants={containerVariants}
          viewport={{once: true}}
          whileInView="visible">
          {/* Left Column - Main Content */}
          <div className="space-y-4">
            <motion.p className="text-base leading-relaxed text-slate-700" variants={itemVariants}>
              I'm a <span className="font-bold text-blue-600">data-focused problem solver</span> with a strong
              foundation in statistics, machine learning, and analytics.
            </motion.p>

            <motion.p className="text-base leading-relaxed text-slate-700" variants={itemVariants}>
              I enjoy transforming raw data into clear insights, building reproducible pipelines, and validating models
              with real-world constraints like class imbalance and business KPIs.
            </motion.p>

            <motion.p className="text-base leading-relaxed text-slate-700" variants={itemVariants}>
              My work spans <span className="font-bold text-purple-600">marketing analytics</span>,{' '}
              <span className="font-bold text-orange-600">fraud detection</span>, and{' '}
              <span className="font-bold text-blue-600">financial time-series analysis</span>.
            </motion.p>
          </div>

          {/* Right Column - Highlight Boxes */}
          <div className="space-y-3">
            {highlights.map((item, idx) => (
              <motion.div className="group cursor-pointer" key={idx} variants={highlightVariants} whileHover="hover">
                <div
                  className={`relative overflow-hidden rounded-lg border-2 ${item.borderColor} bg-gradient-to-br ${item.lightColor} p-4 shadow-md transition-all duration-300`}>
                  {/* Animated background gradient on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.h3 className={`font-bold ${item.textColor}`} initial={{x: 0}} whileHover={{x: 4}}>
                      {item.title}
                    </motion.h3>
                    <motion.p
                      className="mt-1 text-sm text-slate-600"
                      initial={{opacity: 0.8}}
                      whileHover={{opacity: 1}}>
                      {item.description}
                    </motion.p>
                  </div>

                  {/* Accent line on hover */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.color}`}
                    initial={{width: 0}}
                    transition={{duration: 0.3}}
                    whileHover={{width: '100%'}}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Accent */}
        <motion.div
          className="mt-8 h-1 w-full bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400"
          initial={{scaleX: 0}}
          transition={{delay: 0.5, duration: 0.8}}
          viewport={{once: true}}
          whileInView={{scaleX: 1}}
        />
      </div>
    </Section>
  );
});

About.displayName = 'About';
export default About;
