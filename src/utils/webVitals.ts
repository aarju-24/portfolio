/**
 * Web Vitals Performance Monitoring
 * Tracks Core Web Vitals metrics: LCP, INP, CLS
 * Logs metrics to analytics
 * Requirements: 8.4, 12.1
 */

import {type Metric,onCLS, onFCP, onINP, onLCP, onTTFB} from 'web-vitals';

/**
 * Performance metrics result
 */
export interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  inp?: number; // Interaction to Next Paint (replaces FID)
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
}

/**
 * Callback function for metrics
 */
export type MetricsCallback = (metrics: PerformanceMetrics) => void;

/**
 * Stores collected metrics
 */
const collectedMetrics: PerformanceMetrics = {};

/**
 * Callbacks to execute when metrics are collected
 */
const metricsCallbacks: MetricsCallback[] = [];

/**
 * Handles metric collection
 * @param metric - Web Vitals metric
 */
const handleMetric = (metric: Metric): void => {
  // Store metric value
  if (metric.name === 'LCP') {
    collectedMetrics.lcp = metric.value;
  } else if (metric.name === 'INP') {
    collectedMetrics.inp = metric.value;
  } else if (metric.name === 'CLS') {
    collectedMetrics.cls = metric.value;
  } else if (metric.name === 'FCP') {
    collectedMetrics.fcp = metric.value;
  } else if (metric.name === 'TTFB') {
    collectedMetrics.ttfb = metric.value;
  }

  // Log metric to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)}ms`);
  }

  // Execute callbacks
  metricsCallbacks.forEach(callback => {
    callback(collectedMetrics);
  });

  // Send to analytics (if available)
  if (typeof window !== 'undefined') {
    const windowWithGtag = window as Window & {
      gtag?: (event: string, name: string, data: Record<string, unknown>) => void;
    };
    if (windowWithGtag.gtag) {
      windowWithGtag.gtag('event', metric.name, {
        value: Math.round(metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
};

/**
 * Initializes Web Vitals monitoring
 * Collects LCP, INP, CLS, FCP, TTFB metrics
 *
 * @example
 * ```tsx
 * // In _app.tsx
 * useEffect(() => {
 *   initializeWebVitals();
 * }, []);
 * ```
 */
export const initializeWebVitals = (): void => {
  if (typeof window === 'undefined') return;

  // Collect all metrics
  onCLS(handleMetric);
  onINP(handleMetric);
  onFCP(handleMetric);
  onLCP(handleMetric);
  onTTFB(handleMetric);
};

/**
 * Registers a callback to be called when metrics are collected
 * @param callback - Callback function
 *
 * @example
 * ```tsx
 * onMetricsCollected((metrics) => {
 *   console.log('Metrics:', metrics);
 * });
 * ```
 */
export const onMetricsCollected = (callback: MetricsCallback): void => {
  metricsCallbacks.push(callback);
};

/**
 * Gets collected metrics
 * @returns Collected metrics
 *
 * @example
 * ```tsx
 * const metrics = getCollectedMetrics();
 * console.log('LCP:', metrics.lcp);
 * ```
 */
export const getCollectedMetrics = (): PerformanceMetrics => {
  return {...collectedMetrics};
};

/**
 * Checks if metrics meet Core Web Vitals targets
 * - LCP < 2.5s
 * - INP < 200ms
 * - CLS < 0.1
 *
 * @returns Whether all metrics meet targets
 *
 * @example
 * ```tsx
 * if (meetsWebVitalsTargets()) {
 *   console.log('All metrics meet targets!');
 * }
 * ```
 */
export const meetsWebVitalsTargets = (): boolean => {
  const LCP_TARGET = 2500; // 2.5s
  const INP_TARGET = 200; // 200ms
  const CLS_TARGET = 0.1; // 0.1

  const meetsLCP = !collectedMetrics.lcp || collectedMetrics.lcp <= LCP_TARGET;
  const meetsINP = !collectedMetrics.inp || collectedMetrics.inp <= INP_TARGET;
  const meetsCLS = !collectedMetrics.cls || collectedMetrics.cls <= CLS_TARGET;

  return meetsLCP && meetsINP && meetsCLS;
};

/**
 * Gets Web Vitals status report
 * @returns Status report with metrics and targets
 *
 * @example
 * ```tsx
 * const report = getWebVitalsReport();
 * console.log(report);
 * ```
 */
export const getWebVitalsReport = (): {
  metrics: PerformanceMetrics;
  targets: {lcp: number; inp: number; cls: number};
  status: {lcp: string; inp: string; cls: string};
  meetsTargets: boolean;
} => {
  const LCP_TARGET = 2500;
  const INP_TARGET = 200;
  const CLS_TARGET = 0.1;

  const getLCPStatus = (): string => {
    if (!collectedMetrics.lcp) return 'Not collected';
    if (collectedMetrics.lcp <= LCP_TARGET) return 'Good';
    if (collectedMetrics.lcp <= LCP_TARGET * 1.25) return 'Needs improvement';
    return 'Poor';
  };

  const getINPStatus = (): string => {
    if (!collectedMetrics.inp) return 'Not collected';
    if (collectedMetrics.inp <= INP_TARGET) return 'Good';
    if (collectedMetrics.inp <= INP_TARGET * 1.5) return 'Needs improvement';
    return 'Poor';
  };

  const getCLSStatus = (): string => {
    if (!collectedMetrics.cls) return 'Not collected';
    if (collectedMetrics.cls <= CLS_TARGET) return 'Good';
    if (collectedMetrics.cls <= CLS_TARGET * 1.25) return 'Needs improvement';
    return 'Poor';
  };

  return {
    metrics: {...collectedMetrics},
    targets: {
      lcp: LCP_TARGET,
      inp: INP_TARGET,
      cls: CLS_TARGET,
    },
    status: {
      lcp: getLCPStatus(),
      inp: getINPStatus(),
      cls: getCLSStatus(),
    },
    meetsTargets: meetsWebVitalsTargets(),
  };
};

/**
 * Logs Web Vitals report to console
 *
 * @example
 * ```tsx
 * logWebVitalsReport();
 * ```
 */
export const logWebVitalsReport = (): void => {
  const report = getWebVitalsReport();

  console.group('Web Vitals Report');
  console.log('Metrics:', report.metrics);
  console.log('Targets:', report.targets);
  console.log('Status:', report.status);
  console.log('Meets Targets:', report.meetsTargets);
  console.groupEnd();
};

export default initializeWebVitals;
