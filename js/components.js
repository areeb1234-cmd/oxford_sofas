const navbarHTML = `
<nav class="navbar navbar-expand-lg fixed-top glass-nav">
  <div class="container">
    <a class="navbar-brand font-playfair fw-bold fs-3" href="index.html">Oxford Sofas</a>
    
    <div class="d-flex align-items-center order-lg-last ms-auto me-3 me-lg-0">
      <a href="wishlist.html" class="nav-icon text-decoration-none position-relative me-3"><i class="fas fa-heart"></i><span class="badge-counter" id="wishlist-count">0</span></a>
      <a href="compare.html" class="nav-icon text-decoration-none position-relative me-3 d-none d-sm-inline-block"><i class="fas fa-exchange-alt"></i><span class="badge-counter" id="compare-count">0</span></a>
      <a href="cart.html" class="nav-icon text-decoration-none position-relative me-3"><i class="fas fa-shopping-cart"></i><span class="badge-counter" id="cart-count">0</span></a>
      <i class="fas fa-moon nav-icon me-3" id="theme-toggle" style="cursor: pointer;"></i>
      <div class="dropdown">
        <a href="#" class="nav-icon text-decoration-none" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user"></i></a>
        <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm rounded-3 mt-2" aria-labelledby="userDropdown" id="authDropdownMenu">
          <!-- Populated by JS -->
        </ul>
      </div>
    </div>

    <button class="navbar-toggler border-0 px-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
        <li class="nav-item"><a class="nav-link" href="brands.html">Brands</a></li>
        <li class="nav-item"><a class="nav-link" href="rewards.html">Rewards</a></li>
        <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
      </ul>
    </div>
  </div>
</nav>
`;

const footerHTML = `
<footer class="footer-section pt-5 pb-3 mt-auto" style="background-color: var(--secondary-bg); border-top: 1px solid var(--border-color);">
  <div class="container">
    <div class="row mb-5 gy-4">
      <div class="col-12 col-lg-4 pe-lg-5">
        <h5 class="font-playfair fw-bold fs-3 mb-4" style="color: var(--heading-color);">Oxford Sofas</h5>
        <p class="mb-4" style="color: var(--text-color); opacity: 0.8;">Luxury sofas for modern living. Crafted for comfort, elegance and timeless design. Elevate your space with our premium collections.</p>
        <div class="d-flex gap-3 social-links">
          <a href="#" class="hover-gold transition" style="color: var(--text-color); opacity: 0.7;" aria-label="Facebook"><i class="fab fa-facebook fa-lg"></i></a>
          <a href="#" class="hover-gold transition" style="color: var(--text-color); opacity: 0.7;" aria-label="Instagram"><i class="fab fa-instagram fa-lg"></i></a>
          <a href="#" class="hover-gold transition" style="color: var(--text-color); opacity: 0.7;" aria-label="Twitter"><i class="fab fa-twitter fa-lg"></i></a>
          <a href="#" class="hover-gold transition" style="color: var(--text-color); opacity: 0.7;" aria-label="Pinterest"><i class="fab fa-pinterest fa-lg"></i></a>
        </div>
      </div>
      
      <div class="col-6 col-md-4 col-lg-2">
        <h5 class="font-playfair fw-bold mb-4" style="color: var(--heading-color);">Company</h5>
        <ul class="list-unstyled footer-links">
          <li class="mb-3"><a href="about.html" class="text-decoration-none hover-gold transition" style="color: var(--text-color); opacity: 0.8;">About Us</a></li>
          <li class="mb-3"><a href="contact.html" class="text-decoration-none hover-gold transition" style="color: var(--text-color); opacity: 0.8;">Contact</a></li>
          <li class="mb-3"><a href="brands.html" class="text-decoration-none hover-gold transition" style="color: var(--text-color); opacity: 0.8;">Brands</a></li>
          <li class="mb-3"><a href="#" class="text-decoration-none hover-gold transition" style="color: var(--text-color); opacity: 0.8;">Careers</a></li>
        </ul>
      </div>
      
      <div class="col-6 col-md-4 col-lg-2">
        <h5 class="font-playfair fw-bold mb-4" style="color: var(--heading-color);">Support</h5>
        <ul class="list-unstyled footer-links">
          <li class="mb-3"><a href="faq.html" class="text-decoration-none hover-gold transition" style="color: var(--text-color); opacity: 0.8;">FAQ</a></li>
          <li class="mb-3"><a href="#" class="text-decoration-none hover-gold transition" style="color: var(--text-color); opacity: 0.8;">Shipping & Returns</a></li>
          <li class="mb-3"><a href="#" class="text-decoration-none hover-gold transition" style="color: var(--text-color); opacity: 0.8;">Warranty</a></li>
          <li class="mb-3"><a href="#" class="text-decoration-none hover-gold transition" style="color: var(--text-color); opacity: 0.8;">Care Guide</a></li>
        </ul>
      </div>
      
      <div class="col-12 col-md-4 col-lg-4">
        <h5 class="font-playfair fw-bold mb-4" style="color: var(--heading-color);">Newsletter</h5>
        <p class="mb-4" style="color: var(--text-color); opacity: 0.8;">Subscribe to receive updates, access to exclusive deals, and interior design inspiration.</p>
        <form id="newsletter-form" class="needs-validation" novalidate>
          <div class="position-relative">
            <div class="input-group">
              <input type="email" id="newsletter-email" class="form-control bg-transparent border-secondary rounded-start-pill ps-4 py-2" style="color: var(--text-color);" placeholder="Your email address" required aria-label="Email address">
              <button class="btn btn-gold rounded-end-pill px-4 py-2" type="submit">Subscribe</button>
            </div>
            <div class="invalid-feedback position-absolute mt-1" id="newsletter-error">
              Please provide a valid email address.
            </div>
            <div class="valid-feedback position-absolute mt-1 text-success" id="newsletter-success">
              Thank you for subscribing!
            </div>
          </div>
        </form>
      </div>
    </div>
    
    <div class="border-top border-secondary pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center small" style="color: var(--text-color); opacity: 0.7;">
      <p class="mb-2 mb-md-0">&copy; 2026 Oxford Sofas. All rights reserved.</p>
      <div class="d-flex gap-3">
        <a href="#" class="text-decoration-none hover-gold transition" style="color: var(--text-color);">Privacy Policy</a>
        <a href="#" class="text-decoration-none hover-gold transition" style="color: var(--text-color);">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
`;

function renderComponents() {
  const navContainer = document.getElementById('navbar-container');
  if (navContainer) {
    navContainer.innerHTML = navbarHTML;
    updateAuthDropdown();
    highlightActiveNavLink();
  }
  
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    footerContainer.innerHTML = footerHTML;
    initNewsletterValidation();
  }
}

function highlightActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath || (currentPath === '/' && linkPath.endsWith('index.html'))) {
      link.classList.add('active');
    }
  });
}

function initNewsletterValidation() {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const errorFeedback = document.getElementById('newsletter-error');
  const successFeedback = document.getElementById('newsletter-success');

  if (!form || !emailInput) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Reset states
    emailInput.classList.remove('is-invalid', 'is-valid');
    if (errorFeedback) errorFeedback.style.display = 'none';
    if (successFeedback) successFeedback.style.display = 'none';
    
    if (!email || !emailRegex.test(email)) {
      emailInput.classList.add('is-invalid');
      if (errorFeedback) {
        errorFeedback.style.display = 'block';
        errorFeedback.textContent = !email ? 'Email address is required.' : 'Please enter a valid email address.';
      }
    } else {
      emailInput.classList.add('is-valid');
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Open window immediately to avoid popup blocker
      const newWindow = window.open('about:blank', '_blank');
      if (newWindow) {
        newWindow.document.write('<div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;">Redirecting to Gmail...</div>');
      }
      
      // Loading state
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Subscribing...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        // Success state
        submitBtn.innerHTML = 'Subscribed <i class="fas fa-check ms-1"></i>';
        submitBtn.classList.remove('btn-gold');
        submitBtn.classList.add('btn-success-custom');
        
        if (typeof showToast === 'function') {
          showToast('Successfully Subscribed! Redirecting to Gmail...', 'success');
        } else if (successFeedback) {
          successFeedback.style.display = 'block';
          successFeedback.textContent = 'Successfully Subscribed! Redirecting to Gmail...';
        }
        
        // Open Gmail after a short delay
        setTimeout(() => {
          if (newWindow) {
            newWindow.location.href = 'https://mail.google.com';
          } else {
            window.open('https://mail.google.com', '_blank');
          }
          
          // Reset form after opening
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('btn-success-custom');
            submitBtn.classList.add('btn-gold');
            submitBtn.disabled = false;
            emailInput.value = '';
            emailInput.classList.remove('is-valid');
            if (successFeedback) successFeedback.style.display = 'none';
          }, 1000);
        }, 1500);
      }, 1000);
    }
  });

  emailInput.addEventListener('input', function() {
    if (emailInput.classList.contains('is-invalid')) {
      emailInput.classList.remove('is-invalid');
      if (errorFeedback) errorFeedback.style.display = 'none';
    }
  });
}

function updateAuthDropdown() {
  const dropdownMenu = document.getElementById('authDropdownMenu');
  if (!dropdownMenu) return;

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if (currentUser) {
    dropdownMenu.innerHTML = `
      <li><h6 class="dropdown-header">Welcome, ${currentUser.name}</h6></li>
      <li><a class="dropdown-item" href="profile.html"><i class="fas fa-user-circle me-2 text-muted"></i> My Profile</a></li>
      <li><a class="dropdown-item" href="rewards.html"><i class="fas fa-gift me-2 text-muted"></i> Rewards</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item text-danger" href="#" onclick="handleLogout()"><i class="fas fa-sign-out-alt me-2"></i> Logout</a></li>
    `;
  } else {
    dropdownMenu.innerHTML = `
      <li><a class="dropdown-item" href="login.html"><i class="fas fa-sign-in-alt me-2 text-muted"></i> Login</a></li>
      <li><a class="dropdown-item" href="login.html#signup"><i class="fas fa-user-plus me-2 text-muted"></i> Sign Up</a></li>
    `;
  }
}

window.showToast = function(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '1055';
    document.body.appendChild(toastContainer);
  }

  const toastEl = document.createElement('div');
  const bgClass = type === 'success' ? 'text-bg-success' : 'text-bg-warning';
  const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
  
  toastEl.className = `toast align-items-center ${bgClass} border-0 mb-2`;
  toastEl.setAttribute('role', 'alert');
  toastEl.setAttribute('aria-live', 'assertive');
  toastEl.setAttribute('aria-atomic', 'true');
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="fas ${iconClass} me-2"></i> ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
  
  toastContainer.appendChild(toastEl);
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();
  
  toastEl.addEventListener('hidden.bs.toast', () => {
    toastEl.remove();
  });
};

// Add global handleLogout if not defined elsewhere
if (typeof handleLogout !== 'function') {
  window.handleLogout = function() {
    localStorage.removeItem('currentUser');
    showToast('Logged out successfully!');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }
}

document.addEventListener('DOMContentLoaded', renderComponents);
