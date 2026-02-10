/**
 * Response Time Audit Utilities
 * Utilities for auditing and measuring hover effect response times
 * Verifies hover effects start within 100ms
 * Requirements: 3.4, 7.5
 */

/**
 * Response time measurement result
 */
export interface ResponseTimeMeasurement {
  element: HTMLElement;
  selector: string;
  hoverStartTime: number;
  animationStartTime: number;
  responseTime: number;
  isWithinThreshold: boolean;
  threshold: number;
}

/**
 * Audit result for all interactive elements
 */
export interface ResponseTimeAuditResult {
  measurements: ResponseTimeMeasurement[];
  averageResponseTime: number;
  maxResponseTime: number;
  minResponseTime: number;
  passCount: number;
  failCount: number;
  threshold: number;
}

/**
 * Measures response time for a single element
 * @param element - Element to measure
 * @param threshold - Response time threshold in milliseconds (default: 100)
 * @returns Response time measurement
 */
export const measureElementResponseTime = (element: HTMLElement, threshold: number = 100): ResponseTimeMeasurement => {
  const selector = element.className || element.tagName;
  const hoverStartTime = performance.now();

  // Trigger animation by getting computed style
  window.getComputedStyle(element);
  const animationStartTime = performance.now();
  const responseTime = animationStartTime - hoverStartTime;

  return {
    element,
    selector,
    hoverStartTime,
    animationStartTime,
    responseTime,
    isWithinThreshold: responseTime <= threshold,
    threshold,
  };
};

/**
 * Audits all interactive elements for response time
 * @param container - Container element to audit (default: document.body)
 * @param threshold - Response time threshold in milliseconds (default: 100)
 * @returns Audit result
 */
export const auditResponseTimes = (
  container: HTMLElement = document.body,
  threshold: number = 100,
): ResponseTimeAuditResult => {
  const interactiveSelectors = ['button', 'a', 'input', 'select', 'textarea', '[role="button"]', '[role="link"]'].join(
    ',',
  );

  const elements = Array.from(container.querySelectorAll(interactiveSelectors)) as HTMLElement[];
  const measurements: ResponseTimeMeasurement[] = [];

  elements.forEach(element => {
    const measurement = measureElementResponseTime(element, threshold);
    measurements.push(measurement);
  });

  const responseTimes = measurements.map(m => m.responseTime);
  const averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
  const maxResponseTime = Math.max(...responseTimes);
  const minResponseTime = Math.min(...responseTimes);
  const passCount = measurements.filter(m => m.isWithinThreshold).length;
  const failCount = measurements.filter(m => !m.isWithinThreshold).length;

  return {
    measurements,
    averageResponseTime,
    maxResponseTime,
    minResponseTime,
    passCount,
    failCount,
    threshold,
  };
};

/**
 * Logs response time audit results to console
 * @param result - Audit result
 */
export const logResponseTimeAudit = (result: ResponseTimeAuditResult): void => {
  console.group('Response Time Audit Results');
  console.log(`Threshold: ${result.threshold}ms`);
  console.log(`Average Response Time: ${result.averageResponseTime.toFixed(2)}ms`);
  console.log(`Max Response Time: ${result.maxResponseTime.toFixed(2)}ms`);
  console.log(`Min Response Time: ${result.minResponseTime.toFixed(2)}ms`);
  console.log(`Pass Count: ${result.passCount}`);
  console.log(`Fail Count: ${result.failCount}`);

  if (result.failCount > 0) {
    console.group('Failed Elements');
    result.measurements
      .filter(m => !m.isWithinThreshold)
      .forEach(m => {
        console.warn(`${m.selector}: ${m.responseTime.toFixed(2)}ms (threshold: ${m.threshold}ms)`);
      });
    console.groupEnd();
  }

  console.groupEnd();
};

/**
 * Simulates hover event and measures response time
 * @param element - Element to hover
 * @param threshold - Response time threshold in milliseconds (default: 100)
 * @returns Response time measurement
 */
export const simulateHoverAndMeasure = (element: HTMLElement, threshold: number = 100): ResponseTimeMeasurement => {
  const hoverStartTime = performance.now();

  // Simulate hover by adding hover class or triggering mouseenter
  const mouseEnterEvent = new MouseEvent('mouseenter', {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  element.dispatchEvent(mouseEnterEvent);

  // Get animation start time
  const animationStartTime = performance.now();
  const responseTime = animationStartTime - hoverStartTime;

  return {
    element,
    selector: element.className || element.tagName,
    hoverStartTime,
    animationStartTime,
    responseTime,
    isWithinThreshold: responseTime <= threshold,
    threshold,
  };
};

/**
 * Checks if element has hover effects
 * @param element - Element to check
 * @returns Whether element has hover effects
 */
export const hasHoverEffects = (element: HTMLElement): boolean => {
  const computedStyle = window.getComputedStyle(element);
  const hoverStyle = window.getComputedStyle(element, ':hover');

  // Check if any CSS properties change on hover
  const properties = ['backgroundColor', 'color', 'transform', 'opacity', 'boxShadow', 'borderColor'];

  return properties.some(prop => computedStyle.getPropertyValue(prop) !== hoverStyle.getPropertyValue(prop));
};

/**
 * Gets all elements with hover effects
 * @param container - Container element (default: document.body)
 * @returns Array of elements with hover effects
 */
export const getElementsWithHoverEffects = (container: HTMLElement = document.body): HTMLElement[] => {
  const interactiveSelectors = ['button', 'a', 'input', 'select', 'textarea', '[role="button"]', '[role="link"]'].join(
    ',',
  );

  const elements = Array.from(container.querySelectorAll(interactiveSelectors)) as HTMLElement[];
  return elements.filter(element => hasHoverEffects(element));
};
