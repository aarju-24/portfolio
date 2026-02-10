import {ArrowDownTrayIcon} from '@heroicons/react/24/outline';

import GithubIcon from '../components/Icon/GithubIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import heroImage from '../images/header-background.webp';
import profilepic from '../images/portfolio/2023BMS006.jpeg';
import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  Social,
  TestimonialSection,
  TimelineItem,
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Arzoo | Data Analyst Portfolio',
  description: 'Data analyst skilled in SQL, Python, analytics, and machine learning.',
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'resume',
  Skills: 'skills',
  Stats: 'stats',
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  imageSrc: heroImage,
  name: `Hi, I’m Arzoo.`,
  description: (
    <>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I’m a <strong className="text-stone-100">Data Analyst</strong> with strong experience in SQL, Python, data
        analysis, and machine learning.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I enjoy turning raw data into actionable insights using analytics, visualization, and statistical methods.
      </p>
    </>
  ),
  actions: [
    {

        href: '/assets/resume.pdf',
        text: 'View Resume',
        primary: true,
        Icon: ArrowDownTrayIcon,

      }
,
    {
      href: `#${SectionId.Contact}`,
      text: 'Contact',
      primary: false,
    },
  ],
};

/**
 * About section
 */
export const aboutData: About = {
  profileImageSrc: profilepic,
  description: `I am a data analyst with a strong foundation in SQL, Python, statistics, and machine learning.
I enjoy exploring data, building analytical models, and presenting insights through clear visualizations.
I am particularly interested in data-driven decision making and real-world business problem solving.`,
  aboutItems: [
    {label: 'Role', text: 'Data Analyst'},
    {label: 'Primary Skills', text: 'SQL, Python, Machine Learning'},
    {label: 'Tools', text: 'Power BI, Excel, Pandas, NumPy'},
    {label: 'Interests', text: 'Data Analysis, Analytics, Problem Solving'},
  ],
};

/**
 * Skills section
 */
export const skills = [
  {
    name: 'Data & SQL',
    skills: [
      {name: 'MySQL', level: 1},
      {name: 'JOINs', level: 1},
      {name: 'CTEs', level: 1},
      {name: 'Window Functions', level: 1},
      {name: 'Subqueries', level: 1},
    ],
  },
  {
    name: 'Python & Analytics',
    skills: [
      {name: 'Python', level: 1},
      {name: 'Pandas', level: 1},
      {name: 'NumPy', level: 1},
      {name: 'EDA', level: 1},
      {name: 'A/B Testing', level: 1},
      {name: 'Statistical Inference', level: 1},
    ],
  },
  {
    name: 'Machine Learning',
    skills: [
      {name: 'Logistic Regression', level: 1},
      {name: 'Random Forest', level: 1},
      {name: 'XGBoost', level: 1},
      {name: 'Class Imbalance Handling', level: 1},
      {name: 'Threshold Tuning', level: 1},
    ],
  },
  {
    name: 'Visualization',
    skills: [
      {name: 'Matplotlib', level: 1},
      {name: 'Power BI (Basic)', level: 1},
      {name: 'Excel (Pivot Tables)', level: 1},
    ],
  },
  {
    name: 'Tools & Workflow',
    skills: [
      {name: 'Git', level: 1},
      {name: 'Jupyter Notebook', level: 1},
      {name: 'VS Code', level: 1},
    ],
  },
];

/**
 * Portfolio section
 */
export const portfolioItems = [
  {
    title: 'Marketing Campaign Performance Analysis & Budget Optimization',
    subtitle: 'Marketing Analytics & Budget Optimization',
    description: [
      'Analyzed 500+ marketing campaigns using SQL joins and aggregations to compute ROI, CPA, ROAS, and CTR',
      'Built a Python-based budget reallocation model improving projected ROI by 18–22% without increasing spend',
    ],
    category: 'Data Analytics',
    tech: ['Python', 'Pandas', 'SQL'],
  },
  {
    title: 'Credit Card Fraud Detection with Class Imbalance Handling',
    subtitle: 'Fraud Detection & Machine Learning',
    description: [
      'Built models on 284K transactions using Logistic Regression, Random Forest, and XGBoost',
      'Applied SMOTE and threshold tuning to achieve 92% recall at 88% precision while keeping false positives under 5%',
    ],
    category: 'Machine Learning',
    tech: ['Python', 'Scikit-learn', 'XGBoost'],
  },
  {
    title: 'Stock Direction Forecasting with Sector-Specific Evaluation',
    subtitle: 'Time Series & Predictive Modeling',
    description: [
      'Processed 10 years of NSE stock data using SQL and Python',
      'Trained CNN models on MACD-based features achieving up to 82% directional accuracy for banking stocks',
    ],
    category: 'Machine Learning',
    tech: ['Python', 'PyTorch', 'SQL'],
  },
  {
    title: 'Download Sorter',
    subtitle: 'Automation Tool',
    description: [
      'Built a Python automation tool to organize downloaded files by type and extension',
      'Improved file management efficiency and reduced manual sorting effort',
    ],
    category: 'Automation',
    tech: ['Python'],
    githubUrl: '#',
  },
];

/**
 * Resume section
 */
export const education: TimelineItem[] = [
  {
    date: '2023-2027',
    location: 'Atal Bihari Vajpayee Indian Institute of Information Technology and Management, Gwalior',
    title: 'B.Tech in Mathematics and Scientific Computing',
    content: (
      <p>
        Studied statistics, mathematics, and data analysis with a focus on SQL, Python, and machine learning
        fundamentals.
      </p>
    ),
  },
  {
    date: '2021-2022',
    location: 'Moga Devi Minda Memorial School, Hisar',
    title: '12th Grade (Senior Secondary)',
    content: <p>Science stream with focus on Mathematics, Physics, and Chemistry.</p>,
  },
  {
    date: '2019-2020',
    location: 'Moga Devi Minda Memorial School, Hisar',
    title: '10th Grade (Secondary)',
    content: <p>Completed secondary education with strong foundation in core subjects.</p>,
  },
];

// ✅ CLEANED
export const experience: TimelineItem[] = [];

/**
 * Testimonials (kept empty)
 */
export const testimonial: TestimonialSection = {
  testimonials: [],
};

/**
 * Contact section
 */
export const contact: ContactSection = {
  headerText: 'Get in touch',
  description: 'Open to data analyst roles, internships, and analytics-driven projects.',
  items: [
    {
      type: ContactType.Email,
      text: 'arzoogill737@gmail.com',
      href: 'mailto:arzoogill737@gmail.com',
    },
  ],
};

/**
 * Social links
 */
export const socialLinks: Social[] = [
  {label: 'GitHub', Icon: GithubIcon, href: 'https://github.com/yourusername'},
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://linkedin.com/in/yourprofile'},
];
