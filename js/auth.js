// Simple frontend authentication using localStorage

document.addEventListener('DOMContentLoaded', () => {
  checkAuthState();
  
  // Check URL hash to show signup form if needed
  if (window.location.hash === '#signup') {
    const formContainer = document.getElementById('formContainer');
    if (formContainer) {
      formContainer.classList.add('show-signup');
    }
  }
});

function toggleAuthMode(event) {
  event.preventDefault();
  const formContainer = document.getElementById('formContainer');
  if (formContainer) {
    formContainer.classList.toggle('show-signup');
  }
}

function togglePassword(inputId, iconElement) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    iconElement.classList.remove('fa-eye');
    iconElement.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    iconElement.classList.remove('fa-eye-slash');
    iconElement.classList.add('fa-eye');
  }
}

async function handleAuthSubmit(event, type) {
  event.preventDefault();
  
  if (type === 'signup') {
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'warning');
      return;
    }
  }

  const btn = document.getElementById(type === 'login' ? 'loginBtn' : 'signupBtn');
  const spinner = btn.querySelector('.spinner-border');
  const btnText = btn.querySelector('.btn-text');
  const originalText = btnText.innerText;
  
  // Start loading animation
  btn.classList.add('loading');
  btnText.innerText = 'Processing...';
  spinner.classList.remove('d-none');
  
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  let success = false;
  let message = '';
  
  if (type === 'login') {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      success = true;
      message = 'Welcome Back 🎉';
    } else {
      showToast('Invalid email or password.', 'warning');
    }
  } else if (type === 'signup') {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
      showToast('An account with this email already exists.', 'warning');
    } else {
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      success = true;
      message = 'Account Created 🚀';
    }
  }
  
  // Stop loading animation
  btn.classList.remove('loading');
  btnText.innerText = originalText;
  spinner.classList.add('d-none');
  
  if (success) {
    showSuccessOverlay(message);
  }
}

function showSuccessOverlay(message) {
  const overlay = document.getElementById('successOverlay');
  const msgElement = document.getElementById('successMessage');
  
  if (overlay && msgElement) {
    msgElement.innerText = message;
    overlay.classList.add('active');
    
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  } else {
    // Fallback if overlay elements aren't found
    showToast(message);
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }
}

function checkAuthState() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const profileNameDisplay = document.getElementById('profileNameDisplay');
  const profileEmailDisplay = document.getElementById('profileEmailDisplay');
  const profileNameInput = document.getElementById('profileName');
  const profileEmailInput = document.getElementById('profileEmail');

  if (currentUser) {
    // User is logged in
    if (profileNameDisplay) profileNameDisplay.innerText = currentUser.name;
    if (profileEmailDisplay) profileEmailDisplay.innerText = currentUser.email;
    if (profileNameInput) profileNameInput.value = currentUser.name;
    if (profileEmailInput) profileEmailInput.value = currentUser.email;
  } else {
    // User is not logged in, redirect if on profile page
    if (window.location.pathname.includes('profile.html')) {
      window.location.href = 'login.html';
    }
  }

  if (currentUser && window.location.pathname.includes('profile.html')) {
    // Render order history
    const orders = JSON.parse(localStorage.getItem('orders')) || {};
    const userOrders = orders[currentUser.email] || [];
    const orderContainer = document.getElementById('order-history-container');
    
    if (userOrders.length > 0 && orderContainer) {
      let html = '<div class="list-group list-group-flush">';
      userOrders.reverse().forEach(order => {
        html += `
          <div class="list-group-item px-0 py-3 border-bottom">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h6 class="mb-0 fw-bold">${order.id}</h6>
              <span class="badge bg-success rounded-pill">Completed</span>
            </div>
            <div class="d-flex justify-content-between text-muted small">
              <span>${order.date} • ${order.items} item(s)</span>
              <span class="fw-bold text-dark">$${order.total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
          </div>
        `;
      });
      html += '</div>';
      orderContainer.innerHTML = html;
    }
  }
}

function handleLogout() {
  localStorage.removeItem('currentUser');
  showToast('Logged out successfully!');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

function updateProfile(event) {
  event.preventDefault();
  
  const newName = document.getElementById('profileName').value;
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if (currentUser) {
    currentUser.name = newName;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update in users array as well
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
      users[userIndex].name = newName;
      localStorage.setItem('users', JSON.stringify(users));
    }

    document.getElementById('profileNameDisplay').innerText = newName;
    showToast('Profile updated successfully!');
  }
}


