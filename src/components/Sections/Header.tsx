import {Dialog, Transition} from '@headlessui/react';
import {Bars3BottomRightIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Link from 'next/link';
import {FC, Fragment, memo, useCallback, useMemo, useState} from 'react';

import {SectionId} from '../../data/data';
import {useNavObserver} from '../../hooks/useNavObserver';

export const headerID = 'headerNav';

// eslint-disable-next-line react-memo/require-memo
const Header: FC = memo(() => {
  const [currentSection, setCurrentSection] = useState<SectionId | null>(null);

  // ❌ Testimonials REMOVED
  const navSections = useMemo(() => [SectionId.About, SectionId.Resume, SectionId.Portfolio, SectionId.Contact], []);

  const intersectionHandler = useCallback((section: SectionId | null) => {
    section && setCurrentSection(section);
  }, []);

  useNavObserver(navSections.map(section => `#${section}`).join(','), intersectionHandler);

  return (
    <>
      <MobileNav currentSection={currentSection} navSections={navSections} />
      <DesktopNav currentSection={currentSection} navSections={navSections} />
    </>
  );
});

const DesktopNav: FC<{
  navSections: SectionId[];
  currentSection: SectionId | null;
}> = memo(({navSections, currentSection}) => {
  const baseClass =
    '-m-1.5 p-1.5 rounded-md font-bold first-letter:uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white';

  const activeClass = classNames(baseClass, 'text-white');
  const inactiveClass = classNames(baseClass, 'text-white hover:text-white/80');

  return (
    <header
      className="fixed top-0 z-50 hidden w-full bg-transparent text-white p-4 sm:block backdrop-blur-sm"
      id={headerID}>
      <nav className="flex justify-center gap-x-8">
        {navSections.map(section => (
          <NavItem
            activeClass={activeClass}
            current={section === currentSection}
            inactiveClass={inactiveClass}
            key={section}
            section={section}
          />
        ))}
      </nav>
    </header>
  );
});

const MobileNav: FC<{
  navSections: SectionId[];
  currentSection: SectionId | null;
}> = memo(({navSections, currentSection}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const baseClass = 'p-2 rounded-md first-letter:uppercase transition-colors duration-300 focus:outline-none';

  const activeClass = classNames(baseClass, 'bg-primary text-white font-bold');
  const inactiveClass = classNames(baseClass, 'text-white hover:text-white/80 font-medium');

  return (
    <>
      <button
        aria-label="Menu Button"
        className="fixed right-2 top-2 z-40 rounded-md bg-transparent border border-white/30 p-2 hover:bg-white/10 sm:hidden"
        onClick={toggleOpen}>
        <Bars3BottomRightIcon className="h-8 w-8 text-white" />
      </button>

      <Transition.Root as={Fragment} show={isOpen}>
        <Dialog as="div" className="fixed inset-0 z-40 flex sm:hidden" onClose={toggleOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-black/70" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition transform duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition transform duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full">
            <div className="relative w-4/5 bg-slate-900/95 backdrop-blur-md border-r border-white/10">
              <nav className="mt-6 flex flex-col gap-y-2 px-4">
                {navSections.map(section => (
                  <NavItem
                    activeClass={activeClass}
                    current={section === currentSection}
                    inactiveClass={inactiveClass}
                    key={section}
                    onClick={toggleOpen}
                    section={section}
                  />
                ))}
              </nav>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
});

const NavItem: FC<{
  section: string;
  current: boolean;
  activeClass: string;
  inactiveClass: string;
  onClick?: () => void;
}> = memo(({section, current, activeClass, inactiveClass, onClick}) => {
  return (
    <Link className={classNames(current ? activeClass : inactiveClass)} href={`/#${section}`} onClick={onClick}>
      {section}
    </Link>
  );
});

Header.displayName = 'Header';
export default Header;
