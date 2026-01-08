/**
 * PLUMEE 2026 - Countdown Timer
 * This script handles the countdown to the event date
 */

// Event date: April 21, 2026 09:00:00 (UTC+1)
const EVENT_DATE = new Date('2026-04-21T09:00:00+01:00').getTime();

// DOM Elements
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

/**
 * Format number with leading zeros
 * @param {number} num - The number to format
 * @param {number} length - The desired length of the output string
 * @returns {string} Formatted number with leading zeros
 */
function formatNumber(num, length = 2) {
  return String(num).padStart(length, '0');
}

/**
 * Update the countdown timer
 */
function updateCountdown() {
  const now = new Date().getTime();
  const distance = EVENT_DATE - now;

  // Calculate time units
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update the DOM
  if (daysEl) daysEl.textContent = formatNumber(days, 3);
  if (hoursEl) hoursEl.textContent = formatNumber(hours);
  if (minutesEl) minutesEl.textContent = formatNumber(minutes);
  if (secondsEl) secondsEl.textContent = formatNumber(seconds);

  // If the countdown is over
  if (distance < 0) {
    clearInterval(countdownTimer);
    if (daysEl) daysEl.textContent = '000';
    if (hoursEl) hoursEl.textContent = '00';
    if (minutesEl) minutesEl.textContent = '00';
    if (secondsEl) secondsEl.textContent = '00';
  }
}

// Initialize countdown
let countdownTimer;

/**
 * Initialize the countdown timer
 */
function initCountdown() {
  // Initial update
  updateCountdown();
  
  // Update every second
  countdownTimer = setInterval(updateCountdown, 1000);
  
  // Cleanup on page unload
  window.addEventListener('unload', () => {
    clearInterval(countdownTimer);
  });
}

// Export for use in other scripts
window.initCountdown = initCountdown;

// Auto-initialize if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCountdown);
} else {
  initCountdown();
}
