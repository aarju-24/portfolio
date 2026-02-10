import {FC, memo, useMemo} from 'react';

import ResumeSection from './ResumeSection';
import TimelineItem from './TimelineItem';
import {EducationCard} from './EducationCard';
import {SkillsDisplay} from './Skills';
import Section from '../../Layout/Section';
import {education, experience, SectionId, skills} from '../../../data/data';

const Resume: FC = memo(() => {
  // Flatten all skills into a single array
  const allSkills = useMemo(() => skills.flatMap(group => group.skills.map(skill => skill.name)), []);

  return (
    <Section className="bg-neutral-100" sectionId={SectionId.Resume}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col divide-y-2 divide-neutral-300">
          {/* EDUCATION */}
          <ResumeSection title="Education">
            <div className="space-y-4">
              {education.map((item, index) => (
                <EducationCard index={index} item={item} key={`${item.title}-${index}`} />
              ))}
            </div>
          </ResumeSection>

          {/* WORK EXPERIENCE — ✅ ONLY RENDER IF DATA EXISTS */}
          {experience.length > 0 && (
            <ResumeSection title="Work">
              {experience.map((item, index) => (
                <TimelineItem item={item} key={`${item.title}-${index}`} />
              ))}
            </ResumeSection>
          )}

          {/* SKILLS */}
          <ResumeSection title="Skills">
            <SkillsDisplay skills={allSkills} />
          </ResumeSection>
        </div>
      </div>
    </Section>
  );
});

Resume.displayName = 'Resume';
export default Resume;
