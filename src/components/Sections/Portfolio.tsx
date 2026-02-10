import {FC, memo} from 'react';
import {motion} from 'framer-motion';

import Section from '../Layout/Section';
import {portfolioItems, SectionId} from '../../data/data';
import {ProjectCard} from './ProjectCard';

const Portfolio: FC = memo(() => {
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

  const titleVariants = {
    hidden: {opacity: 0, y: -20},
    visible: {
      opacity: 1,
      y: 0,
      transition: {duration: 0.6, ease: 'easeOut'},
    },
  };

  return (
    <Section className="bg-gradient-to-br from-slate-50 via-white to-slate-50" sectionId={SectionId.Portfolio}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div initial="hidden" variants={titleVariants} viewport={{once: true}} whileInView="visible">
          <div className="mb-3 inline-block">
            <div className="h-1.5 w-16 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500" />
          </div>
          <h2 className="mb-2 text-4xl font-bold text-slate-900">Projects</h2>
          <p className="text-sm font-medium text-blue-600">Featured work and case studies</p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="mt-12 space-y-6"
          initial="hidden"
          variants={containerVariants}
          viewport={{once: true}}
          whileInView="visible">
          {portfolioItems.map((project, index) => (
            <ProjectCard
              category={project.category}
              description={project.description}
              githubUrl={project.githubUrl}
              index={index}
              key={`${project.title}-${index}`}
              subtitle={project.subtitle}
              tech={project.tech}
              title={project.title}
            />
          ))}
        </motion.div>

        {/* Bottom Accent */}
        <motion.div
          className="mt-12 h-1 w-full bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400"
          initial={{scaleX: 0}}
          transition={{delay: 0.8, duration: 0.8}}
          viewport={{once: true}}
          whileInView={{scaleX: 1}}
        />
      </div>
    </Section>
  );
});

export default Portfolio;
