// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeSwitch = document.getElementById('theme-switch');
  const body = document.body;
  
  if (!themeSwitch) return;
  
  // Check for saved theme preference or prefer-color-scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply dark theme if saved or preferred
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-theme');
  }
  
  // Update button text based on current theme
  if (body.classList.contains('dark-theme')) {
    themeSwitch.textContent = 'Switch to Light Mode';
  }
  
  // Toggle theme when button is clicked
  themeSwitch.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    // Save preference to localStorage
    if (body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
      themeSwitch.textContent = 'Switch to Light Mode';
    } else {
      localStorage.setItem('theme', 'light');
      themeSwitch.textContent = 'Switch to Dark Mode';
    }
  });
}); 