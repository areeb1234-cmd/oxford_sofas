document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
  }

  // Use event delegation for theme toggle since it's injected dynamically
  document.body.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'theme-toggle') {
      let theme = document.body.getAttribute('data-theme');
      if (theme === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        e.target.classList.replace('fa-sun', 'fa-moon');
      } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        e.target.classList.replace('fa-moon', 'fa-sun');
      }
    }
  });

  // Set initial icon state after components are rendered
  setTimeout(() => {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle && currentTheme === 'dark') {
      themeToggle.classList.replace('fa-moon', 'fa-sun');
    }
  }, 100);
});
