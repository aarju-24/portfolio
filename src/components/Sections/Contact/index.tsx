import {DevicePhoneMobileIcon, EnvelopeIcon, MapPinIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {FC, memo} from 'react';

import {contact, SectionId} from '../../../data/data';
import {ContactType, ContactValue} from '../../../data/dataDef';
import FacebookIcon from '../../Icon/FacebookIcon';
import GithubIcon from '../../Icon/GithubIcon';
import InstagramIcon from '../../Icon/InstagramIcon';
import LinkedInIcon from '../../Icon/LinkedInIcon';
import TwitterIcon from '../../Icon/TwitterIcon';
import Section from '../../Layout/Section';
import ContactForm from './ContactForm';

const ContactValueMap: Record<ContactType, ContactValue> = {
  [ContactType.Email]: {Icon: EnvelopeIcon, srLabel: 'Email'},
  [ContactType.Phone]: {Icon: DevicePhoneMobileIcon, srLabel: 'Phone'},
  [ContactType.Location]: {Icon: MapPinIcon, srLabel: 'Location'},
  [ContactType.Github]: {Icon: GithubIcon, srLabel: 'Github'},
  [ContactType.LinkedIn]: {Icon: LinkedInIcon, srLabel: 'LinkedIn'},
  [ContactType.Facebook]: {Icon: FacebookIcon, srLabel: 'Facebook'},
  [ContactType.Twitter]: {Icon: TwitterIcon, srLabel: 'Twitter'},
  [ContactType.Instagram]: {Icon: InstagramIcon, srLabel: 'Instagram'},
};

const Contact: FC = memo(() => {
  const {headerText, description, items} = contact;

  return (
    <Section className="bg-primary text-white py-24" sectionId={SectionId.Contact}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-y-6">
          {/* Header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <EnvelopeIcon className="hidden h-16 w-16 text-white md:block" />
            <h2 className="text-2xl font-bold text-white">{headerText}</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Contact Form */}
            <div className="order-2 md:order-1">
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="order-1 flex flex-col gap-y-4 md:order-2">
              <p className="leading-6 text-white/80">{description}</p>

              <dl className="flex flex-col space-y-4 text-base sm:space-y-2">
                {items.map(({type, text, href}) => {
                  const {Icon, srLabel} = ContactValueMap[type];

                  return (
                    <div key={srLabel}>
                      <dt className="sr-only">{srLabel}</dt>
                      <dd className="flex items-center">
                        <a
                          className={classNames(
                            '-m-2 flex items-center rounded-md p-2 text-white transition hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white',
                          )}
                          href={href}
                          rel="noopener noreferrer"
                          target="_blank">
                          <Icon aria-hidden="true" className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
                          <span className="ml-3 text-sm sm:text-base">{text}</span>
                        </a>
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
});

Contact.displayName = 'Contact';
export default Contact;
