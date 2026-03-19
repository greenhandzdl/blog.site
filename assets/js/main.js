// MoeBlog Theme Toggle Script
(function() {
  'use strict';

  // Theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Get saved theme or use system preference
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return prefersDarkScheme.matches ? 'dark' : 'light';
  }

  // Apply theme
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update toggle button appearance
    if (themeToggle) {
      if (theme === 'dark') {
        themeToggle.classList.add('dark');
      } else {
        themeToggle.classList.remove('dark');
      }
    }
  }

  // Toggle theme
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }

  // Initialize theme on page load
  function initTheme() {
    const theme = getPreferredTheme();
    applyTheme(theme);
  }

  // Add event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
    themeToggle.setAttribute('role', 'button');
    themeToggle.setAttribute('tabindex', '0');

    // Keyboard accessibility
    themeToggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

  // Listen for system theme changes
  prefersDarkScheme.addEventListener('change', function(e) {
    // Only apply if user hasn't set a preference
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  // Smooth page transitions (optional enhancement)
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href && link.href.startsWith(window.location.origin)) {
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.2s ease';
    }
  });

  // Restore opacity on page show
  window.addEventListener('pageshow', function() {
    document.body.style.opacity = '1';
  });

})();