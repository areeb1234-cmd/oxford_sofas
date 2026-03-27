function normalizeImagePath(src) {
  if (!src || typeof src !== 'string') return src;
  return src.startsWith('/images/') ? src.slice(1) : src;
}

function addToWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  if (!wishlist.find(item => item.id === productId)) {
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateCounters();
    showToast(`${product.name} added to wishlist!`);
  } else {
    showToast(`${product.name} is already in wishlist!`, 'warning');
  }
}



function removeFromWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist = wishlist.filter(item => item.id !== productId);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateCounters();
  renderWishlist();
}

function moveToCart(productId) {
  addToCart(productId);
  removeFromWishlist(productId);
}

function renderWishlist() {
  const container = document.getElementById('wishlist-items');
  if (!container) return;

  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  container.innerHTML = '';

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="fas fa-heart fa-3x text-muted mb-3"></i>
        <h4 class="font-playfair">Your wishlist is empty</h4>
        <p class="text-muted mb-4">Save your favorite items here to find them easily later.</p>
        <a href="shop.html" class="btn btn-gold px-4 py-2 rounded-pill">Explore Collection</a>
      </div>
    `;
    return;
  }

  wishlist.forEach(item => {
    container.innerHTML += `
      <div class="col-6 col-md-4 col-lg-3">
        <div class="product-card h-100 d-flex flex-column">
          <div class="product-img-wrapper">
            <div class="product-img-inner">
              <img src="${normalizeImagePath(item.image)}" class="product-img" alt="${item.name}">
            </div>
            <div class="product-actions-overlay">
              <button class="action-btn" onclick="removeFromWishlist(${item.id})" title="Remove"><i class="fas fa-trash-alt"></i></button>
              <button class="action-btn" onclick="quickView(${item.id})" title="Quick View"><i class="fas fa-eye"></i></button>
            </div>
          </div>
          <div class="product-info flex-grow-1 d-flex flex-column">
            <p class="text-muted mb-1 small text-uppercase tracking-wider">${item.brand}</p>
            <h5 class="product-title flex-grow-1"><a href="product.html?id=${item.id}" class="text-decoration-none text-reset">${item.name}</a></h5>
            <div class="product-price mb-3">$${item.price.toLocaleString()}</div>
            <button class="add-to-cart-btn mt-auto" onclick="moveToCart(${item.id})">Move to Cart</button>
          </div>
        </div>
      </div>
    `;
  });
}

document.addEventListener('DOMContentLoaded', renderWishlist);
