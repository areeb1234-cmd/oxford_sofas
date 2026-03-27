function normalizeImagePath(src) {
  if (!src || typeof src !== 'string') return src;
  return src.startsWith('/images/') ? src.slice(1) : src;
}

function addToCart(productId, quantity = 1) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCounters();
  showCartToast(product.name);
}

function showCartToast(productName) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '1055';
    document.body.appendChild(toastContainer);
  }

  const toastEl = document.createElement('div');
  toastEl.className = 'toast align-items-center text-bg-success border-0 mb-2';
  toastEl.setAttribute('role', 'alert');
  toastEl.setAttribute('aria-live', 'assertive');
  toastEl.setAttribute('aria-atomic', 'true');
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="fas fa-check-circle me-2"></i> ${productName} added to cart!
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

  // Highlight cart icon
  const cartIcon = document.querySelector('.fa-shopping-cart');
  if (cartIcon) {
    cartIcon.classList.add('text-success');
    cartIcon.style.transform = 'scale(1.3)';
    cartIcon.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      cartIcon.classList.remove('text-success');
      cartIcon.style.transform = 'scale(1)';
    }, 500);
  }
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCounters();
  renderCart();
}

function updateQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounters();
    renderCart();
  }
}

function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const orderSummaryContainer = document.getElementById('order-summary-container');
  const shippingProgressContainer = document.getElementById('shipping-progress-container');
  
  if (!cartContainer) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart-state text-center py-5 glass-card rounded-4">
        <lottie-player src="https://lottie.host/1f7a0752-6785-4235-8c01-8b01a6132717/wGzZ1gX41j.json" background="transparent" speed="1" style="width: 250px; height: 250px; margin: 0 auto;" loop autoplay></lottie-player>
        <h3 class="font-playfair mt-4 fw-bold">Your cart feels lonely</h3>
        <p class="text-muted mb-4">Looks like you haven't added anything to your cart yet.</p>
        <a href="shop.html" class="btn btn-gold px-5 py-3 rounded-pill btn-glow fw-bold">Start Shopping</a>
      </div>
    `;
    if(cartTotal) cartTotal.innerText = '0.00';
    if(orderSummaryContainer) orderSummaryContainer.style.display = 'none';
    if(shippingProgressContainer) shippingProgressContainer.classList.add('d-none');
    return;
  }

  if(orderSummaryContainer) orderSummaryContainer.style.display = 'block';
  
  cartContainer.innerHTML = '';
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    cartContainer.innerHTML += `
      <div class="cart-item-card glass-card p-3 p-md-4 mb-4 rounded-4 position-relative" id="cart-item-${item.id}" style="animation-delay: ${index * 0.1}s">
        <div class="d-flex flex-column flex-md-row align-items-md-center">
          <div class="cart-item-img-wrapper me-md-4 mb-3 mb-md-0 rounded-3 overflow-hidden position-relative" style="width: 120px; height: 120px; flex-shrink: 0;">
            <img src="${normalizeImagePath(item.image)}" class="cart-item-img w-100 h-100 object-fit-cover" alt="${item.name}">
          </div>
          <div class="flex-grow-1 d-flex flex-column justify-content-between h-100">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h5 class="font-playfair mb-1 fw-bold">${item.name}</h5>
                <p class="text-muted small text-uppercase tracking-wider mb-0">${item.brand}</p>
              </div>
              <button class="btn btn-remove-item text-danger p-2 rounded-circle" onclick="animateRemoveFromCart(${item.id})" title="Remove item">
                <i class="fas fa-times"></i>
              </button>
            </div>
            
            <div class="d-flex justify-content-between align-items-end mt-auto pt-3">
              <div class="d-flex flex-column gap-2">
                <div class="quantity-control glass-input rounded-pill d-flex align-items-center px-2 py-1">
                  <button class="btn btn-sm btn-qty" onclick="updateQuantity(${item.id}, -1)"><i class="fas fa-minus small"></i></button>
                  <input type="text" class="form-control form-control-sm text-center border-0 bg-transparent fw-bold qty-input" value="${item.quantity}" readonly style="width: 40px;">
                  <button class="btn btn-sm btn-qty" onclick="updateQuantity(${item.id}, 1)"><i class="fas fa-plus small"></i></button>
                </div>
                <button class="btn btn-link text-muted p-0 text-decoration-none small text-start" onclick="saveForLater(${item.id})"><i class="far fa-bookmark me-1"></i> Save for later</button>
              </div>
              <div class="text-end">
                <p class="fw-bold mb-0 fs-5 item-price-anim" style="color: var(--accent-color);">$${(item.price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  // Render Saved for Later items
  renderSavedForLater();

  if(cartTotal) {
    animateValue(cartTotal, parseFloat(cartTotal.innerText.replace(/,/g, '')), total, 500);
  }
  
  updateShippingProgress(total);
  updateEstimatedDelivery();
  
  // Apply saved coupon if any
  const savedCoupon = localStorage.getItem('coupon');
  if (savedCoupon && document.getElementById('promoCodeInput')) {
    document.getElementById('promoCodeInput').value = savedCoupon;
    applyPromoCode(savedCoupon, total);
  } else {
    updateFinalTotal(total, 0);
  }
}

function animateRemoveFromCart(productId) {
  const itemCard = document.getElementById(`cart-item-${productId}`);
  if (itemCard) {
    itemCard.classList.add('removing');
    setTimeout(() => {
      removeFromCart(productId);
    }, 400); // Matches CSS animation duration
  } else {
    removeFromCart(productId);
  }
}

function saveForLater(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let saved = JSON.parse(localStorage.getItem('savedForLater')) || [];
  
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex > -1) {
    const item = cart[itemIndex];
    cart.splice(itemIndex, 1);
    
    // Check if already saved
    const existingSaved = saved.find(s => s.id === productId);
    if (existingSaved) {
      existingSaved.quantity += item.quantity;
    } else {
      saved.push(item);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('savedForLater', JSON.stringify(saved));
    
    updateCounters();
    renderCart();
  }
}

function moveToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let saved = JSON.parse(localStorage.getItem('savedForLater')) || [];
  
  const itemIndex = saved.findIndex(item => item.id === productId);
  if (itemIndex > -1) {
    const item = saved[itemIndex];
    saved.splice(itemIndex, 1);
    
    // Check if already in cart
    const existingCart = cart.find(c => c.id === productId);
    if (existingCart) {
      existingCart.quantity += item.quantity;
    } else {
      cart.push(item);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('savedForLater', JSON.stringify(saved));
    
    updateCounters();
    renderCart();
  }
}

function removeSavedItem(productId) {
  let saved = JSON.parse(localStorage.getItem('savedForLater')) || [];
  saved = saved.filter(item => item.id !== productId);
  localStorage.setItem('savedForLater', JSON.stringify(saved));
  renderSavedForLater();
}

function renderSavedForLater() {
  let savedContainer = document.getElementById('saved-items-container');
  
  // Create container if it doesn't exist
  if (!savedContainer) {
    const cartItemsContainer = document.getElementById('cart-items-container');
    if (!cartItemsContainer) return;
    
    savedContainer = document.createElement('div');
    savedContainer.id = 'saved-items-container';
    savedContainer.className = 'mt-5';
    cartItemsContainer.appendChild(savedContainer);
  }
  
  let saved = JSON.parse(localStorage.getItem('savedForLater')) || [];
  
  if (saved.length === 0) {
    savedContainer.innerHTML = '';
    return;
  }
  
  let html = `
    <h4 class="font-playfair mb-4 fw-bold">Saved for Later (${saved.length})</h4>
    <div class="row g-4">
  `;
  
  saved.forEach(item => {
    html += `
      <div class="col-md-6">
        <div class="glass-card p-3 rounded-4 h-100 d-flex flex-column">
          <div class="d-flex align-items-center mb-3">
            <img src="${normalizeImagePath(item.image)}" width="80" height="80" class="object-fit-cover rounded shadow-sm me-3">
            <div>
              <h6 class="font-playfair mb-1 fw-bold">${item.name}</h6>
              <p class="fw-bold mb-0" style="color: var(--accent-color);">$${item.price.toLocaleString()}</p>
            </div>
          </div>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <button class="btn btn-outline-dark-custom btn-sm rounded-pill px-3" onclick="moveToCart(${item.id})">Move to Cart</button>
            <button class="btn btn-link text-danger p-0 text-decoration-none small" onclick="removeSavedItem(${item.id})">Remove</button>
          </div>
        </div>
      </div>
    `;
  });
  
  html += `</div>`;
  savedContainer.innerHTML = html;
}

function updateShippingProgress(total) {
  const container = document.getElementById('shipping-progress-container');
  const bar = document.getElementById('shipping-progress-bar');
  const message = document.getElementById('shipping-message');
  const shippingCost = document.getElementById('shipping-cost');
  
  if (!container || !bar || !message) return;
  
  const freeShippingThreshold = 1000; // Example threshold
  
  container.classList.remove('d-none');
  
  if (total >= freeShippingThreshold) {
    bar.style.width = '100%';
    bar.classList.remove('bg-primary');
    bar.classList.add('bg-success');
    message.innerHTML = '<span class="text-success"><i class="fas fa-check-circle me-2"></i>You have unlocked FREE shipping!</span>';
    if(shippingCost) shippingCost.innerHTML = '<span class="text-success">Free</span>';
  } else {
    const percentage = (total / freeShippingThreshold) * 100;
    const remaining = freeShippingThreshold - total;
    bar.style.width = `${percentage}%`;
    bar.classList.remove('bg-success');
    bar.classList.add('bg-primary');
    message.innerHTML = `Add <span class="fw-bold" style="color: var(--accent-color);">$${remaining.toLocaleString()}</span> more for FREE shipping`;
    if(shippingCost) shippingCost.innerText = 'Calculated at checkout';
  }
}

function updateEstimatedDelivery() {
  const deliveryEl = document.getElementById('delivery-date');
  if (!deliveryEl) return;
  
  const today = new Date();
  const minDays = 3;
  const maxDays = 7;
  
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + minDays);
  
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + maxDays);
  
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  deliveryEl.innerText = `Arrives by ${minDate.toLocaleDateString('en-US', options)} - ${maxDate.toLocaleDateString('en-US', options)}`;
}

// Helper for number animation
function animateValue(obj, start, end, duration) {
  if (!obj) return;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = progress * (end - start) + start;
    obj.innerHTML = current.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function applyPromoCode(code, subtotal) {
  const promoMessage = document.getElementById('promoMessage');
  const discountRow = document.getElementById('discountRow');
  const discountAmount = document.getElementById('discountAmount');
  
  let discount = 0;
  let message = '';
  let isSuccess = false;
  
  const upperCode = code.toUpperCase();
  
  if (upperCode === 'SAVE5') {
    discount = subtotal * 0.05;
    message = '5% discount applied!';
    isSuccess = true;
  } else if (upperCode === 'SAVE10') {
    discount = subtotal * 0.10;
    message = '10% discount applied!';
    isSuccess = true;
  } else if (upperCode === 'SAVE15') {
    discount = subtotal * 0.15;
    message = '15% discount applied!';
    isSuccess = true;
  } else if (upperCode === 'SAVE20') {
    discount = subtotal * 0.20;
    message = '20% discount applied!';
    isSuccess = true;
  } else if (upperCode === 'SAVE25') {
    discount = subtotal * 0.25;
    message = '25% discount applied!';
    isSuccess = true;
  } else if (upperCode === 'FREESHIP') {
    discount = 0; // Handled at checkout
    message = 'Free shipping applied!';
    isSuccess = true;
  } else if (code.trim() !== '') {
    message = 'Invalid promo code.';
  }
  
  if (isSuccess) {
    promoMessage.innerHTML = `<span class="text-success"><i class="fas fa-check-circle me-1"></i>${message}</span>`;
    if (discount > 0) {
      discountRow.classList.remove('d-none');
      discountRow.classList.add('d-flex');
      discountAmount.innerText = discount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    } else {
      discountRow.classList.remove('d-flex');
      discountRow.classList.add('d-none');
    }
    localStorage.setItem('coupon', upperCode);
  } else {
    if (code.trim() !== '') {
      promoMessage.innerHTML = `<span class="text-danger"><i class="fas fa-times-circle me-1"></i>${message}</span>`;
    } else {
      promoMessage.innerHTML = '';
    }
    discountRow.classList.remove('d-flex');
    discountRow.classList.add('d-none');
    localStorage.removeItem('coupon');
  }
  
  updateFinalTotal(subtotal, discount);
}

function updateFinalTotal(subtotal, discount) {
  const finalTotal = document.getElementById('cart-total-final');
  if (finalTotal) {
    const total = Math.max(0, subtotal - discount);
    const currentVal = parseFloat(finalTotal.innerText.replace(/,/g, '')) || 0;
    animateValue(finalTotal, currentVal, total, 500);
    
    // Trigger character celebration if total increases
    if (total > currentVal && currentVal > 0) {
      const character = document.getElementById('cart-character');
      if (character) {
        // Switch to celebration animation temporarily
        const originalSrc = character.getAttribute('src');
        character.setAttribute('src', 'https://lottie.host/81a95a89-223f-42b7-8898-8422119c629f/1oB4P0P52T.json'); // Replace with a celebration lottie if available, using same for now
        character.play();
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  
  const applyPromoBtn = document.getElementById('applyPromoBtn');
  if (applyPromoBtn) {
    applyPromoBtn.addEventListener('click', () => {
      const code = document.getElementById('promoCodeInput').value;
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      applyPromoCode(code, subtotal);
    });
  }
});
