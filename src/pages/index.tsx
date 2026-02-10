import dynamic from 'next/dynamic';
import {FC, memo} from 'react';

import {AnimatedBlobs} from '../components/AnimatedBlobs';
import Page from '../components/Layout/Page';
import About from '../components/Sections/About';

import Hero from '../components/Sections/Hero';
import {homePageMeta} from '../data/data';

// Header is dynamically imported (client-side only)
// eslint-disable-next-line react-memo/require-memo
const Header = dynamic(() => import('../components/Sections/Header'), {
  ssr: false,
});

// Portfolio section is dynamically imported for code splitting
// eslint-disable-next-line react-memo/require-memo
const Portfolio = dynamic(() => import('../components/Sections/Portfolio'), {
  ssr: true,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

// Resume section is dynamically imported for code splitting
// eslint-disable-next-line react-memo/require-memo
const Resume = dynamic(() => import('../components/Sections/Resume'), {
  ssr: true,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

// Contact section is dynamically imported for code splitting
// eslint-disable-next-line react-memo/require-memo
const Contact = dynamic(() => import('../components/Sections/Contact'), {
  ssr: true,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});

// eslint-disable-next-line react-memo/require-memo
const Home: FC = memo(() => {
  const {title, description} = homePageMeta;

  return (
    <Page description={description} title={title}>
      {/* Animated blobs background - positioned behind all content */}
      <AnimatedBlobs className="fixed inset-0" opacity={0.4} />

      {/* Main content wrapper with relative positioning to ensure content appears above blobs */}
      <div className="relative z-0">
        <Header />

        {/* HERO */}
        <Hero />


        

        {/* ABOUT */}
        <About />

        {/* RESUME (Education + Experience + Projects summary)
            ⚠️ Certifications intentionally NOT included */}
        <Resume />

        {/* PROJECTS / PORTFOLIO */}
        <Portfolio />

        {/* CONTACT */}
        <Contact />


      </div>
    </Page>
  );
});

export default Home;
