/**
 * Main application JavaScript
 */
document.addEventListener('DOMContentLoaded', function() {
  // Add animation classes to elements when they enter the viewport
  const cards = document.querySelectorAll('.category-card, .item-card');
  
  // Apply fade-in animations to cards
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('fade-in');
    }, index * 100); // Stagger the animations
  });
  
  // Add slide-in animation to forms
  const forms = document.querySelectorAll('.form-container, .auth-form');
  forms.forEach(form => {
    form.classList.add('slide-in');
  });
  
  // Make alerts dismissible
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.className = 'alert-close';
    closeBtn.style.cssText = `
      float: right;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      margin-top: -5px;
    `;
    
    // Add click event to close button
    closeBtn.addEventListener('click', () => {
      alert.style.opacity = '0';
      setTimeout(() => {
        alert.style.display = 'none';
      }, 300);
    });
    
    // Prepend close button to alert
    alert.prepend(closeBtn);
  });
}); 