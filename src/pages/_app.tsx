import 'tailwindcss/tailwind.css';
import '../globalStyles.scss';

import type {AppProps} from 'next/app';
import {memo, useEffect} from 'react';

import {initializeWebVitals} from '../utils/webVitals';

const MyApp = memo(({Component, pageProps}: AppProps): JSX.Element => {
  // Initialize Web Vitals monitoring on mount
  useEffect(() => {
    initializeWebVitals();
  }, []);

  return <Component {...pageProps} />;
});

export default MyApp;
