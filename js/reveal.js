document.addEventListener('DOMContentLoaded', function() {
  // Initialize all sections as visible by default
  const sections = document.querySelectorAll('.section, .reveal');
  
  // Function to check if an element is in the viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to handle scroll events with debounce
  let isScrolling;
  function handleScroll() {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(function() {
      sections.forEach(section => {
        if (isInViewport(section)) {
          section.classList.add('active');
        }
      });
    }, 50);
  }

  // Initialize all sections as visible
  sections.forEach(section => {
    section.style.opacity = '1';
    section.style.visibility = 'visible';
    section.style.transform = 'none';
    
    // Add active class to sections already in viewport on load
    if (isInViewport(section)) {
      section.classList.add('active');
    }
  });

  // Add scroll event listener with debounce
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Initial check in case some sections are already in viewport
  handleScroll();
});
