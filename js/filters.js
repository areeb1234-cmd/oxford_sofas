document.addEventListener('DOMContentLoaded', () => {
  const shopContainer = document.getElementById('shop-products');
  const countDisplay = document.getElementById('product-count');
  const sortSelect = document.getElementById('sort-select');
  const checkboxes = document.querySelectorAll('.filter-checkbox');
  const clearBtn = document.getElementById('clear-filters');
  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');

  if (!shopContainer) return;

  let filteredProducts = [...products];
  let isInitialLoad = true;

  function renderShop() {
    const existingItems = shopContainer.querySelectorAll('.reveal');
    
    if (existingItems.length > 0 && !isInitialLoad) {
      // Fade out existing items
      existingItems.forEach(item => item.classList.remove('active'));
      setTimeout(() => {
        updateShopDOM();
      }, 400); // Wait for partial fade out
    } else {
      if (isInitialLoad) {
        isInitialLoad = false;
        // Show skeleton loaders on initial load
        shopContainer.innerHTML = '';
        let skeletonHTML = '';
        for(let i=0; i<6; i++) {
          skeletonHTML += `
            <div class="col-6 col-md-4 col-lg-3 mb-4 reveal">
              <div class="card border-0 shadow-sm p-3" aria-hidden="true">
                <div class="placeholder-glow">
                  <div class="placeholder col-12 rounded" style="height: 250px;"></div>
                </div>
                <div class="card-body px-0 pb-0">
                  <h5 class="card-title placeholder-glow">
                    <span class="placeholder col-6"></span>
                  </h5>
                  <p class="card-text placeholder-glow">
                    <span class="placeholder col-7"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-6"></span>
                    <span class="placeholder col-8"></span>
                  </p>
                  <a href="#" tabindex="-1" class="btn btn-secondary disabled placeholder col-6"></a>
                </div>
              </div>
            </div>
          `;
        }
        shopContainer.innerHTML = skeletonHTML;
        void shopContainer.offsetWidth;
        shopContainer.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));

        setTimeout(() => {
          const skeletons = shopContainer.querySelectorAll('.reveal');
          skeletons.forEach(el => el.classList.remove('active'));
          setTimeout(() => {
            updateShopDOM();
          }, 300);
        }, 600);
      } else {
        updateShopDOM();
      }
    }
  }

  function updateShopDOM() {
    shopContainer.innerHTML = '';
    
    if (filteredProducts.length === 0) {
      shopContainer.innerHTML = '<div class="col-12 text-center py-5 reveal"><h4 class="text-muted">No products found matching your criteria.</h4></div>';
      void shopContainer.offsetWidth;
      shopContainer.querySelector('.reveal').classList.add('active');
      countDisplay.innerText = '0 products';
      return;
    }

    let productsHTML = '';
    filteredProducts.forEach((p, index) => {
      const staggerClass = `stagger-${(index % 4) + 1}`;
      const cardHTML = renderProductCard(p).replace('class="col-6 col-md-4 col-lg-3"', `class="col-6 col-md-4 col-lg-3 reveal ${staggerClass}"`);
      productsHTML += cardHTML;
    });
    
    shopContainer.innerHTML = productsHTML;
    
    // Trigger reflow to ensure the transition happens
    void shopContainer.offsetWidth;

    // Add active class to trigger animation
    const newCards = shopContainer.querySelectorAll('.reveal');
    newCards.forEach(card => card.classList.add('active'));

    countDisplay.innerText = `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`;
  }

  function applyFilters() {
    const activeFilters = {
      category: [],
      material: [],
      brand: [],
      rating: []
    };

    checkboxes.forEach(cb => {
      if (cb.checked) {
        activeFilters[cb.dataset.filter].push(cb.value);
      }
    });

    const maxPrice = priceRange ? parseInt(priceRange.value) : 5000;

    filteredProducts = products.filter(p => {
      const matchCategory = activeFilters.category.length === 0 || activeFilters.category.includes(p.category);
      const matchMaterial = activeFilters.material.length === 0 || activeFilters.material.includes(p.material);
      const matchBrand = activeFilters.brand.length === 0 || activeFilters.brand.includes(p.brand);
      const matchRating = activeFilters.rating.length === 0 || activeFilters.rating.some(r => p.rating >= parseFloat(r));
      const matchPrice = p.price <= maxPrice;
      
      return matchCategory && matchMaterial && matchBrand && matchRating && matchPrice;
    });

    applySort();
  }

  function applySort() {
    const sortValue = sortSelect.value;
    
    if (sortValue === 'price-low') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-high') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'rating') {
      filteredProducts.sort((a, b) => b.rating - a.rating);
    } else {
      // Default sort by ID
      filteredProducts.sort((a, b) => a.id - b.id);
    }
    
    renderShop();
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', applyFilters);
  });

  if (priceRange) {
    priceRange.addEventListener('input', (e) => {
      priceValue.innerText = `$${e.target.value}`;
    });
    priceRange.addEventListener('change', applyFilters);
  }

  sortSelect.addEventListener('change', applySort);

  clearBtn.addEventListener('click', () => {
    checkboxes.forEach(cb => cb.checked = false);
    if (priceRange) {
      priceRange.value = 5000;
      priceValue.innerText = '$5000';
    }
    sortSelect.value = 'default';
    applyFilters();
  });

  // Initial render
  const urlParams = new URLSearchParams(window.location.search);
  const brandParam = urlParams.get('brand');
  if (brandParam) {
    checkboxes.forEach(cb => {
      if (cb.dataset.filter === 'brand' && cb.value === brandParam) {
        cb.checked = true;
      }
    });
    applyFilters();
  } else {
    renderShop();
  }
});
