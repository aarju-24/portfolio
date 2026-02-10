import Image from 'next/image';
import {FC, memo} from 'react';
import {motion} from 'framer-motion';

import GithubIcon from '../Icon/GithubIcon';
import LinkedInIcon from '../Icon/LinkedInIcon';
import profilePic from '../../images/portfolio/2023BMS006.jpeg';

const Hero: FC = memo(() => {
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

  const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" id="hero">
      <div className="pointer-events-none absolute top-0 left-1/2 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-500/70 to-transparent" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-500/15 blur-3xl" />
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-40 -right-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <motion.div
          className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 rounded-b-3xl bg-gradient-to-b from-transparent to-slate-800/30 backdrop-blur-sm p-8 md:p-12"
          initial="hidden"
          variants={containerVariants}
          viewport={{once: true}}
          whileInView="visible">

          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <motion.p className="text-xs tracking-widest uppercase text-white/50" variants={itemVariants}>
              Data Analyst
            </motion.p>

            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Arzoo
                </span>
              </h1>
              <p className="mt-3 text-xl text-slate-300 font-medium">
                I build reliable data solutions with a focus on real-world usability.
              </p>
            </motion.div>

            <motion.p className="text-base leading-relaxed text-slate-400" variants={itemVariants}>
              I enjoy building real-world data analytics applications, from clean user interfaces to backend systems
              that support them. Lately, I've been working mostly with{' '}
              <span className="inline-block rounded-full bg-blue-500/20 px-2 py-1 text-sm text-blue-300 border border-blue-500/30">
                SQL
              </span>
              ,{' '}
              <span className="inline-block rounded-full bg-purple-500/20 px-2 py-1 text-sm text-purple-300 border border-purple-500/30">
                Python
              </span>
              ,{' '}
              <span className="inline-block rounded-full bg-green-500/20 px-2 py-1 text-sm text-green-300 border border-green-500/30">
                Machine Learning
              </span>
              , focusing on readable code, performance, and real-world features.
            </motion.p>

            {/* BUTTONS */}
            <motion.div className="flex flex-wrap gap-4 pt-4" variants={itemVariants}>
              <motion.a
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
                href="#contact"
                whileHover={{scale: 1.05, y: -2}}
                whileTap={{scale: 0.95}}>
                Get in touch
              </motion.a>

              {/* ✅ FIXED RESUME BUTTON */}
              <motion.a
                className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:border-slate-400 hover:bg-slate-800/50"
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{scale: 1.05, y: -2}}
                whileTap={{scale: 0.95}}>
                Resume / CV
              </motion.a>
            </motion.div>

            {/* SOCIAL ICONS */}
            <motion.div className="flex items-center gap-6 pt-4" variants={itemVariants}>
              {[
                {label: 'GitHub', href: '#', icon: GithubIcon},
                {label: 'LinkedIn', href: '#', icon: LinkedInIcon},
              ].map(social => {
                const Icon = social.icon;
                return (
                  <motion.a
                    className="group relative text-slate-400 transition-all duration-200 hover:text-white hover:-translate-y-0.5"
                    href={social.href}
                    key={social.label}
                    target="_blank"
                    whileHover={{scale: 1.1}}>
                    <span className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md border border-slate-700 bg-slate-900/80 backdrop-blur px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:opacity-100">
                      {social.label}
                    </span>
                    <Icon className="h-6 w-6" />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="flex justify-center"
            initial={{opacity: 0, scale: 0.9}}
            transition={{duration: 0.6, delay: 0.2}}
            whileInView={{opacity: 1, scale: 1}}>

            <motion.div
              animate={{scale: [1, 1.1, 1]}}
              className="absolute h-96 w-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
              transition={{duration: 4, repeat: Infinity}}
            />

            <motion.div
              className="group relative overflow-hidden rounded-2xl border-2 border-slate-700 bg-slate-800/50 backdrop-blur shadow-2xl"
              transition={{duration: 0.3}}
              whileHover={{scale: 1.05, borderColor: '#a78bfa'}}>

              <Image
                alt="Arzoo profile"
                className="h-80 w-80 object-cover transition-all duration-300 group-hover:blur-0 blur-sm"
                height={320}
                priority
                src={profilePic}
                width={320}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
