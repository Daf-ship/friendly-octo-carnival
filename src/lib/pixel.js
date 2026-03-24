
/**
 * Helper to track a standard event with Meta Pixel.
 * @param {string} eventName The name of the event to track.
 * @param {object} [data={}] Optional data to send with the event.
 * @param {object} [options={}] Optional options, like eventID for deduplication.
 */
export const trackPixelEvent = (eventName, data = {}, options = {}) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, data, options);
  } else {
    console.warn('Meta Pixel (fbq) not found. Make sure the script is loaded.');
  }
};
