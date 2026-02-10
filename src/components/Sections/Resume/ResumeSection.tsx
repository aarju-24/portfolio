import {FC, memo, PropsWithChildren} from 'react';

interface ResumeSectionProps {
  title: string;
}

const ResumeSection: FC<PropsWithChildren<ResumeSectionProps>> = memo(({title, children}) => {
  return (
    <div className="grid grid-cols-1 gap-y-6 py-12 first:pt-0 last:pb-0 md:grid-cols-4">
      {/* LEFT: SECTION TITLE */}
      <div className="col-span-1 flex justify-center md:justify-start">
        <div className="relative">
          <h2 className="text-xl font-bold uppercase tracking-wide text-primary">{title}</h2>
          <span className="absolute left-0 -bottom-2 h-[2px] w-12 bg-primary" />
        </div>
      </div>

      {/* RIGHT: CONTENT */}
      <div className="col-span-1 flex flex-col gap-6 md:col-span-3">{children}</div>
    </div>
  );
});

ResumeSection.displayName = 'ResumeSection';
export default ResumeSection;
