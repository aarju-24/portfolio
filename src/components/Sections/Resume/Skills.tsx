import {FC, memo, useMemo} from 'react';

import {TechPill} from '../../TechPill';

interface SkillsDisplayProps {
  skills: string[];
}

/**
 * Skills Display Component
 * Shows skills as styled tech pills with staggered animation
 */
export const SkillsDisplay: FC<SkillsDisplayProps> = memo(({skills}) => {
  const skillsWithDelay = useMemo(
    () =>
      skills.map((skill, idx) => ({
        delay: `${idx * 0.03}s`,
        skill,
        style: {animationDelay: `${idx * 0.03}s`},
      })),
    [skills],
  );

  return (
    <div className="flex flex-wrap gap-3">
      {skillsWithDelay.map(({skill, style}) => (
        <TechPill className="fade-in-stagger" key={skill} name={skill} style={style} />
      ))}
    </div>
  );
});

SkillsDisplay.displayName = 'SkillsDisplay';
