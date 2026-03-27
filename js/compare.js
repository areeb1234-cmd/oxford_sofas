function normalizeImagePath(src) {
  if (!src || typeof src !== 'string') return src;
  return src.startsWith('/images/') ? src.slice(1) : src;
}

function addToCompare(productId) {
  let compare = JSON.parse(localStorage.getItem('compare')) || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  if (compare.find(item => item.id === productId)) {
    showToast(`${product.name} is already in compare list!`, 'warning');
    return;
  }

  if (compare.length >= 4) {
    showToast("You can only compare up to 4 products.", 'warning');
    return;
  }

  compare.push(product);
  localStorage.setItem('compare', JSON.stringify(compare));
  updateCounters();
  showToast(`${product.name} added to compare!`);
}

function removeFromCompare(productId) {
  let compare = JSON.parse(localStorage.getItem('compare')) || [];
  compare = compare.filter(item => item.id !== productId);
  localStorage.setItem('compare', JSON.stringify(compare));
  updateCounters();
  renderCompare();
}

function renderCompare() {
  const container = document.getElementById('compare-table-container');
  if (!container) return;

  let compare = JSON.parse(localStorage.getItem('compare')) || [];
  
  if (compare.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5">
        <i class="fas fa-exchange-alt fa-3x text-muted mb-3"></i>
        <h4 class="font-playfair">Nothing to compare</h4>
        <p class="text-muted mb-4">Add some products to compare their features.</p>
        <a href="shop.html" class="btn btn-gold px-4 py-2 rounded-pill">Explore Collection</a>
      </div>
    `;
    return;
  }

  let html = '<div class="table-responsive"><table class="table table-bordered align-middle text-center bg-white shadow-sm rounded overflow-hidden"><tbody>';
  
  // Images
  html += '<tr class="bg-light"><th class="w-25 text-start px-4 text-uppercase tracking-wider small text-muted">Product</th>';
  compare.forEach(p => html += `
    <td class="p-4" style="width: ${75 / compare.length}%">
      <div class="position-relative d-inline-block mb-3">
        <img src="${normalizeImagePath(p.image)}" class="img-fluid rounded shadow-sm object-fit-cover" style="height: 150px; width: 150px;">
        <button class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle" style="width: 28px; height: 28px; padding: 0;" onclick="removeFromCompare(${p.id})" title="Remove">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <h5 class="font-playfair mb-1"><a href="product.html?id=${p.id}" class="text-decoration-none text-reset">${p.name}</a></h5>
      <p class="text-muted small text-uppercase tracking-wider mb-0">${p.brand}</p>
    </td>
  `);
  html += '</tr>';

  // Price
  html += '<tr><th class="text-start px-4 text-uppercase tracking-wider small text-muted">Price</th>';
  compare.forEach(p => html += `<td class="fw-bold fs-5">$${p.price.toLocaleString()}</td>`);
  html += '</tr>';

  // Brand
  html += '<tr><th class="text-start px-4 text-uppercase tracking-wider small text-muted">Brand</th>';
  compare.forEach(p => html += `<td>${p.brand}</td>`);
  html += '</tr>';

  // Material
  html += '<tr><th class="text-start px-4 text-uppercase tracking-wider small text-muted">Material</th>';
  compare.forEach(p => html += `<td>${p.material}</td>`);
  html += '</tr>';

  // Color
  html += '<tr><th class="text-start px-4 text-uppercase tracking-wider small text-muted">Color</th>';
  compare.forEach(p => html += `<td>${p.color}</td>`);
  html += '</tr>';

  // Rating
  html += '<tr><th class="text-start px-4 text-uppercase tracking-wider small text-muted">Rating</th>';
  compare.forEach(p => html += `<td><div class="text-warning mb-1">${getStars(p.rating)}</div><span class="small text-muted">${p.rating}/5</span></td>`);
  html += '</tr>';

  // Actions
  html += '<tr class="bg-light"><th class="text-start px-4 text-uppercase tracking-wider small text-muted">Actions</th>';
  compare.forEach(p => html += `
    <td class="p-4">
      <button class="btn btn-gold rounded-pill px-4" onclick="addToCart(${p.id})">Add to Cart</button>
    </td>
  `);
  html += '</tr>';

  html += '</tbody></table></div>';
  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', renderCompare);
