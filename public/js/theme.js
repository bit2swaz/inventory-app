/**
 * Theme switcher functionality
 */
document.addEventListener('DOMContentLoaded', function() {
  const themeSwitch = document.getElementById('theme-switch');
  const themeIcon = themeSwitch ? themeSwitch.querySelector('.theme-icon') : null;
  
  // Check if dark theme is preferred from saved preference or OS
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('theme');
  
  // Apply theme based on saved preference or OS setting
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-theme');
    updateThemeIcon('🌞');
  }
  
  // Handle theme toggle click
  if (themeSwitch) {
    themeSwitch.addEventListener('click', function() {
      if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('🌙');
      } else {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('🌞');
      }
    });
  }
  
  // Update theme icon based on current theme
  function updateThemeIcon(icon) {
    if (themeIcon) {
      themeIcon.textContent = icon;
    }
  }
  
  // Listen for OS theme changes
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.body.classList.add('dark-theme');
        updateThemeIcon('🌞');
      } else {
        document.body.classList.remove('dark-theme');
        updateThemeIcon('🌙');
      }
    }
  });
}); 