document.addEventListener('DOMContentLoaded', function() {
  // Initialize tabs functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  // Function to switch tabs
  function switchTab(tabId) {
    // Hide all tab contents
    tabContents.forEach(content => {
      content.hidden = true;
      content.classList.remove('active');
    });

    // Show the selected tab content
    const activeTab = document.getElementById(`${tabId}-content`);
    if (activeTab) {
      activeTab.hidden = false;
      activeTab.classList.add('active');
    }

    // Update active state of tab buttons
    tabButtons.forEach(button => {
      if (button.getAttribute('data-tab') === tabId) {
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
      } else {
        button.classList.remove('active');
        button.setAttribute('aria-selected', 'false');
      }
    });
  }

  // Add click event listeners to tab buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = button.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Initialize with the first tab active
  if (tabButtons.length > 0) {
    const firstTabId = tabButtons[0].getAttribute('data-tab');
    switchTab(firstTabId);
  }

  // Handle background images for sections
  const sectionsWithBg = document.querySelectorAll('#about, #speakers, #committees');
  sectionsWithBg.forEach(section => {
    // Ensure background image is properly set
    if (!section.style.backgroundImage) {
      section.style.backgroundImage = 'var(--section-bg)';
    }
  });
});
