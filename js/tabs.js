document.addEventListener('DOMContentLoaded', function() {
  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and hide all contents
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      
      tabContents.forEach(content => {
        content.classList.remove('active');
        content.hidden = true;
      });
      
      // Add active class to clicked button and show corresponding content
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      const activeTab = document.getElementById(`${tabId}-content`);
      if (activeTab) {
        activeTab.classList.add('active');
        activeTab.hidden = false;
      }
      
      // Trigger reveal animation for the active tab
      const revealElements = activeTab.querySelectorAll('.reveal');
      revealElements.forEach(element => {
        element.classList.remove('reveal');
        // Force reflow to restart animation
        void element.offsetWidth;
        element.classList.add('reveal');
      });
    });
  });

  // Initialize first tab as active
  if (tabButtons.length > 0) {
    tabButtons[0].click();
  }
});
