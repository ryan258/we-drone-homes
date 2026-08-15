// Global Site Interactions & Navigation
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      menuToggle.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
    });
  }

  // Dynamic Data-Fill Bars
  document.querySelectorAll('.bar-fill[data-fill]').forEach(el => {
    if (el.dataset.fill) {
      el.style.width = el.dataset.fill;
    }
  });
});
